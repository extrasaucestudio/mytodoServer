const express = require('express');

const app = express();
const PORT = 8080;

//test route
app.get('/', (req, res)=>{
    res.send({
        message: "I am Unloccode and this is a TEST!"
    });
});

//fire up the server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});

//init the database