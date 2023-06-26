import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import moment from "moment/moment";

import { app } from "./firebase/config";
import Graficos from "./pages/Graficos";
import Ultimos from "./pages/Ultimos";
import Table from "./pages/Table";

export default function App() {
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [hora, setHora] = useState(moment().format("HH:mm"));
  const [co, setCo] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [luz, setLuz] = useState([]);
  const [lluvia, setLluvia] = useState([]);
  const [temperatura, setTemperatura] = useState([]);
  const [suelo, setSuelo] = useState([]);
  const [data, setData] = useState([]);
  const [view, setView] = useState("tabla");

  const db = getDatabase(app);

  const getData = () => {
    const newHora = hora.split(":")[0];

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
      if (!object) return;
      object.fecha = h + " " + date;

      setCo((prevState) => [...prevState, object.co]);
      setHumedad((prevState) => [...prevState, object.humedad]);
      setLuz((prevState) => [...prevState, object.luz]);
      setLluvia((prevState) => [...prevState, object.lluvia]);
      setTemperatura((prevState) => [...prevState, object.temperatura]);
      setSuelo((prevState) => [...prevState, object.suelo]);

      setData((prevState) => [...prevState, object]);
    });
  };

  useEffect(() => {
    getData();
  }, [date, hora]);

  const renderView = () => {
    switch (view) {
      case "tabla":
        return <Table data={data} />;
      case "graficos":
        return (
          <Graficos
            humedad={humedad}
            temperatura={temperatura}
            luz={luz}
            lluvia={lluvia}
            suelo={suelo}
            co={co}
          />
        );
      case "ultimos":
        const lastData = data[data.length - 1];
        if (!lastData)
          return <div className="col-12 text-center">No hay datos</div>;
        return (
          <Ultimos
            humedad={lastData.humedad}
            temperatura={lastData.temperatura}
            luz={lastData.luz}
            lluvia={lastData.lluvia}
            suelo={lastData.suelo}
            co={lastData.co}
          />
        );
      default:
        return <Table data={data} />;
    }
  };

  return (
    <div className="container">
      <div className="row mt-4 border p-3 justify-content-center">
        <button
          className="btn btn-dark col-12 col-md-3 "
          onClick={() => setView("tabla")}
        >
          Tabla
        </button>

        <button
          className="btn btn btn-white border col-12 col-md-3 mx-4"
          onClick={() => setView("graficos")}
        >
          Graficos
        </button>

        <button
          className="btn btn btn-dark col-12 col-md-3 "
          onClick={() => setView("ultimos")}
        >
          Ultimos
        </button>
      </div>
      <div className="row mt-4 border py-4">
        <div className="input-group justify-content-center">
          <div className="col-12 col-md-4">
            <input
              type="date"
              className="form-control"
              value={moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")}
              onChange={(e) =>
                setDate(moment(e.target.value).format("DD-MM-YYYY"))
              }
            />
          </div>
          <div className="col-12 col-md-2 ">
            <input
              type="time"
              value={hora}
              className="form-control mx-2"
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">{renderView()}</div>
    </div>
  );
}
