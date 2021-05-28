import "./styles.css";
import Datatable from "react-data-table-component";
import users from "./data/User"; // el listado completo
import React, { useState, useEffect } from "react";

export default function App() {
  const [userLista, setUserLista] = useState([]); // listado para mostrar
  const [userSelected, setUserSelected] = useState();

  useEffect(() => {
    setUserLista(users);
  }, []);

  const cols = [
    {
      name: "Usuario",
      selector: "Usuario",
      sortable: true
    },
    {
      name: "Nombre",
      selector: "Nombre",
      sortable: true
    },
    {
      name: "Followers",
      selector: "Followers",
      sortable: true
    },
    {
      name: "Following",
      selector: "Following",
      sortable: true,
      width: 50
    },
    {
      name: "Post",
      selector: "Post",
      sortable: true,
      width: 50,
      wrap: true
    },
    {
      name: "Descripcion",
      selector: "Descripcion",
      sortable: true
    }
  ];

  const handleChange = (i) => {
    // console.log(i)
    const userSel = i.selectedRows.map((user) => user.Usuario);
    setUserSelected(userSel);
    console.log(userSel.length);
    const exportUser = JSON.stringify(userSel);
    console.log(exportUser);
  };

  const handleTextChange = async (e) => {
    const search = e.target.value;
    //console.log(search);
    filtrarUsuario(search);
  };

  const filtrarUsuario = (search) => {
    const filtrado = users.filter((user) =>
      user.Usuario.toString().toLowerCase().includes(search)
    );
    if (filtrado.length > 0) {
      console.log("encontro algo");
      setUserLista(filtrado);
    } else {
      console.log("nada por aca");
    }
  };

  return (
    <div className="App">
      <h1>Esta es la prueba DataTest</h1>
      <div>
        <label>Buscar Usuario: </label>
        <input type="text" onChange={handleTextChange} />
      </div>
      <Datatable
        columns={cols}
        data={userLista}
        title="Usuarios"
        pagination
        fixedHeader
        selectableRows
        Clicked
        onSelectedRowsChange={handleChange}
        striped
      />
    </div>
  );
}
