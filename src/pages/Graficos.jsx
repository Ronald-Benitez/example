import { VictoryLine, VictoryChart } from "victory";

export default function Prueba({
  humedad,
  co,
  luz,
  suelo,
  lluvia,
  temperatura,
}) {


  
  return (
    <div className="row">
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">O2</h3>
        {co.length > 0 && (
          <VictoryChart>
            <VictoryLine data={co} />
          </VictoryChart>
        )}
      </div>{" "}
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">Humedad</h3>
        {humedad.length > 0 && (
          <VictoryChart>
            <VictoryLine data={humedad} />
          </VictoryChart>
        )}
      </div>{" "}
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">Suelo</h3>
        {suelo.length > 0 && (
          <VictoryChart>
            <VictoryLine data={suelo} />
          </VictoryChart>
        )}
      </div>{" "}
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">Luz</h3>
        {luz.length > 0 && (
          <VictoryChart>
            <VictoryLine data={luz} />
          </VictoryChart>
        )}
      </div>{" "}
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">Lluvia</h3>
        {lluvia.length > 0 && (
          <VictoryChart>
            <VictoryLine data={lluvia} />
          </VictoryChart>
        )}
      </div>{" "}
      <div className="col-12 col-md-4 mt-3">
        <h3 className="text-center">Temperatura</h3>
        {temperatura.length > 0 && (
          <VictoryChart>
            <VictoryLine data={temperatura} />
          </VictoryChart>
        )}
      </div>
    </div>
  );
}
