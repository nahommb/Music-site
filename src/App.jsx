import React from "react";
import Home from "./Home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Add from "./Add";
import Edit from "./Edit";


function App() {


  return (
    <BrowserRouter>

      <Routes>

      <Route path="/" element={<Home/>}></Route>
      <Route path="/add" element={<Add/>}></Route>
      <Route path="/edit/:id" element={<Edit/>}></Route>
      
      
      </Routes>

    </BrowserRouter>
  );
}

export default App;
