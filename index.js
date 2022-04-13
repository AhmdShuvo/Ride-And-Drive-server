const { MongoClient, Admin } = require("mongodb");
const Objectid=require('mongodb').ObjectId;
const express=require('express');
const cors=require('cors');
require("dotenv").config();


const app=(express())





const port =process.env.PORT || 9000;


app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      console.log("Connected");
      const database = client.db('RideAndDrive');
      const servicesCollection = database.collection('Cars');
      const purchaseCollection = database.collection('purchases');
      const UsersCollection = database.collection('users');
      const ratingsCollection = database.collection('ratngs');


          

     
      // GEt All Cars ///
                
         app.get('/cars',async(req,res)=>{
            const cursor=servicesCollection.find({});

            const result=await cursor.toArray()

        res.json(result)
      })


      app.get("/order/:email",async(req,res)=>{
        const userEmail=req.params.email;
        console.log(userEmail);
        const query = {email: userEmail};
        
        const cursor= purchaseCollection.find(query);
        const result=await cursor.toArray()
        res.json(result);
     })
      // get all Orders //

      app.get("/orders",async (req,res)=>{

        const cursor= purchaseCollection.find({});
        const result =await cursor.toArray()
        res.json(result)
      })
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


 
  app.get('/',async(req,res)=>{
           
   res.send("server Running")
         

  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })