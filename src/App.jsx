import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js" 
import Index from "./Component/index";
import Create from "./Component/create";
import View from "./Component/view";
import Addcart from "./Component/cart";
import Reg from "./Component/Header/register";
import Login from "./Component/Header/login";


function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/view/:id" element={<View/>} />
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/addcart/:username" element={<Addcart/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}


export default App