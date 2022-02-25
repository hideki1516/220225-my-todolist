import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export const App = () => {
    const [todoText, setTodoText] = useState('');
    const [incompleteToDos, setIncompleteToDos] = useState([]);
    
    const onChangeTodoText = (e) => {
        e.preventDefault();
        setTodoText(e.target.value);
    };

    const onClickAddTodo = () => {
        const newToDos = [...incompleteToDos, todoText];
        setIncompleteToDos(newToDos);
        setTodoText('');
    };

    const onClickDeleteToDo = (index) => {
        const newToDos = [...incompleteToDos];
        newToDos.splice(index, 1);
        setIncompleteToDos(newToDos);
    };

    return (
        <>
            <h1>TODOリスト</h1>
            <input 
                placeholder='TODOを入力'
                value={todoText}
                onChange={onChangeTodoText}
            />
            <button onClick={() => onClickAddTodo()}>追加</button>
            <ul>
                {incompleteToDos.map((todos, index) => (
                    <li key={index}>
                        <span>{todos}</span>
                        <button onClick={() => onClickDeleteToDo(index)}>削除</button>
                    </li>
                ))}
            </ul>
        </>
    );
};