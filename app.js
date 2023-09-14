const express=require('express');
const app=express();
const PORT=process.env.PORT || 8000;
const {HeavyTask}=require("./utils")   


app.get("/",(req,res)=>{
    res.status(200).json({success:true,message:"server is up and running"});
})

app.get("/heavytask",async(req,res)=>{
    try {
        const timetaken=await HeavyTask();
        return res.status(200).json({success:true,message:`Heavy task completed in ${timetaken}`});
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal went wrong"});
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
