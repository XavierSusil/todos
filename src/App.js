import { Route, Routes } from "react-router-dom";

import TokenRedirector from "./components/TokenRedirector";
import Experiment from "./experiments/Experiment";
import Home from "./features/Home";
import Login from "./features/Login";
import Register from "./features/Register";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <TokenRedirector>
            <Login />
          </TokenRedirector>
        }
      />
      <Route
        path="/register"
        element={
          <TokenRedirector>
            <Register />
          </TokenRedirector>
        }
      />
      <Route path="/experiment" element={<Experiment />} />
    </Routes>
  );
}

export default App;
