import React from 'react'
import Adminnavbar from "./Component/Adminnavbar";

function Tunneldashboard() {
  return (
    <div className="bg-wight-green">
      <div className="flex">
      <Adminnavbar />
      <div className="flex flex-col w-full" style={{ zIndex: 900 }}>
        hellooo
      </div>
      </div>

    </div>
  )
}

export default Tunneldashboard