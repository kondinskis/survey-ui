import logo from "./logo.svg";
import "./App.scss";
import Navbar from "./components/core/Topbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Entry from "./components/Entry";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Entry} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
