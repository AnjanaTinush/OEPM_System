import React from "react";

function Navbar() {
  return (
    <div className="bg-wight-green">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
        <div className="flex items-center ml-32">
          <p className="text-green-900 text-3xl font-bold text-custom text-shadow-lg">
            <span className="italic">Welcome to the Admin Dashboard!</span>
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
