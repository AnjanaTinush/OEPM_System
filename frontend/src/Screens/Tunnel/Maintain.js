import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Adminnavbar from "./Component/Adminnavbar";

function Maintain() {
  return (
    <div className="bg-wight-green">
        <div className="flex">
        <Adminnavbar />
        <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
            </div>
        </div>
    </div>
  )
}

export default Maintain