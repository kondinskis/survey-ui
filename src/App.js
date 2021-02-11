import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Entry from "./components/Entry";
import Login from "./components/Login";
import PrivateRoute from "./components/core/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Entry} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
