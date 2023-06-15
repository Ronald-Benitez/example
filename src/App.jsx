import { BrowserRouter, Switch, Route } from "react-router-dom";

import Prueba from "./pages/Prueba";
import PruebaB from "./pages/PruebaB";
import Tercera from "./pages/Tercera";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pepe" component={Prueba} />
        <Route path="/pepe2" component={PruebaB} />
        <Route path="/tercera" component={Tercera} />
      </Switch>
    </BrowserRouter>
  );
}
