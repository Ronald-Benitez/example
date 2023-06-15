import { app } from "../firebase/config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import PDFBuilder from "../components/PDFBuilder";
import { VictoryLine, VictoryChart } from "victory";

import { useState, useEffect, Fragment } from "react";

import { Link } from "react-router-dom";

import ComponentA from "../components/ComponentA";
import ComponentB from "../components/ComponentB";

export default function Prueba() {
  const [toggleComponent, setToggleComponent] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const db = getDatabase(app);

  const setArrayToFirebase = () => {
    set(ref(db, "array/"), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const setObjetToFirebase = () => {
    set(ref(db, "object/"), {
      uno: 1,
      dos: 2,
      tres: 3,
      cuatro: 4,
      cinco: 5,
    });
  };

  const setStringToFirebase = () => {
    set(ref(db, "string/"), "Hola mundo");
  };

  useEffect(() => {
    setArrayToFirebase();
    setObjetToFirebase();
    setStringToFirebase();
    sendPrecipitations();

    onValue(ref(db, "object/"), (snapshot) => {
      const dataObject = snapshot.val();
      console.log(dataObject);
      const dataArray = Object.values(dataObject); // Convertir el objeto en un array
      setData(dataArray);
      console.log(dataArray);
    });

    onValue(ref(db, "array/"), (snapshot) => {
      const dataArray = snapshot.val();
      console.log(dataArray);
      setDataChart(dataArray.slice(-3));
    });
  }, []);

  const dataToObjectXY = (data) => {
    const dataObject = [];
    data.forEach((item, index) => {
      console.log(item);
      console.log(index);
      //x is an hour getting with new Date plus the index
      //y is the value
      dataObject.push({ x: new Date().getHours() + index, y: item });
    });
    return dataObject;
  };

  const sendPrecipitations = () => {
    const data = [1, 0, 1, 1, 1, 0, 1, 0, 1];
    set(ref(db, "precipitations/"), data);
  };

  return (
    <div className="container">
      aaaaaaaaaaaa
      <div className="btn btn-outline-dark">
        <Link to="/pepe2">Ir a B</Link>
      </div>
      <div className="container">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            setToggleComponent(!toggleComponent);
          }}
        >
          Change component
        </button>
      </div>
      {toggleComponent ? (
        <ComponentA data={data} setData={setData} />
      ) : (
        <ComponentB data={data} />
      )}
      <div>{count}</div>
      <PDFBuilder />
      <div className="container">
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          {dataChart.length > 0 && (
            <VictoryChart>
              <VictoryLine data={dataChart} />
            </VictoryChart>
          )}
        </div>
      </div>
    </div>
  );
}
