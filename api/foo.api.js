const express = require("express")
const router = express.Router()

let {foos} = require("../data/foos.json")

// create
router.post("/",(res,req) =>{
    const foo= {}
    for (const param of admissableFooParams) {
        if(req.body[param]) foo[param] = req.body[param];
    }
    
    foo.fullName = req.body.firstName + " " + req.body.lastName
    foos.push(foo)
    res.status(201).send(foo)
})
// read
const filterableFooParams =[]
router.get("/",(res,req)=>{
    try {
        
        res.status(200).send(foos)
    } catch (error) {
        res.status(404).send('Oops! 404 Error: Not Found')
    }
})
// update
const admissableFooParams = []
router.patch("/:id",(req,res)=>{
    try {
        const idx=foos.findIndex(f=> f.id === parseInt(req.params.id))
        const foo=foos[idx]

        for (const param of admissableFooParams ) {
            if (req.body[param]) foo[param]=req.body[param]
        }
        foo.fullName = req.body.firstName + " " + req.body.lastName
    
    res.status(201).send(foo)
    } catch (error) {
        res.status(404).send('Oops! 404 Error: Not Found')
    }
})

// delete
router.delete("/:id", (req,res)=>{
    foos=foos.filter(f=>f.id === parseInt(req.params.id))
  res.send(foos) 
})

module.exports=router