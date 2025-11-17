import React, { useEffect, useState } from "react";
import axios from "axios";

// You will pass userEmail as a prop from Landing or after Login/Register
export default function Dashboard({ userEmail }) {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/emails/${userEmail}`);
            setEmails(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching emails:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userEmail) return;
        fetchEmails();

        // Optional: real-time polling every 5 sec
        const interval = setInterval(fetchEmails, 5000);
        return () => clearInterval(interval);
    }, [userEmail]);

    if (!userEmail) return <p>Please login to see your dashboard.</p>;
    if (loading) return <p>Loading your emails...</p>;

    return (
        <div className="container mt-5">
            <h2>📊 Dashboard for {userEmail}</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Sender</th>
                        <th>Prediction</th>
                        <th>Confidence</th>
                        <th>URLs</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No scanned emails yet.</td>
                        </tr>
                    )}
                    {emails.map((email, idx) => (
                        <tr key={idx}>
                            <td>{email.subject}</td>
                            <td>{email.sender}</td>
                            <td>{email.prediction === 1 ? "🚨 Phishing" : "✅ Clean"}</td>
                            <td>{email.confidence?.toFixed(2) || "—"}</td>
                            <td>
                                {email.urls && email.urls.length > 0 ? (
                                    email.urls.map((u, i) => (
                                        <div key={i} className="mb-1">
                                            <a
                                                href={u.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "#007bff",
                                                    fontWeight: "bold",
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                {u.url.length > 50 ? u.url.substring(0, 50) + "..." : u.url}
                                            </a>

                                            <span
                                                style={{
                                                    marginLeft: 8,
                                                    padding: "2px 6px",
                                                    borderRadius: "5px",
                                                    backgroundColor: u.prediction === 1 ? "#ffcccc" : "#ccffcc",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                {u.prediction === 1 ? "🚨 Phishing" : "✅ Clean"} (
                                                {u.confidence})
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <span>No URLs</span>
                                )}
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
