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
  const [data, setData] = useState([]);
  const [view, setView] = useState("tabla");

  const db = getDatabase(app);

  const getData = () => {
    onValue(ref(db, "Sensores/" + date), (snapshot) => {
      const object = snapshot.val();
      if (!object) return;
      const keys = Object.keys(object);

      //data mapeada con fecha y hora obtenidad del id del objeto
      const newData = keys.map((h) => {
        return {
          ...object[h],
          fecha: h + " " + date,
        };
      });
      setData(newData.reverse());
    });
  };

  const setTest = () => {
    set(ref(db, "Sensores/" + date + "/" + hora), {
      co: 10 * Math.random(),
      humedad: 10 * Math.random(),
      luz: 10 * Math.random(),
      lluvia: 10 * Math.random(),
      suelo: 10 * Math.random(),
      temperatura: 10 * Math.random(),
    });

    onValue(ref(db, "Sensores/" + date), (snapshot) => {
      const object = snapshot.val();
      console.log(object);
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
        if (!data.length)
          return <div className="col-12 text-center mt-2">No hay datos</div>;
        return <Graficos data={data} />;
      case "ultimos":
        if (!data.length)
          return <div className="col-12 text-center mt-2">No hay datos</div>;
        return (
          <Ultimos
            humedad={data[1].humedad}
            temperatura={data[1].temperatura}
            luz={data[1].luz}
            lluvia={data[1].lluvia}
            suelo={data[1].suelo}
            co={data[1].co}
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
        <button
          className="btn btn btn-dark col-12 col-md-3 "
          onClick={() => setTest()}
        >
          Test
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
