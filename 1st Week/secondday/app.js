const express = require('express');
const app = express();
const users = require('./mockdata');
app.use(express.json());
// app.get('/',(req,res) => {
//     users.forEach((user) =>{
//     console.log(user.email);

//     });
// })
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

app.get('/:email',(req,res) => {
newUsers = users.filter((user) => {
    return user.email == req.params.email;
    })
    console.log(newUsers);
    res.send(newUsers);
})


app.listen(2345, () => {
 console.log('server is listeing');
});
