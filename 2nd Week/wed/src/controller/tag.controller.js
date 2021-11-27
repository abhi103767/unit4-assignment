const express = require('express');
const   Tag = require('../models/tag.model');
const router = express.Router();

router.post('', async (req,res) => {
    try{
    const tag = await Tag.create(req.body);
    res.status(200).send(tag);
    }
    catch(e){
     res.status(500).send(e.message);
    }
});
 
router.get('', async (req,res) => {
    try {
        const tags = await Tag.find().lean().exec();
        res.status(200).send(tags);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.id).lean().exec();
        res.status(200).send(tag);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.patch('/:id', async (req,res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        });
        res.status(200).send(tag);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
       res.send(tag);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

router.get(':id/posts', async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.id).lean().exec();
        console.log(tag);
        const post = await Tag.find({tag_ids : tag._id})
        .populate(tag_ids).lean().exec();
        return res.status(200).send(post);
    }
    catch(e){
        res.send(e.message);
    }
})
module.exports = router;