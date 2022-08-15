const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});


app.listen(5000,()=>{
    console.log("app is listening from port 5000", )
})