import { BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Looginscreen from "./Screens/Login/Looginscreen";
import Signupscreen from "./Screens/Login/Signupscreen";




function App() {
  return (
    <div className="App">

     <Navbar/>    

    <BrowserRouter>
          
      <Routes>
      
      <Route path="/login" exact Component={Looginscreen}/>
      <Route path="/register" exact Component={Signupscreen}/>
       
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;
