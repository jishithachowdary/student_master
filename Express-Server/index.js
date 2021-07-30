const express=require("express");
const app=express();
const port=process.env.PORT || 5000;
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
const dburl = "mongodb+srv://guvi:jishitha@cluster.jnc7z.mongodb.net/guvi?retryWrites=true&w=majority";

app.use(express.json());

//add new mentor
app.post("/addmentor",async (req,res)=>{
    let client=await mongoClient.connect(dburl)
    try{
        let db=client.db("guvi");
        const data=await db.collection("mentor").insertOne(req.body);
        res.json({message:"record create"})
    }catch(error){
        console.log(error);
        res.json({message:"something went wrong"})
    }
})

//add student

app.post("/addstudent",async (req,res)=>{
    let client=await mongoClient.connect(dburl)
    try{
        let db=client.db("guvi");
        const data=await db.collection("student").insertOne(req.body);
        res.json({message:"record create"})
    }catch(error){
        console.log(error);
        res.json({message:"something went wrong"})
    }
})

//get all mentors

app.get("/mentors",async (req,res)=>{
    let client=await mongoClient.connect(dburl)
    try{
        let db=client.db("guvi");
        const data=await db.collection("mentor").find().toArray();
        res.json({message:"record fetched",data})
    }catch(error){
        console.log(error);
        res.json({message:"something went wrong"})
    }
})

//get all students

app.get("/students",async (req,res)=>{
    let client=await mongoClient.connect(dburl)
    try{
        let db=client.db("guvi");
        const data=await db.collection("student").find().toArray();
        res.json({message:"record fetched",data})
    }catch(error){
        console.log(error);
        res.json({message:"something went wrong"})
    }
})

//assign a mentor to student or mentor name of particular student can be changed
app.put("/assignmentor",async(req,res)=>{
    try{
        let client=await mongoClient.connect(dburl);
        let db=client.db("guvi");
        await db.collection("student")
                .updateOne({name:req.body.name},
                    {$set:{mentor:req.body.mentor}});
        let data=await db.collection("student").find().toArray();
        res.json({message:"mentor assigned",data})
                    
    }catch(error){
        console.log(error);
        res.json({message:"something went wrong"})
    }
})

//students under particular mentor
app.get("/studentmentor/:mentor",async (req,res)=>{
    try {
        let client = await mongoClient.connect(dburl);
        let db = client.db("guvi");
        let data = await db
            .collection("student")
            .find({ mentor: req.params.mentor }).toArray();
        res.json({message: `students under mentor_name: ${req.params.mentor}`,data });
    } catch (error) {
        console.log(error);
        res.json({message:"something went wrong"})
    }
})


app.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
})