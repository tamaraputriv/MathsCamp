import NavBarPre from "../components/Navbar/NavbarPrelogin";
import LoginComponent from "../components/Login/LoginComponent";
import Footer from "../components/Footer/Footer";

export default function LoginPage() {
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
      <LoginComponent />
      <Footer />
    </div>
  );
}
