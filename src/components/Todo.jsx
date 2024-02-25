import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            const newTodo = { id: Date.now() + uuid(), text: inputValue, status: 'pending', created: Date.now() };
            setTodos([...todos, newTodo]);
            localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
            setInputValue("");
        }
    }
    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleTodoStatus = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, status: todo.status === "pending" ? "completed" : "pending" };
            }
            return todo;
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    useEffect(() => {
        var todos = localStorage.getItem('todos')
        if (todos) {
            setTodos(JSON.parse(todos))
        }
    }, [])


    return (
        <div className="center-container">
            <div className='main-container'>
                <div className="pending-todos">
                    <h2>Pending</h2>
                    <ul className="todo-list">
                        {todos.length > 0 ? (
                            todos.some(todo => todo.status === "pending") ? (
                                todos.filter(todo => todo.status === "pending").map(todo => (
                                    <li key={todo.id} className="todo-item" style={{ textDecoration: todo.status === "completed" ? "line-through" : "none" }}>
                                        {todo.text}
                                        <div className="button-container">
                                            {todo.status === "pending" ? (
                                                <>
                                                    <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                                    <button className="done" onClick={() => handleTodoStatus(todo.id)}>Done</button>
                                                </>
                                            ) : null}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="todo-item">
                                    Keep up the Good Work!
                                </li>
                            )
                        ) : (
                            <li className="todo-item">
                                Keep up the Good Work!
                            </li>
                        )}

                    </ul>
                </div>
                <div className="completed-todos">
                    <h2>Completed</h2>
                    <ul className="todo-list">
                        {todos.filter(todo => todo.status === "completed").length > 0 ? (
                            todos.filter(todo => todo.status === "completed").map(todo => (
                                <li key={todo.id} className="todo-item" style={{ textDecoration: "line-through" }}>
                                    {todo.text}
                                    <div className="button-container">
                                        <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                        <button className="done" onClick={() => handleTodoStatus(todo.id)}>Pending</button>
                                    </div>
                                </li>
                            ))
                        ) : <></>}
                    </ul>
                </div>
            </div>
            <div className="todo-container gradient-bg">
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter your todo..."
                    />
                    <button onClick={handleAddTodo}>Add</button>
                </div>
            </div>

        </div>
    )
}

export default Todo