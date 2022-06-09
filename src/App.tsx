import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./Routes/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home></Home>}></Route>
        <Route></Route>
        <Route></Route>
      </Switch>
    </Router>
  );
}

export default App;
