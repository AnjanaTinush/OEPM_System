import { BrowserRouter , Route, Routes } from "react-router-dom";

import Looginscreen from "./Screens/Login/Looginscreen";
import Signupscreen from "./Screens/Login/Signupscreen";
import Homepage from "./Screens/Homepage";
import Employeedashboard from "./Screens/Employee/Employeedashboard";
import Inventorydashboard from "./Screens/Inventory/Inventorydashboard";
import Tunneldashboard from "./Screens/Tunnel/Tunneldashboard";
import Machinedashboard from "./Screens/Machine/Machinedashboard";
import C_displayitem from "./Screens/Customerorder/C_displayitem";
import Financialdasgboard from "./Screens/Financial/Financialdasgboard";
import Targetsdashboard from "./Screens/Targets/Targetsdashboard";
import Userprofile from "./Screens/User/Userprofile";
import Allusers from "./Screens/Employee/Allusers";
import Userupdate from "./Screens/Employee/Userupdate";
import Drivers from "./Screens//Curiorservice/Drivers"
import AddDriver from "./Screens/Curiorservice/AddDriver"
import Updatedriver from "./Screens/Curiorservice/Updatedriver";
import Curiorservisedashboard from "./Screens/Curiorservice/Curiorservisedashboard";
import Deliveries from "./Screens/Curiorservice/Deliveries";
import Driverprofile from "./Screens/Curiorservice/Driverprofile";
import { Toaster } from "react-hot-toast";
import Tunnels from "./Screens/Tunnel/Tunnels";
import Employeeprofiledashboard from "./Screens/Employee/Employeeprofiledashboard";
import Tunnelupdate from "./Screens/Tunnel/Tunnelupdate";
import Euserprofile from "./Screens/Employee/Euserprofile";
import Requestedleave from "./Screens/Employee/Requestedleave";
import ShoppingCart from "./Screens/Customerorder/ShoppingCart";
import CheckoutPage from "./Screens/Customerorder/checkout";
import PaymentPage from "./Screens/Customerorder/payment";

import Approveleave from "./Screens/Employee/Approveleave";




import Manage from "./Screens/Inventory/Manage";
import Itemupdate from "./Screens/Inventory/Itemupdate";
import Itemhistory from "./Screens/Inventory/History";
import Itemfaq from "./Screens/Inventory/Faq";
import Tunnelprofile from "./Screens/Tunnel/Tunnelprofile";
import Edidemployeeprofile from './Screens/Employee/Edidemployeeprofile'


import ManageTargets from "./Screens/Targets/ManageTargets";
import Targets from "./Screens/Targets/Targets";
import UpdateTarget from "./Screens/Targets/UpdateTarget";





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
      <Route path="/u_userprofile" element={<Userprofile/>}/>
      <Route path="/e_allusers" element={<Allusers/>}/>
      <Route path="/e_updates/:userid" element={<Userupdate/>}/>
      <Route path="/j_drivers" element={<Drivers/>}/>
      <Route path="/j_addDriver" element={<AddDriver/>}/>
      <Route path="/j_deliveries" element={<Deliveries/>}/>
      <Route path="/e_profile_dashboard" element={<Employeeprofiledashboard/>}/>
      <Route path="e_userprofile/:empid" element={<Euserprofile/>}/>
      <Route path="e_requestedleave" element={<Requestedleave/>}/>
      <Route path="shoppingCart" element={<ShoppingCart/>}/>
      <Route path="checkout" element={<CheckoutPage/>}/>
      <Route path="payment" element={<PaymentPage/>}/>
     
      
      <Route path="e_approveleave" element={<Approveleave/>}/>
      <Route path="j_updatedriver/:id" element={<Updatedriver/>}/>
      <Route path="j_driverprofile" element={<Driverprofile/>}/>
      
      <Route path="/t_tunnelprofile" element={<Tunnelprofile/>}/>
      <Route path="/t_tunnels" element={<Tunnels/>}/>
      
      <Route path="/t_tunnelUpdate/:tunnelid" element={<Tunnelupdate/>}/>
      <Route path="/i_manage" element={<Manage/>}/>
      <Route path="/i_update/:itemid" element={<Itemupdate/>}/>
      <Route path="/i_history" element={<Itemhistory/>}/>
      <Route path="/i_faq" element={<Itemfaq/>}/>

      <Route path="/e_editprofile/:uid" element={<Edidemployeeprofile/>}/>
      <Route path="/m_targets" element={<ManageTargets/>}/>
      <Route path="/t_targets" element={<Targets/>}/>
      <Route path="/t_targetupdate/:targetid" element={<UpdateTarget/>}/>
      
      </Routes>
   
    </BrowserRouter>
    
   
    </div>
  );
}

export default App;