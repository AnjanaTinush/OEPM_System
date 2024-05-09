import React, { useState } from 'react';
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {

  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'300px',marginBottom:"210px"}}>
           <center><div className="sweet-loading">

                <SyncLoader
                    color='#48c81b'
                    loading={loading}
                    cssOverride=''
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div></center>
        </div>

  );
}

export default Loader;
