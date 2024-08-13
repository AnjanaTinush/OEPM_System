const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    
    
    
    timestamp: { 
        type: Date, 
        default: Date.now 
    },

    actionType: String,
    
    changedItem: Object // Or define a specific schema for the item
});

const History = mongoose.model('History', historySchema);

module.exports = History;
