import React, {useState} from "react";

const AddTodo = () => {
    const [todo, setTodo] = useState('this is a new state')
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        console.log(todo)
        try {
            const response = await fetch('http://localhost:3001/add-todo',{
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({todo})
        })

        console.log("Response received", response)

        } catch (err) {
            console.log("Error occurred while adding todo", err)
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todo} 
                onChange={(e)=> setTodo(e.target.value)}
            />
            <button type="submit">AddTodo</button>
        </form>
    )
}

export default AddTodo