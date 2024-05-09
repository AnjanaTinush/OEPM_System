import React from "react";

function Error({ message }) {
  return (
    <div>
      <div role='alert'> 
         {message}
      </div>
    </div>
  );
}

export default Error;
