import css from "../styles/Sidebar.module.css";

const Sidebar = ({ activeItem, onItemClick }) => {
  return (
    <div className={css.sidebar}>
      <div
        className={`${css.sidebar_item} ${
          activeItem === "dashboard" ? css.sidebar_item_active : ""
        }`}
        onClick={() => onItemClick("dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`sidebar-item ${activeItem === "anonce" ? "active" : ""}`}
        onClick={() => onItemClick("anonce")}
      >
        Anonce
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "Utilisateur" ? "active" : ""
        }`}
        onClick={() => onItemClick("Utilisateur")}
      >
        Utilisteur
      </div>
      <div
        className={`sidebar-item ${
          activeItem === "deconecter" ? "active" : ""
        }`}
        onClick={() => onItemClick("deconecter")}
      >
        deconecter
      </div>
    </div>
  );
};

export default Sidebar;
