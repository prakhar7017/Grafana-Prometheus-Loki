const express=require('express');
const app=express();
const PORT=process.env.PORT || 8000;
const {HeavyTask}=require("./utils")   
const client=require("prom-client");
const responseTime=require("response-time");
const {createLogger,format,transports}=require("winston");
const LokiTransport=require("winston-loki");

const options={
    transports:[
        new LokiTransport({
            labels:{
                appName:"nodejs-prometheus"
            },
             host:'http://127.0.0.1:3100' })
    ]
}
const logger=createLogger(options);

const collectDefaultMetrics=client.collectDefaultMetrics;

collectDefaultMetrics({register:client.register})


const timeTOResponse=new client.Histogram({
    name:"time_taken_for_response",
    help:"this tells how much time is taken by req and res",
    labelNames:["method",'route',"status_code"],
    buckets:[1,50,100,200,300,400,500,1000,2000,3000,5000]
})

const totalRequest=new client.Counter({
    name:"total_request",
    help:"this tells how many request are made",
})

app.use(responseTime((req,res,time)=>{
    totalRequest.inc();
        timeTOResponse.labels({method:req.method,route:req.url,status_code:res.statusCode})
        .observe(time);
    }
))

app.get("/",(req,res)=>{
    logger.info("Request is made to /");
    res.status(200).json({success:true,message:"server is up and running"});
})

app.get("/heavytask",async(req,res)=>{
    logger.info("Request is made to /heavytask");
    try {
        const timetaken=await HeavyTask();
        return res.status(200).json({success:true,message:`Heavy task completed in ${timetaken}`});
    } catch (error) {
        logger.error(error);
        return res.status(500).json({success:false,message:"Internal went wrong"});
    }
})

//route for sending matrics to prometheus Server running in docker container   
app.get("/metrics",async (req,res)=>{
    res.setHeader('Content-Type',client.register.contentType);
    const metrics=await client.register.metrics();
    res.send(metrics);
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
