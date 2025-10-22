const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req , res)=>{
    res.send("This is home page")
})

const menuItemRoutes = require('./routes/menuItemRoutes')
const personRoutes = require('./routes/personRoutes')

app.use('/menu', menuItemRoutes);
app.use('/person', personRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
})

