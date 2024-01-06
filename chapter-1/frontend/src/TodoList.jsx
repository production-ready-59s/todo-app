import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ServerHost = "http://localhost:4000";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${ServerHost}/api/todos`);
      setTodos(response.data.map((todo) => {
        return {
          ...todo,
          isEditing: false,
        }
      }));
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const createTodo = (event) => {
    event.preventDefault();

    // send POST call to backend
    axios
      .post(`${ServerHost}/api/todos`, {name: newTodoName, completed: false})
      .then((response) => {
        if (response.data && response.status === 200) {
          setTodos((oldTodos) => [...oldTodos, {...response.data, isEditing: false}]);
        }
        setNewTodoName("")
      })
      .catch((error) => console.log(error));
  };

  const handleTodoCompletedChange = (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);

    // send a PUT call to backend
    axios.put(`${ServerHost}/api/todos/${id}`, {completed: !currentTodo.completed})
      .then((response) => {
        if (response.data && response.status === 200) {
          setTodos((oldTodos) => {
            const updatedTodos = [...oldTodos];
            const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
            updatedTodos[todoIndex] = response.data;
            return updatedTodos;
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const handleTodoNameChange = (id, newName) => {
    // send a PUT call to backend
    axios.put(`${ServerHost}/api/todos/${id}`, {name: newName})
      .then((response) => {
        if (response.data && response.status === 200) {
          setTodos((oldTodos) => {
            const updatedTodos = [...oldTodos];
            const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
            updatedTodos[todoIndex] = response.data;
            return updatedTodos;
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const handleTodoDelete = (id) => {
    // send DELETE call to backend
    axios.delete(`${ServerHost}/api/todos/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // If successful, remove from state
          setTodos((oldTodos) => oldTodos.filter((todo) => todo._id !== id));
        }
      })
      .catch((error) => console.log(error));
  }

  const toggleEditing = (id) => {
    const currentIsEditing = todos.find((todo) => todo._id === id)?.isEditing;
    setTodos((oldTodos) => {
      const updatedTodos = [...oldTodos];
      const todoIndex = updatedTodos.findIndex((todo) => todo._id === id);
      updatedTodos[todoIndex].isEditing = !currentIsEditing;
      return updatedTodos;
    });
  }

  return (
    <div style={{padding: 30}}>

      <h1>Todo List</h1>

      <form onSubmit={createTodo} style={{gap: 10, display: "flex"}}>
        <input
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          type="text"
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul style={{paddingLeft: 5, width: 300}}>
        {todos.map((todo, index) => (
          <div key={index} style={{"paddingBottom": 10, display: "flex"}}>
            <input
              type="checkbox"
              style={{marginRight: 10}}
              checked={todo.completed}
              onChange={() => handleTodoCompletedChange(todo._id)}
            />
            {todo.isEditing ? (
              <form
                style={{flexGrow: 1}}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTodoNameChange(todo._id, e.target.todoName.value);
                }}>
                <input
                  type="text"
                  name="todoName"
                  defaultValue={todo.name}
                />
              </form>
            ) : (
              <span onClick={() => toggleEditing(todo._id)}
                    style={{flexGrow: 1}}
              >
                {todo.name}
              </span>
            )}
            <div onClick={() => handleTodoDelete(todo._id)}>
              <img src="/trash.svg" style={{width: 20, height: 20}}/>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;