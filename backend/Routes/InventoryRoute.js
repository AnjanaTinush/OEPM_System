const express = require("express")
const router = express.Router();
const Items = require('../models/itemsModel');

//add items


router.post("/additems" , async(req,res)=>{

    const newitem = new Items({
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        imageurl : req.body.imageurl,

    })

    
    try {
        const item = await newitem.save();
        res.send("Item added Successfully!");

    } catch (error) {
        return res.status(400).json({error});
    }
})

router.get("/search", async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const inventory = await InventoryItem.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//read
router.get("/getallitems", async(req, res) => {

    try {
      const items = await Items.find()
      return res.json(items);
    
    } catch (error) {
      return res.status(400).json({ error });
    }
    
    });
    
//getitem
router.route('/getitem/:id').post(async(req,res) => {

  const itemid = req.params.id;

  try {
    const item = await Items.findById(itemid);
    return res.status(200).json({status : "item is fatched",item});
  } catch (error) {
    return res.status(400).json({status : "Error with fatch item", message : error});
  }
})



//update user
router.route('/updateitem/:id').put(async(req,res)=>{

  const itemid = req.params.id;
  const{name,price,quantity,imageurl} = req.body;

  const updateitem={
      name,
      price,
      quantity,
      imageurl
  };

  try {
      await Items.findByIdAndUpdate(itemid,updateitem);
      return res.status(200).json({status : "Item updated"});
  } catch (error) {

      return res.status(400).json({status : "Error with update item",massage : error})
      
  }
})



    //delete
    router.route('/delete/:id').delete(async(req, res)=>{
    
      const id = req.params.id;
    
      try {
        await Items.findByIdAndDelete(id);
        return res.status(200).json({status: "Items deleted"});
      } catch (error) {
        return res.status(400).json({status:"Error with delete items", message: error})
      }
    
    });


module.exports=router;