import axios from "axios";
import css from "../Styles/user.module.css";
import React from "react";
const UserAnonce = () => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  const [Data, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/Admin", {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err); // Handle error response
      });
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    alert(`Delete anonce with ID: ${id}`);

    axios
      .delete(`http://localhost:8080/api/Admin/${id}`, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Remove the deleted announcement from the data array
        setData((prevData) =>
          prevData.filter((anonce) => anonce.idAnonce !== id)
        );
      })
      .catch((err) => {
        console.log(err); // Handle error response
      });
  };
  return (
    <>
      <div className="anonce">
        <h2>anonce de tous les utilisateur</h2>
      </div>
      <table className={css.table}>
        <thead className={css.thead}>
          <tr className={css.th}>
            <th>ID</th>
            <th>nom</th>
            <th>Surface</th>
            <th>description</th>
            <th>prix</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody className={css.td}>
          {Data.map((anonce) => {
            return (
              <tr key={anonce.idAnonce} className={css.td}>
                <td>{anonce.idAnonce}</td>
                <td>{anonce.Nom}</td>
                <td>{anonce.Surface}</td>
                <td>{anonce.description}</td>
                <td>{anonce.prix}</td>
                <td>{anonce.email}</td>
                <td>
                  <button>{anonce.enabled ? "desactiver" : "activer"}</button>
                  <button onClick={() => handleDelete(anonce.idAnonce)}>
                    supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserAnonce;
