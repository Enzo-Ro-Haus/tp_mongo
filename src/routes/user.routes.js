const express = require("express");
const router = express.Router();
const User = require("../models/user.model"); //Aca va el nombre del modelo

//mw
const getUser = async (req, res, next) =>{
    let user;
    const { id } = req.params;

    if(id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({message: "Invalid user id"})
    }

    try{
        user = await user.findById(id);
        if(!user) res.status(404).json({message: "User not found"})
    }catch (error){
        res.status(500).json({message: error.message})
    }

    res.user = user;
    next();
}


//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(204).json([]);
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create user [POST]
router.post("/", async (req, res) => {
  const { name, age, email } = req?.body;
  if (!name || !age || !email)
    return res
      .status(400)
      .json({ message: "Missing required field on User (name, age email)" });

  const user = new User({
    name,
    age,
    email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ messaje: error.message });
  }
});

module.exports = router;