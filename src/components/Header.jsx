import { useUser } from "../UserContext";

function Header() {
  const user = useUser();
  return (
    <header style={{
      background: "#1976d2",
      color: "#fff",
      padding: "18px 0",
      textAlign: "center",
      marginBottom: 24,
      fontSize: "1.4em",
      fontWeight: 700,
    }}>
      SocialSphere
      <span style={{
        float: "right",
        marginRight: 24,
        fontSize: "1em",
        fontWeight: 400,
      }}>
        {user?.displayName ? `👤 ${user.displayName}` : ""}
      </span>
    </header>
  );
}

export default Header;
