import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
