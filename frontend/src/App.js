import { BrowserRouter , Route, Routes } from "react-router-dom";

import Looginscreen from "./Screens/Login/Looginscreen";
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
import Userupdate from "./Screens/Employee/Userupdate";
import { Toaster } from "react-hot-toast";
import Tunnels from "./Screens/Tunnel/Tunnels";
import Employeeprofiledashboard from "./Screens/Employee/Employeeprofiledashboard";
import Tunnelupdate from "./Screens/Tunnel/Tunnelupdate";




function App() {
  return (
    <div className="App">

    

    <BrowserRouter>

    <Toaster
  position="top-center"
  reverseOrder={false}
/>
          
      <Routes>
      
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
      <Route path="/e_updates/:userid" element={<Userupdate/>}/>
      <Route path="/e_profile_dashboard" element={<Employeeprofiledashboard/>}/>

      
      <Route path="/t_tunnels" element={<Tunnels/>}/>
      <Route path="/t_tunnelUpdate/:tunnelid" element={<Tunnelupdate/>}/>
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;
