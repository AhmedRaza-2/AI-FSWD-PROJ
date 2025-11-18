import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import StatsCards from "./StatsCards";
import ChartsPanel from "./ChartsPanel";
import RecentActivity from "./RecentActivity";
import UrlExplorerModal from "./UrlExplorerModal";

// dynamic PDF export
const exportPDF = async () => {
  const jsPDF = (await import("jspdf")).default;
  const html2canvas = (await import("html2canvas")).default;

  const pdf = new jsPDF("p", "mm", "a4");
  const dashboard = document.getElementById("dashboard-root");
  if (!dashboard) return alert("Dashboard container missing.");

  const canvas = await html2canvas(dashboard, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("email-security-report.pdf");
};

// stopwords
const stopwords = ["the","is","in","and","to","a","of","for","on","with","at","by","from","an","be","this","that","as","or","it","are","was","you","your","have","i","we","me"];

// date parsing
const parseDateSafe = (s) => { if(!s) return null; const d = new Date(s); return isNaN(d.getTime())? null : d; };
const getEmailDate = (e) => parseDateSafe(e.date)||parseDateSafe(e.receivedAt)||parseDateSafe(e.createdAt)||parseDateSafe(e.timestamp)||null;

// risk scoring
function computeRiskScore(email, senderPhishCount=0){
  let score=0;
  const conf = Math.max(0, Math.min(1, email.confidence||0));
  score += conf*45;
  const phishingUrlCount = (email.urls||[]).filter(u=>u.prediction===1).length;
  score += Math.min(phishingUrlCount*12,30);
  const flaggedWords=["urgent","verify","password","account","login","confirm","update","invoice","payment","bank","suspended","security"];
  const subj = (email.subject||"").toLowerCase();
  const found = flaggedWords.reduce((acc,w)=>acc+(subj.includes(w)?1:0),0);
  score += Math.min(found*5,10);
  score += Math.min(senderPhishCount*3,15);
  if ((email.attachments||[]).some(a=>/\.(exe|scr|bat|js|jar|cmd|vbs)$/i.test(a.filename||""))) score+=8;
  return Math.round(Math.min(score,100));
}

const categoryMatchers = {
  "Banking / Payment":["bank","payment","invoice","transaction","billing"],
  "Account / Login":["login","account","verify","password","signin","credentials"],
  "Delivery / Parcel":["delivery","shipment","tracking","parcel","order"],
  "Offer / Promotion":["offer","discount","coupon","deal","free"],
  "Crypto / Investment":["bitcoin","crypto","wallet","transfer","exchange"],
  "General Scam":["prize","won","congratulations","claim","urgent"]
};

function detectCategory(subject, urls=[]){
  const s = (subject||"").toLowerCase();
  for(const [cat, kws] of Object.entries(categoryMatchers)){
    for(const kw of kws) if(s.includes(kw)||urls.some(u=>u.toLowerCase().includes(kw))) return cat;
  }
  return "Other";
}

const SAVED_FILTERS_KEY="email_dashboard_saved_filters_v1";
const USER_BEHAVIOR_KEY="email_dashboard_user_behavior_v1";

export default function EmailSummary({ emails=[], onRequestRefresh=null }) {
  const [localEmails,setLocalEmails]=useState(null);
  const sourceEmails = localEmails||emails;

  const [search,setSearch]=useState("");
  const [savedFilterName,setSavedFilterName]=useState("");
  const [savedFilters,setSavedFilters]=useState(()=>{ try{ return JSON.parse(localStorage.getItem(SAVED_FILTERS_KEY)||"[]"); } catch{return [];} });
  const [selectedFilterIndex,setSelectedFilterIndex]=useState(null);
  const [autoRefresh,setAutoRefresh]=useState(false);
  const [refreshIntervalSec,setRefreshIntervalSec]=useState(10);

  const [chatInput,setChatInput]=useState("");
  const [chatLog,setChatLog]=useState([]);

  const [urlModal,setUrlModal]=useState({ open:false, url:null, details:null });
  const [userBehavior,setUserBehavior]=useState(()=>{ try{ return JSON.parse(localStorage.getItem(USER_BEHAVIOR_KEY)||"{}"); }catch{return {};}});

  const bumpBehavior = k => { setUserBehavior(prev=>{ const next={...prev,[k]:(prev[k]||0)+1}; localStorage.setItem(USER_BEHAVIOR_KEY,JSON.stringify(next)); return next;}); };

  // saved filters
  const persistSavedFilters = arr => { setSavedFilters(arr); localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(arr)); };
  const applySavedFilter = f=>{ if(!f) return; setSearch(f.q||""); setSelectedFilterIndex(savedFilters.indexOf(f)); };
  const applyQuick = type => {
    if(type==="high-risk") setSearch("risk:high");
    if(type==="today") setSearch("date:today");
    if(type==="with-urls") setSearch("has:urls");
    if(type==="with-attachments") setSearch("has:attachments");
  };

  const matchesSearch = (e,q)=>{
    if(!q) return true;
    const s=q.toLowerCase().trim();
    if(s.startsWith("risk:")){
      const val=s.split(":")[1]; const score=e._riskScore??e.riskScore??0;
      if(val==="high") return score>=80;
      if(val==="med") return score>=50&&score<80;
      if(val==="low") return score<50;
      return false;
    }
    if(s==="date:today"){ const d=getEmailDate(e); if(!d) return false; const now=new Date(); return d.toDateString()===now.toDateString();}
    if(s==="has:urls") return (e.urls||[]).length>0;
    if(s==="has:attachments") return (e.attachments||[]).length>0;
    if(s.startsWith("sender:")) return (e.sender||"").toLowerCase().includes(s.slice(7));
    if(s.startsWith("domain:")) { const d=s.slice(7); return (e.urls||[]).some(u=>(u.url||"").toLowerCase().includes(d)); }
    return ((e.subject||"")+" "+(e.sender||"")+" "+(e.urls||[]).map(u=>u.url).join(" ")).toLowerCase().includes(s);
  };

  const filtered = useMemo(()=>{
    const senderCounts={};
    sourceEmails.forEach(e=>{
      const s=e.sender||"unknown";
      senderCounts[s]=senderCounts[s]||{phishing:0,total:0};
      if(e.prediction===1) senderCounts[s].phishing++;
      senderCounts[s].total++;
    });
    return sourceEmails.map(e=>{
      const senderPhish=(senderCounts[e.sender]&&senderCounts[e.sender].phishing)||0;
      const risk=computeRiskScore(e,senderPhish);
      const category=detectCategory(e.subject,(e.urls||[]).map(u=>u.url||""));
      return {...e,_riskScore:risk,_category:category};
    }).filter(e=>matchesSearch(e,search));
  },[sourceEmails,search]);

  // recent emails limit
  const recentWithRisk = useMemo(()=>[...filtered].sort((a,b)=> (getEmailDate(b)?.getTime()||0)-(getEmailDate(a)?.getTime()||0)).slice(0,12),[filtered]);

  // interactions
  const markSafe = async (emailId)=>{ setLocalEmails(prev=> (prev||emails).map(e=> e._id===emailId||e.id===emailId?{...e,prediction:0}:e)); bumpBehavior("markedSafe"); try{await axios.post(`/api/emails/${emailId}/mark-safe`);}catch{setLocalEmails(null);} };
  const reportEmail = async (emailId)=>{ setLocalEmails(prev=> (prev||emails).map(e=> e._id===emailId||e.id===emailId?{...e,_reported:true}:e)); bumpBehavior("reported"); try{await axios.post(`/api/emails/${emailId}/report`);}catch{setLocalEmails(null);} };

  // chat assistant
  const runChat = text=>{
    const t=(text||"").toLowerCase();
    setChatLog(prev=>[...prev,{role:"user",text}]);
    if(t.includes("high risk")){ setSearch("risk:high"); setChatLog(prev=>[...prev,{role:"assistant",text:"Applied filter: high-risk emails"}]); }
    else if(t.includes("today")){ setSearch("date:today"); setChatLog(prev=>[...prev,{role:"assistant",text:"Applied filter: today's emails"}]); }
    else if(t.startsWith("show sender ")){ const s=t.slice(12); setSearch(`sender:${s}`); setChatLog(prev=>[...prev,{role:"assistant",text:`Filtering by sender: ${s}`}]); }
    else setChatLog(prev=>[...prev,{role:"assistant",text:"I can run filters: 'high risk', 'today', 'show sender <x>'"}]);
    setChatInput("");
  };

  // Auto-refresh
  useEffect(()=>{ if(!autoRefresh||!onRequestRefresh) return; const id=setInterval(()=>onRequestRefresh(),Math.max(5000,refreshIntervalSec*1000)); return ()=>clearInterval(id); },[autoRefresh,refreshIntervalSec,onRequestRefresh]);

  return (
    <Container fluid className="py-3">
      <div id="dashboard-root">
        <Row className="align-items-center mb-2">
          <Col md={6}><h3 className="mb-0">📬 Security Dashboard</h3><small className="text-muted">Pro insights & actions</small></Col>
          <Col md={6} className="text-end"><Button variant="outline-secondary" className="me-2" onClick={exportPDF}>Export PDF</Button><Button variant="outline-primary" onClick={()=>onRequestRefresh&&onRequestRefresh()}>Refresh</Button></Col>
        </Row>

        <StatsCards filtered={filtered} emails={emails} userBehavior={userBehavior} />

        <ChartsPanel filtered={filtered} />

        <RecentActivity filtered={filtered} markSafe={markSafe} reportEmail={reportEmail} />

        <UrlExplorerModal urlModal={urlModal} setUrlModal={setUrlModal} />
      </div>
    </Container>
  );
}
