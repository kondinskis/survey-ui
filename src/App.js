import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Entry from "./components/Entry";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Entry} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
