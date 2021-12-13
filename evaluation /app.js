const express = require('express');
const app = express();
const mongoose = require('mongoose');
const  connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/all');
}

 app.use(express.json());

// Schema for Company
const companySchema = new mongoose.Schema({
    name : {type : String , required: true},
    net_worth : {type : Number, required : true},
    job_ids : [
        {type: mongoose.Schema.Types.ObjectId,
        ref  : "job",
        required: true},
    ],
},
{
    versionKey: false,
    timestamps: true
})

const Company = mongoose.model('company',companySchema);

// Crud Company
app.post('/companies',async (req,res) => {
    const company =  await Company.create(req.body);
    res.send(company);
});
// 
app.get('/companies/:id' , async (req, res) => {
    try {
    const company = await Company.findById(req.params.id).lean().exec();
    res.send(company);
    }
    catch(e){
        res.status(500).send(company);
    }
})

// Schema for Job

const jobSchema = new mongoose.Schema({
    skill : {type: String, required : true},
    work_from_home : {type : Boolean, required: true},
    rating: {type : Number, required : true},
    open_jobs: {type : Boolean, required : true },
    notice_period_2_months: { type: Boolean, required : true},
    city : [{type : String, required : true}],
},{
    versionKey: false,
    timestamps: true,
})



const Job = mongoose.model('job',jobSchema);

// crud for job

app.post('/jobs',async (req,res) => {
    try {
    const job = await Job.create(req.body);
    res.send(job);
    }
    catch(e){
        res.send(e.message);
    }
})
// work form home
app.get('/jobs/work_from_home', async (req,res) => {
    try {
    const jobs = await Job.find({work_from_home: true}).lean().exec();
    res.send(jobs);
    }
    catch(e){
        res.status(500).send(company);
    }
})


// sorting on the basis of rating
app.get('/jobs/rating', async ( req, res) => {
    try {
    const jobs = await Job.find().sort({ rating : -1}).lean().exec();
    res.send(jobs);
    }
    catch(e){
        res.status(500).send(company);
    }
});



// 2 month notice period
app.get('/jobs/notice_period', async (req, res) => {
    try {
    const jobs = await Job.find({notice_period_2_months: true}).lean().exec();
    res.send(jobs);
    }
    catch(e){
        res.status(500).send(company);
    }
})

app.get('/jobs/:city/:skill', async (req, res) => {
    try {
    console.log(req.params.city,req.params.skill);
    const jobs = await Job.find({$and : [{ city  : req.params.city},{skill : req.params.skill}]})
    .lean().exec();
    res.send(jobs);
    }
    catch(e){
        res.send(e.message);
    }
})




app.listen('1234', async() => {
    await connect();
    console.log("We are listening on 1234");
})

