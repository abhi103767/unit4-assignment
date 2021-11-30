const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/library');
}

const sectionSchema = new mongoose.Schema({
  book_ids : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'book',
      required: false,


  }],
},
{
    versionKey : false,
    timestamps : true,
}
)


const Section = mongoose.model('section',sectionSchema);

// Crud operator for Sections

app.post('/sections', async (req,res) => {
    try {
   const section =  await Section.create(req.body);
   res.send(section);
    }
    catch(e){
        res.status(500).send(section);
    }

})

app.get('/sections', async (req,res) => {
    try {
        const section = await Section.find().lean().exec();
        res.send(section);
    }
    catch(e){
        res.send(e.message);
    }
})

app.get('/sections/:id', async (req,res) => {
    try {
        const section = await Section.findById(req.params.id)
        .lean().exec()
        res.send(section);
    }
    catch(e){
        res.status(500).send(e.message);
        }
})






// Book Schema 

const bookSchema = new mongoose.Schema({
    name : {type: String, required: true},
    body : {type: String, required: true},
    author_ids : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'author',
        required: true,

    },],
    section_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'section',
        required: true,
    }

},
{
    versionKey : false,
    timestamps: true
})

const Book = mongoose.model('book',bookSchema);


// crud operations

app.post('/books', async (req,res) => {
    try{
    const book = Book.create(req.body);
    res.send(book);
    
    }
    catch(e){
        res.status(500).send(e.message);
    }

    
})

app.get('/books', async (req,res) => {
    try {
        const book = Book.find().lean().exec();
        res.send(book);
    }
    catch(e){
        res.send(e.message);
    }
})


// author Schema 

const authorSchema = new mongoose.Schema({
    firstName : { type: String, required : true},
    lastName : { type : String , required : true}
},
{
    versionKey: false,
    timestamps: true
})

const Author = mongoose.model('author',authorSchema);


// CRUD Operation

app.post('/authors', async (req,res) => { 
    try {
    const author = await Author.create(req.body);
    res.send(author);
    }
    catch(e){
        res.send(e.message);
    }
})

app.get('/author', async (req,res) => {
    const authors = await Author.find().lean().exec();
    res.send(authors);
})

app.get('/author/:id', async (req,res) => {
    const author = await Author.findById(req.params.id).lean().exec();
    res.send(author);
});



app.listen('3456', async (req,res) => {
    await connect()
    console.log('we are listening 3456 port');
})