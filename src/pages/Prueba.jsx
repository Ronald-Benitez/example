import { app } from "../firebase/config";
import { getDatabase, ref, onValue } from "firebase/database";
import { VictoryLine, VictoryChart } from "victory";
import moment from "moment/moment";
import { useState} from "react";

export default function Prueba() {
  const [co, setCo] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [luz, setLuz] = useState([]);
  const [lluvia, setLluvia] = useState([]);
  const [temperatura, setTemperatura] = useState([]);
  const [suelo, setSuelo] = useState([]);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [hora, setHora] = useState("00:00");

  const db = getDatabase(app);

  const getData = () => {
   
    const newHora = hora.split(":")[0];
    console.log("hora", newHora);

    setCo([]);
    setHumedad([]);
    setLuz([]);
    setLluvia([]);
    setTemperatura([]);
    setSuelo([]);

    for (let i = 0; i <= 59; i++) {
      const h = `${newHora}:${i < 10 ? "0" + i : i}`;
      getSensorData(h);
    }
  };

  const getSensorData = (h) => {
    onValue(ref(db, "Sensores/" + date + "/" + h), (snapshot) => {
      const object = snapshot.val();
      object.fecha = h + " " + date;

      if (!object) return;

      setCo((prevState) => [...prevState, object.co]);
      setHumedad((prevState) => [...prevState, object.humedad]);
      setLuz((prevState) => [...prevState, object.luz]);
      setLluvia((prevState) => [...prevState, object.lluvia]);
      setTemperatura((prevState) => [...prevState, object.temperatura]);
      setSuelo((prevState) => [...prevState, object.suelo]);

      console.log(snapshot.val());
      console.log("Sensores/" + date + "/" + hora);
    });
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
      </div>
      {co.length > 0 && (
        <VictoryChart>
          <VictoryLine data={co} />
        </VictoryChart>
      )}
      {humedad.length > 0 && (
        <VictoryChart>
          <VictoryLine data={humedad} />
        </VictoryChart>
      )}
      {suelo.length > 0 && (
        <VictoryChart>
          <VictoryLine data={suelo} />
        </VictoryChart>
      )}
      {luz.length > 0 && (
        <VictoryChart>
          <VictoryLine data={luz} />
        </VictoryChart>
      )}
      {lluvia.length > 0 && (
        <VictoryChart>
          <VictoryLine data={lluvia} />
        </VictoryChart>
      )}
      {temperatura.length > 0 && (
        <VictoryChart>
          <VictoryLine data={temperatura} />
        </VictoryChart>
      )}
    </div>
  );
}
