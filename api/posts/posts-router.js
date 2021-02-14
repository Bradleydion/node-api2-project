// implement your posts router here
const express= require("express")
const posts =require("./posts-model")
const router = express.Router()

router.get("/",(req,res)=>{
    res.json({message:"Hello Friends!!"})
})

router.get("/posts", (req,res)=>{
    posts.find()
    .then((posts)=>{
        res.status(200).json(posts)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"The posts information could not be retrieved"})
    })
})

router.get("/posts/:id",(res, req)=>{
    posts.findById(req.params.id)
    .then ((posts)=>{
        if (posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({message:"The post with the specified id does not exist"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"The posts information could not be retrieved"})
    })
})
    


module.exports=router 
