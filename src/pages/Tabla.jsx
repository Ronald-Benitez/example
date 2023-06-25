import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../firebase/config"; //Configuración de firebase
import moment from "moment/moment"; //Librería para manejar fechas
import Table from "./Table";

export default function Tabla({ data }) {
  return (
    <div className="container mt-4">
      <div>
        <Table data={data} />
      </div>
    </div>
  );
}
