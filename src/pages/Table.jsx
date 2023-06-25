import React from "react";
import DataTable from "react-data-table-component";

export default function Table({ data }) {
  //data to array
  const dataToArray = Object.values(data);
  console.log(dataToArray);

  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "Temperatura",
      selector: (row) => row.temperatura,
      sortable: true,
    },
    {
      name: "Humedad",
      selector: (row) => row.humedad,
      sortable: true,
    },
    {
      name: "Lluvia",
      selector: (row) => row.lluvia,
      sortable: true,
    },
    {
      name: "Niveles CO2",
      selector: (row) => row.co,
      sortable: true,
    },
    {
      name: "Humedad del Suelo",
      selector: (row) => row.suelo,
      sortable: true,
    },
    {
      name: "Nivel de Luz",
      selector: (row) => row.luz,
      sortable: true,
    },
    
  ];

  return (
    <div>
      <DataTable
        title="Sensores"
        columns={columns}
        data={dataToArray}
        pagination
      />
    </div>
  );
}
