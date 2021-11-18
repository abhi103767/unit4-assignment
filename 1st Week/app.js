const express = require('express');
const app = express();

app.get('/',(req,res) => {
    console.log("home Page");
})


app.listen(1234,() => {
    console.log('Listening on port 1234');
});
console.log('avinash sharma is thething around')