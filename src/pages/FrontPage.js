import React from "react";
import Navbar from "../components/Navbar/NavbarPostlogin";
import UserInfo from "../components/UserInfo/UserInfo";
import { User } from "../users/User";

export default function FrontPage() {
  return (
    <div>
      <Navbar />
      <UserInfo {...User} />
    </div>
  );
}
