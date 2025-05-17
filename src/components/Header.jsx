import { useState } from "react";

function Header({ userName, setUserName }) {
  const [editing, setEditing] = useState(userName === "");

  const handleBlur = () => {
    if (!userName.trim()) setEditing(true);
    else setEditing(false);
  };

  return (
    <header className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
      <h1 style={{ margin: 0 }}>SocialSphere</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          className="author-avatar"
          style={{ cursor: "pointer" }}
          onClick={() => setEditing(true)}
          title={userName ? `Logged in as ${userName}` : "Set your name"}
        >
          {userName && userName.trim() ? userName.trim()[0].toUpperCase() : "👤"}
        </div>
        {editing ? (
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            onBlur={handleBlur}
            maxLength={30}
            autoFocus
            style={{
              border: "1.5px solid var(--primary)",
              borderRadius: 6,
              padding: "8px 12px",
              background: "#3a3b3c",
              color: "var(--text-color)",
              fontWeight: 500
            }}
          />
        ) : (
          <span style={{ marginLeft: 3, fontWeight: 600, cursor: "pointer" }} onClick={() => setEditing(true)}>
            {userName ? userName : "Set name"}
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
