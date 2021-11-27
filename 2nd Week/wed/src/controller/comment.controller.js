const express = require('express');
const Comment = require('../models/comment.model');
const router = express.Router();

router.post("/", async (req,res) => {
    try {
     const comment = await Comment.create(req.body);
    res.status(200).send(comment);
    } catch(e){
      res.status(500).send(e.message);
     }
});

router.get("/", async (req,res) => {
    try {
        const comments  = await Comment.find().lean().exec();
        res.status(201).send(comments);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user_id' ).populate('post_id')
        .lean().exec()
        res.status(200).send(comment)
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        })
        .lean().exec()
        res.status(200).send(comment)

    }
    catch(e){
        res.status(500).send(comment);
    }
})
module.exports = router;