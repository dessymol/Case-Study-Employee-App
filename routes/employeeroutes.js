const express=require('express')
const router=express.Router();
const employeeroutes=require('../Models/employee')



router.get('/',async(req,res)=>{
    try{
        const users=await employeeroutes.find();
        res.json(users)
    }catch(error){
        res.status(500).json({message:"Error fetching Employee",error});
    }
});

router.post('/add',async(req,res)=>{
    try{
        const newUser=new employeeroutes(req.body);
        await newUser.save();
        res.status(201).json({message:"Employee created successfully",newUser});
    }catch(error){
        res.status(500).json({message:"Error creating Employee",newUser});
    }
});


router.put('/update/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedUser=await employeeroutes.findByIdAndUpdate(id,req.body,{new:true});
        res.json({message:"User updated successfully",updatedUser});
    } catch (error) {
        res.status(500).json({message:"Error updating user",error});
    }       
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await employeeroutes.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Invalid ID or server error", error});
    }
});

router.delete('/delete/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        await employeeroutes.findByIdAndDelete(id);
        res.json({message:"Employee deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Error deleting Employee",error})
    }
});
module.exports=router;