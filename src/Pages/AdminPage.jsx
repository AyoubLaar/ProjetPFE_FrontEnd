import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard";
import UserAnonce from "./UserAnonce";
import { useState } from "react";
import css from "../styles/AdminPage.module.css";
import Header from "../components/Header";
// import Utilisateur from "./Utilisateur";

const AdminPage = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <>
      <Header></Header>
      <div className={css.admin_page}>
        <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
        <div className={css.admin_content}>
          {/* {activeItem === "dashboard" ? <Dashboard /> : <></>} */}
          {activeItem === "anonce" ? <UserAnonce /> : <></>}
          {/* {activeItem === "Utilisateur" ? <Utilisateur /> : <></>} */}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
