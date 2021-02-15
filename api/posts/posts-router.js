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

router.get("/posts/:id",(req, res)=>{
    posts.findById(req.params.id)
    .then ((posts)=>{
        if (posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({message:"The post with the specified ID does not exist"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"The posts information could not be retrieved"})
    })
})
router.post("/posts", (req, res)=>{
    if (!req.body.title || !req.body.contents){
        res.status(400).json({message:"Please provide title and contents for the post"})}
    posts.insert(req.body)
        .then(({id})=>{ 
            console.log(id)
            posts.findById(id)
                .then((newPost)=>{
                    console.log(newPost)
                res.status(201).json(newPost)
                
        }) 
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({message:"There was an error while saving the post to the database."})
            })

        }
    
)
router.put("/posts/:id", (req, res)=>{
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({message:"Please provide title and contents for the post"})
    }
    posts.update(req.params.id, req.body)
        .then((usersPost)=>{
            if (usersPost){
                posts.findById(req.params.id).then((updatedPost)=>{
                    res.status(200).json(updatedPost)})
            }else{
                res.status(404).json({message:"The post with the specified id does not exist"})
            }
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({message:"The posts information could not be modified"})
        })
})
router.delete("/posts/:id", (req, res)=>{
    posts.remove(req.params.id)
    .then((count)=>{
        if (count >0){
            res.status(200).json({message:'Post removed'})
        }else{
            res.status(404).json({message:"The post with teh specified id does not exist"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"The post could not be removed"})
    })
})
router.get("/posts/:id/comments",(req, res)=>{
    posts.findPostComments(req.params.id)
    .then ((comments)=>{
        if (comments){
            res.status(200).json(comments)
        }else{
            res.status(404).json({message:"The post with the specified ID does not exist"})
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:"The posts information could not be retrieved"})
    })
})
module.exports=router 
