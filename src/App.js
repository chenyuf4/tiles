import "./App.scss";
import RoutesPath from "routes/Routes";
import { Router } from "react-router-dom";
import history from "routes/history";

const App = () => {
  return (
    <Router location={history}>
      <RoutesPath />
    </Router>
  );
};

export default App;
