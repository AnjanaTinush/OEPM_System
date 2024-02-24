import React, { useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="sweet-loading">
        <PropagateLoader
          color='black'
          loading={loading}
          cssOverride=''
          aria-label="Loading Spinner"
          data-testid="loader"
          size={15} // You can adjust the size here
        />
      </div>
    </div>
  );
}

export default Loader;
