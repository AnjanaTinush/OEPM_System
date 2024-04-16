import React, { useState, useRef, useEffect } from "react";
import Adminnavbar from "./Component/Adminnavbar";
import Navbar from '../././Component/Navbar'
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom";
import {useReactToPrint} from "react-to-print"
import axios from "axios";


function History() {
    return (
      <div className="bg-wight-green h-screen flex flex-col">
        <Adminnavbar />
        <Navbar />
        <div className="flex justify-center h-full items-center">
          <h1 className="text-5xl font-light text-dark font-custom text-center">
            History
          </h1>
        </div>
      </div>
    );
  }
  
  export default History;
  