const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')



const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
const Todo = require("./models/todoModel")

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://devops:devops@tododb.jduqj.mongodb.net/?retryWrites=true&w=majority&appName=TodoDB"
)
        console.log("mongoDB connected")
    } catch(error){
        console.error("MongoDB connection failed",error)
    }
}

app.get("/get-todo", async(req, res)=>{
    console.log("fetching this todos from DB")
    try {
        const todos = await Todo.find();
        console.log("fetched all todos",todos)
        res.status(200).json(todos)
    } catch (error) {
        console.log("Error while fetching the todos", error)
        res.status(500).json({message: "something went wrong please try letter "})
    }
})


app.post("/add-todo", async (req, res)=>{
    const title = req.body;
    // console.log("Adding a new todo", req.body)
    console.log("Adding a new todo", title.todo)
    const newTodo = new Todo({
        title: title.todo
    })
    console.log("Adding the todo to DB new todo", newTodo)
    const savedTodo = await newTodo.save()
    console.log("Added the todo to DB", newTodo)


    res.status(200).json(savedTodo)
})
connectDB()

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})