import { Fragment } from "react";

export default function ComponentB({ data }) {
  return (
    <div className="row border">
      <h4>Datos en componente b</h4>
      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <p>
              {index}: {item}{" "}
            </p>
          </Fragment>
        );
      })}
    </div>
  );
}
