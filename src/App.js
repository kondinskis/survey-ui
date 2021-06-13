import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Entry from "./components/Entry";
import Login from "./components/Login";
import PrivateRoute from "./components/core/PrivateRoute";
import Register from "./components/Register";

const App = () => {
  return (
    <ToastProvider placement="bottom-right">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute path="/" component={Entry} />
        </Switch>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
