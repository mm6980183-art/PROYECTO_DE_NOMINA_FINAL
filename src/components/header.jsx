import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/createuser" style={styles.link}>createuser</Link>
        <Link to="/downloads" style={styles.link}>downloads</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#222",
    padding: "15px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Header;
