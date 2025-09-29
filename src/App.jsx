
import './assets/css/index.css'
import Homepage from './page/Homepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}
