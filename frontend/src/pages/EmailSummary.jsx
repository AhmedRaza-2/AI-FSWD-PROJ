import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

// Minimal stopwords list
const stopwords = [
  "the","is","in","and","to","a","of","for","on","with","at","by","from",
  "an","be","this","that","as","or","it","are","was","you","your","have"
];

export default function EmailSummary({ emails }) {

    const stats = useMemo(() => {
        const total = emails.length;
        const phishingEmails = emails.filter(e => e.prediction === 1);
        const phishingCount = phishingEmails.length;
        const clean = total - phishingCount;

        // URLs stats
        const urlStats = { total: 0, phishing: 0 };
        emails.forEach(e => e.urls?.forEach(u => {
            urlStats.total++;
            if (u.prediction === 1) urlStats.phishing++;
        }));

        // Sender stats for phishing emails
        const phishingSenders = {};
        phishingEmails.forEach(e => {
            if (!phishingSenders[e.sender]) phishingSenders[e.sender] = 0;
            phishingSenders[e.sender]++;
        });
        const sortedPhishingSenders = Object.entries(phishingSenders)
            .sort((a, b) => b[1] - a[1]);

        // ------- Most common phishing words -------
        const wordFreq = {};
        phishingEmails.forEach(e => {
            const words = e.subject
                ?.toLowerCase()
                .replace(/[^a-z\s]/g, "")
                .split(/\s+/) || [];
            words.forEach(w => {
                if (!stopwords.includes(w) && w.length > 2) {
                    wordFreq[w] = (wordFreq[w] || 0) + 1;
                }
            });
        });
        const commonWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // top 10 words

        return {
            total,
            phishingCount,
            clean,
            urlStats,
            sortedPhishingSenders,
            commonWords
        };
    }, [emails]);

    const pieData = {
        labels: ["Phishing", "Clean"],
        datasets: [{
            data: [stats.phishingCount, stats.clean],
            backgroundColor: ["#ff4d4d", "#4dff88"]
        }]
    };

    return (
        <div className="row my-4">

            {/* ------- Summary Cards ------- */}
            <div className="col-md-3">
                <div className="p-3 border rounded shadow-sm">
                    <h5>Total Emails</h5>
                    <h3>{stats.total}</h3>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 border rounded shadow-sm text-danger">
                    <h5>Phishing Emails</h5>
                    <h3>{stats.phishingCount}</h3>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 border rounded shadow-sm text-success">
                    <h5>Clean Emails</h5>
                    <h3>{stats.clean}</h3>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 border rounded shadow-sm">
                    <h5>Total URLs</h5>
                    <h3>{stats.urlStats.total}</h3>
                    <p className="text-danger m-0">Phishing: {stats.urlStats.phishing}</p>
                </div>
            </div>

            {/* ------- Pie Chart ------- */}
            <div className="col-md-6 mt-4">
                <div className="p-4 border rounded shadow-sm">
                    <h5 className="mb-3">Email Breakdown</h5>
                    <Doughnut data={pieData} />
                </div>
            </div>

            {/* ------- Top Phishing Senders ------- */}
            <div className="col-md-6 mt-4">
                <div className="p-4 border rounded shadow-sm">
                    <h5 className="mb-3">Senders of Phishing Emails</h5>
                    {stats.sortedPhishingSenders.length === 0 ? (
                        <p>No phishing emails yet.</p>
                    ) : (
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Phishing Emails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.sortedPhishingSenders.map(([sender, count], idx) => (
                                    <tr key={idx}>
                                        <td>{sender}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* ------- Most Common Phishing Words ------- */}
            <div className="col-md-12 mt-4">
                <div className="p-4 border rounded shadow-sm">
                    <h5 className="mb-3">Most Common Words in Phishing Emails</h5>
                    {stats.commonWords.length === 0 ? (
                        <p>No phishing emails to analyze words yet.</p>
                    ) : (
                        <div className="d-flex flex-wrap gap-2">
                            {stats.commonWords.map(([word, count], idx) => (
                                <span key={idx} className="badge bg-danger p-2">
                                    {word} ({count})
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
