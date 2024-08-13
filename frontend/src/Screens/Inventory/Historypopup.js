import React, { useState } from "react";
import axios from "axios";

function ProductForm() {
    const [actionType, setActionType] = useState("");
    const [changedItem, setChangedItem] = useState("");

    const handleSubmit = async () => {
        try {
            console.log("Submitting form with actionType:", actionType, "and changedItem:", changedItem);
            const response = await axios.post("/api/inventory/addhistory", { actionType, changedItem });
            console.log("Response from backend:", response.data);
            // Your logic to submit original form goes here
        } catch (error) {
            console.error("Error logging history:", error);
        }
    };
    

    return (
        <div>
            {/* Modal or popup component to capture action type and changed item */}
            {/* Input fields for action type and changed item */}
            <input
                type="text"
                placeholder="Action Type"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Changed Item"
                value={changedItem}
                onChange={(e) => setChangedItem(e.target.value)}
            />
            {/* Button to confirm and submit */}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ProductForm;
