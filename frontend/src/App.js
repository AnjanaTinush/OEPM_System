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
import Targets from "./Screens/Targets/Targets";
import ManageTargets from "./Screens/Targets/ManageTargets";
import UpdateTarget from "./Screens/Targets/UpdateTarget";





function App() {
  return (
    <div className="App">

    

    <BrowserRouter>
          
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
      <Route path="/t_targets" element={<Targets/>}/>
      <Route path="/m_targets" element={<ManageTargets/>}/>
      <Route path="/t_targetupdate/:targetid" element={<UpdateTarget/>}/>
      
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;
