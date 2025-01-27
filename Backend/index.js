require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const {connectDB} = require("./database/db");
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cookieParser());

// api
app.use("/bloggie/user", userRouter.router);
app.use("/bloggie/blogs", blogRouter.router);


app.listen(port, ()=>{
   connectDB().catch((err)=>console.log(err));
   console.log(`Server Started at Port - ${port}`);
});