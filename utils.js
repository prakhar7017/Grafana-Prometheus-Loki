function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

exports.HeavyTask =()=>{
    const ms=getRandomValue([100,150,200,300,600,500,1000,1400,2500]);
    const ThorowError=getRandomValue([1,2,3,4,5,6,7,8,])===8;
    if(ThorowError){
        const randomError=getRandomValue([
            "DB Payment Error",
            "DB Connection Error",
            "Access Denied",
            "Not Found",    
        ])
        throw new Error(randomError);
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(ThorowError){
                return reject("Error occured");
            }
            return resolve(ms);
        },ms)
    })
}