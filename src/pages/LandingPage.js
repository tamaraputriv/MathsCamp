import NavBarPre from "../components/Navbar/NavbarPrelogin";
import LoginRegisterCard from "../components/Login/LoginRegisterCard";
import Footer from "../components/Footer/Footer";

export default function LandingPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBarPre />
      <LoginRegisterCard />
      <Footer />
    </div>
  );
}
