const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const movieSchema = new mongoose.Schema({
    movie_name : {type : String},
    movie_genre: {type : String},
    production_year: {type : Number}

}, {
    versionKey: false,
    timestamps: true
})

const User = mongoose.model("user",movieSchema);


app.post('/users',async (req,res) => {
   const user  = await User.create(req.body)
   res.status(201).send(user);
})


app.get('/users',async (req,res) => {
    try{
    const users = await User.find({$and : [ {production_year: 2000},{movie_name: "3 ediot"}]}).lean().exec();
    res.status(201).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

app.get('/users/:id',async (req,res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        res.status(201).send(user);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

app.patch('/users/:id',async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new : true
        });
        res.status(201).send(user);
    }
    catch(e){
        res.status(500).send(e.message());
    }
})

app.delete('/users/:id',async(req,res) => {
    try { 
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);
    }
    catch(e){
       res.status(500).send(e.message());
    }
})

app.post('/',(req,res) => {
  newUsers = [...users,req.body]

    console.log(newUsers);
    res.send(newUsers)
})

app.patch('/:email',(req,res) => {
  const  newUser = users.map((user) => {
        if ( req.params.email === user.email){
           if ( req?.body?.first_name) user.first_name = req.body.first_name;
           if ( req?.body?.last_name)  user.last_name = req.body.last_name;
           if ( req?.body?.email)  user.email = req.body.email;
           if ( req?.body?.gender)  user.gender = req.body.gender;
        }
        return user;
    })
    res.send(newUser);
})

app.delete('/:email',(req,res) => {
   newUsers = users.filter((user) => user.email !== req.params.email);
   res.send(newUsers);
})

app.get('/',(req,res) => {
    res.send(users);
})


app.listen(2345, async () => {
 await connect();
 console.log('server is listeing');
});
