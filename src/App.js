import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:cat/:dif" element={<Quiz />} />
        
      </Routes>
    </Router>

  );
}

export default App;
