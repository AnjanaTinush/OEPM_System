import { BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Looginscreen from "./Screens/Login/Looginscreen";




function App() {
  return (
    <div className="App">

     <Navbar/>    

    <BrowserRouter>
          
      <Routes>
      
      <Route path="/login" exact Component={Looginscreen}/>
       
      </Routes>
   
    </BrowserRouter>
    
    </div>
  );
}

export default App;
