const express=require('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

const employeeRouter=require('./routes/employeeroutes');
app.use(express.json());
app.use('/',employeeRouter);

app.listen(PORT,()=>{
console.log(`Server is running on http://localhost:${PORT}`);
})
