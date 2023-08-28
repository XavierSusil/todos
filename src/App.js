import { Routes, Route } from "react-router-dom";

import Home from "./features/Home";
import Login from "./features/Login";
import Register from "./features/Register";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
