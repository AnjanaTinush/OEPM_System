import { BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Looginscreen from "./Screens/Login/Looginscreen";
<<<<<<< Updated upstream
=======
import Signupscreen from "./Screens/Login/Signupscreen";
import Homepage from "./Screens/Homepage";
import Employeedashboard from "./Screens/Employee/Employeedashboard";
import Inventorydashboard from "./Screens/Inventory/Inventorydashboard";
import Tunneldashboard from "./Screens/Tunnel/Tunneldashboard";
import Machinedashboard from "./Screens/Machine/Machinedashboard";
import Curiorservisedashboard from "./Screens/Curiorservice/Curiorservisedashboard";
import C_displayitem from "./Screens/Customerorder/C_displayitem";
import Financialdasgboard from "./Screens/Financial/Financialdasgboard";
import Targetsdashboard from "./Screens/Targets/Targetsdashboard";
import Userprofile from "./Screens/User/Userprofile";
import Allusers from "./Screens/Employee/Allusers";
import Drivers from "./Screens/Curiorservice/Drivers";



>>>>>>> Stashed changes




function App() {
  return (
    <div className="App">

     <Navbar/>    

    <BrowserRouter>
          
      <Routes>
      
<<<<<<< Updated upstream
      <Route path="/login" exact Component={Looginscreen}/>
       
=======
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Looginscreen/>}/>
      <Route path="/register" element={<Signupscreen/>}/>
      <Route path="/employeeDashboard" element={<Employeedashboard/>}/>
      <Route path="/inventorydasgboard" element={<Inventorydashboard/>}/>
      <Route path="/tunneldashboard" element={<Tunneldashboard/>}/>
      <Route path="/machinedashboard" element={<Machinedashboard/>}/>
      <Route path="/curiorservisedashboard" element={<Curiorservisedashboard/>}/>
      <Route path="/c_displayitem" element={<C_displayitem/>}/>
      <Route path="/financialdashboard" element={<Financialdasgboard/>}/>
      <Route path="/targetsdashboard" element={<Targetsdashboard/>}/>
      <Route path="/userprofile" element={<Userprofile/>}/>
      <Route path="/e_allusers" element={<Allusers/>}/>
      <Route path="/j_drivers" element={<Drivers/>}/>
      
      
>>>>>>> Stashed changes
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;
