import React from "react";

export default function Ultimos({
  humedad,
  co,
  luz,
  suelo,
  lluvia,
  temperatura,
}) {
  return (
    <div>
      <h1>Ultimos</h1>
      <div className="row">
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">O2</h3>
          {co && co}
        </div>{" "}
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">Humedad</h3>
          {humedad && humedad}
        </div>{" "}
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">Suelo</h3>
          {suelo && suelo}
        </div>{" "}
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">Luz</h3>
          {luz && luz}
        </div>{" "}
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">Lluvia</h3>
          {lluvia && lluvia}
        </div>{" "}
        <div className="col-12 col-md-4 mt-3">
          <h3 className="text-center">Temperatura</h3>
          {temperatura && temperatura}
        </div>{" "}
      </div>
    </div>
  );
}
