import { Link } from "react-router-dom";

export default function Tercera() {
  const links = ["/pepe", "/pepe2", "/tercera"];

  return (
    <div>
      {links.map((link, index) => {
        return (
          <div key={index} className="btn btn-outline-dark">
            <Link to={link}>Ir a {link}</Link>
          </div>
        );
      })}
    </div>
  );
}
