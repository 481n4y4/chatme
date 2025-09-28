import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
