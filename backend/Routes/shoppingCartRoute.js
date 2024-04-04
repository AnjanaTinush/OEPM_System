const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shopingcartModel"); 


router.post("/addToCart", async (req, res) => {
  try {
    const { name, _id, price, userid, quantity, imageurl } = req.body;

    // Validate request payload here if needed

    const newCart = new shoppingCart({
      itemName: name,
      itemid: _id,
      userid,
      quantity: quantity,
      price: price,
      totalprice: price * quantity,
      imageurl: imageurl
    });

    const cart = await newCart.save();

    res.status(201).json({ message: "Item added to cart successfully.", cart: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all items in the shopping cart
router.get("/getitem", async (req, res) => {
  try {
    const items = await shoppingCart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Remove an item from the shopping cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await shoppingCart.findByIdAndDelete(id);

    res.status(200).json({ message: "Item removed from cart successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update cart
router.route('/updatecart/:id').put(async(req,res)=>{

    const cartid = req.params.id;
    const{quantity,totalprice} = req.body;

    const updatecart={
      quantity,
      totalprice,
       
    };

    try {
        await shoppingCart.findByIdAndUpdate(cartid,updatecart);
        return res.status(200).json({status : "cart updated"});
    } catch (error) {

        return res.status(400).json({status : "Error with update cart",massage : error})
        
    }
})








module.exports = router;
