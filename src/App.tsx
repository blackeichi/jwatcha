import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./Routes/Home";
import Video from "./Routes/Video";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/browse" element={<Video></Video>}></Route>
        <Route></Route>
      </Switch>
    </Router>
  );
}

export default App;
