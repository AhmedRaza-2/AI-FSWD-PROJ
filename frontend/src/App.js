// App.js
import React from "react";

function App() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/Application Files.zip"; 
    link.download = "Application Files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Outlook Phishing Detector Add-In</h1>

      <p style={styles.desc}>
        Yo! Here’s your plug-and-play Outlook add-in. Just download, extract,
        install. Zero drama, zero unblocking. Smooth af.
      </p>

      <button style={styles.btn} onClick={handleDownload}>
        ⬇️ Download Add-In (ZIP)
      </button>

      <div style={styles.card}>
        <h2>📌 How to Install</h2>
        <ol>
          <li>Download the ZIP above.</li>
          <li>Extract it anywhere on your PC.</li>
          <li>Open the folder → double-click <b>setup.exe</b>.</li>
          <li>Finish installation → open Outlook.</li>
          <li>You’ll see your plugin in Ribbon. That’s it 😎</li>
        </ol>
      </div>

      <div style={styles.card}>
        <h2>⚠️ If Windows Blocks It</h2>
        <p>
          Click <b>More Info → Run Anyway</b>.  
          This happens because it's unsigned (normal for free deployments).
        </p>
        <p>No need to manually “Unblock” the ZIP or DLL files.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "700px",
    margin: "auto"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  desc: {
    fontSize: "18px",
    marginBottom: "20px"
  },
  btn: {
    padding: "14px 24px",
    backgroundColor: "#0078D4",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "25px"
  },
  card: {
    background: "#f7f7f7",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  }
};

export default App;
