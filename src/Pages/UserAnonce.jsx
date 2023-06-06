import axios from "axios";
import css from "../Styles/user.module.css";
import React from "react";
const UserAnonce = () => {
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/Admin/User", {
        headers: {
          // Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Handle success response
      })
      .catch((err) => {
        console.log(err); // Handle error response
      });
  }, []);
  const data = [
    {
      id: 1,
      nom: "John",
      prenom: "Doe",
      date_naissance: "2002-02-02",
      password: "buydv",
      sexe: "h",
    },
    {
      id: 2,
      nom: "Jane",
      prenom: "Smith",
      date_naissance: "2002-02-02",
      password: "buydv",
      sexe: "h",
    },
    {
      id: 3,
      nom: "Alice",
      prenom: "Johnson",
      date_naissance: "2002-02-02",
      password: "buydv",
      sexe: "h",
    },
    {
      id: 4,
      nom: "Bob",
      prenom: "Brown",
      date_naissance: "2002-02-02",
      password: "buydv",
      sexe: "h",
    },
  ];
  const handleEdit = (id) => {
    // Handle edit logic here
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    alert(`Delete user with ID: ${id}`);
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
            <th>prenom</th>
            <th>date naissance</th>
            <th>sexe</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody className={css.td}>
          {data.map((item) => (
            <tr key={item.id} className={css.td}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.date_naissance}</td>
              <td>{item.sexe}</td>
              <td>{item.password}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserAnonce;
