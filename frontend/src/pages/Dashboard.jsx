import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import EmailSummary from "./EmailSummary";

export default function Dashboard({ userEmail }) {
    const [emails, setEmails] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const cacheRef = useRef(null); // store previous emails to prevent unnecessary rerender
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const fetchEmails = async (firstLoad = false) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/emails/${userEmail}`);
            const newData = res.data;

            // Only update state if data changed
            if (JSON.stringify(newData) !== JSON.stringify(cacheRef.current)) {
                cacheRef.current = newData;
                setEmails(newData);
            }

            if (firstLoad) setInitialLoading(false); // turn off loading only on first load
        } catch (err) {
            console.error("Error fetching emails:", err);
            if (firstLoad) setInitialLoading(false);
        }
    };

    useEffect(() => {
        if (!userEmail) return;

        fetchEmails(true); // first load with spinner

        const interval = setInterval(() => fetchEmails(false), 5000); // smooth update every 5s
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail]);

    const sortedEmails = React.useMemo(() => {
        if (!sortConfig.key) return emails;
        return [...emails].sort((a, b) => {
            let valA = a[sortConfig.key], valB = b[sortConfig.key];
            if (typeof valA === "string") valA = valA.toLowerCase();
            if (typeof valB === "string") valB = valB.toLowerCase();
            if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
            if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [emails, sortConfig]);

    const handleSort = key => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    };

    if (!userEmail) return <p>Please login to see your dashboard.</p>;
    if (initialLoading) return <p>Loading your emails...</p>;

    return (
        <div className="container mt-5">
            <h2>📊 Dashboard for {userEmail}</h2>

            {/* Enhanced Summary + Charts */}
            <EmailSummary emails={emails} />

            {/* Emails Table */}
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("subject")} style={{cursor:"pointer"}}>Subject</th>
                        <th onClick={() => handleSort("sender")} style={{cursor:"pointer"}}>Sender</th>
                        <th onClick={() => handleSort("prediction")} style={{cursor:"pointer"}}>Prediction</th>
                        <th onClick={() => handleSort("confidence")} style={{cursor:"pointer"}}>Confidence</th>
                        <th>URLs</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmails.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No scanned emails yet.</td>
                        </tr>
                    )}

                    {sortedEmails.map((email, idx) => (
                        <tr key={email._id || idx}>
                            <td>{email.subject}</td>
                            <td>{email.sender}</td>
                            <td>{email.prediction === 1 ? "🚨 Phishing" : "✅ Clean"}</td>
                            <td>{email.confidence?.toFixed(2) || "—"}</td>
                            <td>
                                {email.urls && email.urls.length > 0 ? email.urls.map((u, i) => (
                                    <div key={i} className="mb-1">
                                        <a href={u.url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", fontWeight: "bold", textDecoration: "underline" }}>
                                            {u.url.length > 50 ? u.url.substring(0, 50) + "..." : u.url}
                                        </a>
                                        <span style={{
                                            marginLeft: 8,
                                            padding: "2px 6px",
                                            borderRadius: "5px",
                                            backgroundColor: u.prediction === 1 ? "#ffcccc" : "#ccffcc",
                                            fontSize: "12px"
                                        }}>
                                            {u.prediction === 1 ? "🚨 Phishing" : "✅ Clean"} ({u.confidence})
                                        </span>
                                    </div>
                                )) : <span>No URLs</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
