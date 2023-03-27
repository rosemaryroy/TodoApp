import React from 'react';
import "./Todo.css";
import { useState, useRef, useEffect } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {

  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [editId,seteditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addTodo = () => {
   if(input !== ''){
    setTodos([...todos, { list: input, id: Date.now(), status: false }])
    console.log(todos);
    setInput('');
   }
   if(editId){
    const editTodo = todos.find((todo)=>todo.id==editId)
    const updateTodo = todos.map((to)=>to.id===editTodo.id
    ? (to = {id : to.id, list : input})
    
     : (to = {id : to.id, list : to.list})

    )
    setTodos(updateTodo)
    seteditId(0);
    setInput('')
   }
  }

  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus();
  })

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id))
  }

  const onComplete = (id) => {
   let complete = todos.map((to) => {
      if (to.id === id) {
        return ({ ...to, status: !to.status })
      }
        return to
    }

    )
    setTodos(complete)
  }

  const onEdit = (id)=>{
   const editTodo = todos.find((to)=>to.id === id)
  //  console.log('edit'+editTodo.list);
   setInput(editTodo.list)
   seteditId(editTodo.id)
  //  console.log(editTodo);
  }

  return (
    <div className='container'>
      <h1>TODO APP</h1>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" value={input} ref={inputRef} placeholder='Type your todos' className='form-control' onChange={(event) => setInput(event.target.value)} />
        <button onClick={addTodo} > {editId ? 'EDIT' : 'ADD'} </button>
      </form>
      <div className='list'>
        <ul>
          {todos.map((todo) => (
              <li className='listitem'>
                <div className='lists' id={todo.status ? 'list-item' : ''}> {todo.list} </div>
                <span>
                  <IoMdDoneAll className='icons' id='done' title='complete'
                    onClick={() => onComplete(todo.id)}
                  />
                  <AiFillDelete className='icons' id='delete' title='delete'
                    onClick={() => onDelete(todo.id)}
                  />
                  <FaEdit className='icons' id='edit' title='edit' 
                  onClick={()=>onEdit(todo.id)} />
                </span>


              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todo