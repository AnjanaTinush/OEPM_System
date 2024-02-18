import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { IoPersonCircleSharp } from "react-icons/io5";
import logo from '../../../Images/logo.png'


import '../Css/Adminnavbar.css'

function Adminnavbar() {
  return (
    <div>
    <div className="bg  h-screen w-64 fixed border-b border-gray-300 shadow-md">
     <div className="p-6">
      <img src={logo} />
     </div>
    
     
   
   <ul>
   <li className="mb-0 mt-50">
       <MdDashboard style={{ fontSize: "30px",color:"#132A13",margin:"15px" }}/>
       <a href="#">Dashboard</a>
     </li>
 
     <li className=" mt-1">
    < IoPersonCircleSharp style={{ fontSize: "30px",color:"#132A13",margin:"15px" }} />
       <a href="#">Users</a>
     </li>
 
     <li className="mb-2 mt-1">
       <MdDashboard style={{ fontSize: "30px",color:"#132A13",margin:"15px" }}/>
       <a href="#">Leaves</a>
     </li>
   </ul>
 
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg=="
    class="img2 "></img>
    <div class="dropdown show">
   <a class=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     
   </a>
 
   <div class="dropdown-menu" >
     <div className="con">
     <a class="dropdown-item" href="#"> <span class="profile-gap"> <IoPersonCircleSharp /></span>
      Profile</a>
      <a class="dropdown-item" href="#"> <span class="profile-gap"> <TbAlertTriangleFilled />
 
 </span>
      Log Out</a>    
     </div>
   </div>
 </div>
   </div>
 
    </div>
   
   
  )
}

export default Adminnavbar