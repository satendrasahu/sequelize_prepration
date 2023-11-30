const  express = require( "express")
const mainRouter = require("./src/routers/mainRoutes")
const userRouter = require("./src/routers/userRoutes")
const customersRouter = require("./src/routers/customersRoutes")
require("./src/database/connection")
const app = express()
 
app.use(express.json())
app.use("/api/main",mainRouter)
app.use("/api/user",userRouter) 
app.use("/api/customers",customersRouter)
app.listen(8000,()=>console.log("server is running"))