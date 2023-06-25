import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../firebase/config"; //Configuración de firebase
import moment from "moment/moment"; //Librería para manejar fechas
import Table from "./Table";

export default function Sensores() {
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [hora, setHora] = useState("00:00");

  const [co, setCo] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [luz, setLuz] = useState([]);
  const [lluvia, setLluvia] = useState([]);
  const [temperatura, setTemperatura] = useState([]);
  const [suelo, setSuelo] = useState([]);
  const [data, setData] = useState([]);

  const db = getDatabase(app);

  const getData = () => {
    //hora es tipo HH:mm pero quiero extraer todos los datos con HH:00 hasta HH:59
    const newHora = hora.split(":")[0];
    console.log("hora", newHora);

    setCo([]);
    setHumedad([]);
    setLuz([]);
    setLluvia([]);
    setTemperatura([]);
    setSuelo([]);
    setData([]);

    for (let i = 0; i <= 59; i++) {
      const h = `${newHora}:${i < 10 ? "0" + i : i}`;
      getSensorData(h);
    }
  };

  const getSensorData = (h) => {
    onValue(ref(db, "Sensores/" + date + "/" + h), (snapshot) => {
      const object = snapshot.val();
      object.fecha = h + " " + date;

      if (!object)
        return console.log(
          "No hay datos para la hora " + h + " del día " + date
        );

      setCo((prevState) => [...prevState, object.co]);
      setHumedad((prevState) => [...prevState, object.humedad]);
      setLuz((prevState) => [...prevState, object.luz]);
      setLluvia((prevState) => [...prevState, object.lluvia]);
      setTemperatura((prevState) => [...prevState, object.temperatura]);
      setSuelo((prevState) => [...prevState, object.suelo]);

      setData((prevState) => [...prevState, object]);

      console.log(snapshot.val());
      console.log("Sensores/" + date + "/" + hora);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderData = () => {
    return (
      <div>
        <h2>CO</h2>
        <pre>{co && JSON.stringify(co, null, 2)}</pre>
        <h2>Humedad</h2>
        <pre>{humedad && JSON.stringify(humedad, null, 2)}</pre>
        <h2>Luz</h2>
        <pre>{JSON.stringify(luz, null, 2)}</pre>
        <h2>Lluvia</h2>
        <pre>{JSON.stringify(lluvia, null, 2)}</pre>
        <h2>Temperatura</h2>
        <pre>{JSON.stringify(temperatura, null, 2)}</pre>
        <h2>Suelo</h2>
        <pre>{JSON.stringify(suelo, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="">
        <h1 className="text-center">Sensores</h1>
        <div className="input-group justify-content-center">
          <div className="col-12 col-md-4">
            <input
              type="date"
              className="form-control"
              onChange={(e) =>
                setDate(moment(e.target.value).format("DD-MM-YYYY"))
              }
            />
          </div>
          <div className="col-12 col-md-2 ">
            <input
              type="time"
              className="form-control "
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-2">
            <button onClick={getData} className="btn btn-outline-dark">
              Buscar
            </button>
          </div>
        </div>

        <div>
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}
