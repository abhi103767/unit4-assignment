const express = require('express');
const Post = require('../models/post.model')
const router = express.Router();


router.post('',async (req,res) => {
    try { 
        const post = await Post.create(req.body);
        return res.status(201).send(post);
    } catch(e){
        return res.status(500).send(e.message);
    }
})

router.get('', async (req,res) => {
    try{ 
        const posts = await Post.find().lean().exec();
        res.send(posts);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).lean().exec();
        res.send(post);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.patch('/:id', async (req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body, {
       new : true
        })
        .populate(user_id)
        .lean()
        .exec();
       
      res.send(post);
    }catch(e){
        res.status(500).send(e.message);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
        res.send(post);
    }
    catch(e){
        res.status(500).send(post);
    }
})
module.exports = router;