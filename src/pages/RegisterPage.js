import NavBarPre from "../components/Navbar/NavbarPrelogin";
import RegisterComponent from "../components/Login/RegisterComponent";
import Footer from "../components/Footer/Footer";

export default function RegisterPage() {
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
      <RegisterComponent />
      <Footer />
    </div>
  );
}
