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
import Drivers from "./Screens//Curiorservice/Drivers"
import AddDriver from "./Screens/Curiorservice/AddDriver"
import { Toaster } from "react-hot-toast";
import Employeeprofiledashboard from "./Screens/Employee/Employeeprofiledashboard";
import Euserprofile from "./Screens/Employee/Euserprofile";
import Requestedleave from "./Screens/Employee/Requestedleave";
import Approveleave from "./Screens/Employee/Approveleave";
import Updatedriver from "./Screens/Curiorservice/Updatedriver";






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
      <Route path="/j_drivers" element={<Drivers/>}/>
      <Route path="/j_addDriver" element={<AddDriver/>}/>
      <Route path="/e_profile_dashboard" element={<Employeeprofiledashboard/>}/>
      <Route path="e_userprofile" element={<Euserprofile/>}/>
      <Route path="e_requestedleave" element={<Requestedleave/>}/>
      <Route path="e_approveleave" element={<Approveleave/>}/>
      <Route path="j_updatedriver/:id" element={<Updatedriver/>}/>
      
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;
