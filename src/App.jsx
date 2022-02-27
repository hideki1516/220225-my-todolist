import React, { useState, useEffect } from 'react';
import "./style.css";

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    // 追加機能
    const onChangeTodoText = (e) => {
        setTodoText(e.target.value);
    }

    const handleAddFormSubmit = (e) => {
        e.preventDefault();

        if (todoText !== '') {
            const newTodos = [...todos, todoText];
            setTodos(newTodos);
        }

        setTodoText('');
    };

    // 削除機能
    const onClickDelete = (index) => {
        const newTodos = [...todos].filter((todo, todoIndex) => {
            return todoIndex !== index;
        });
        setTodos(newTodos);
    };

    // 編集機能
    const onClickEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    };

    const onChangeEditTodoText = (e) => {
        setCurrentTodo(e.target.value);
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        handleUpdateTodo(currentTodo.id, currentTodo);
    };

    const handleUpdateTodo = (id, updatedTodo) => {
        const newTodos = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(newTodos);
    };

    return (
        <div className='container'>
            {isEditing ? (
                <div className='inputArea'>
                    <h1>Edit Todo</h1>
                    <form onSubmit={handleEditFormSubmit} className='inputBox'>
                        <input
                            type="text"
                            placeholder='変更内容を入力'
                            value={currentTodo.text}
                            onChange={onChangeEditTodoText}
                        />
                        <button type="submit">更新</button>
                        <button onClick={() => setIsEditing(false)} className='btnCancel'>キャンセル</button>
                    </form>
                </div>
            ) : (
                <div className='inputArea'>
                    <h1>Add Todo</h1>
                    <form onSubmit={handleAddFormSubmit} className='inputBox'>
                        <input
                            type="text"
                            placeholder='TODOを入力'
                            value={todoText}
                            onChange={onChangeTodoText}
                        />
                        <button type="submit">追加</button>
                    </form>
                </div>
            )}

            <ul className='todoList'>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <div>#{index + 1}：　</div>
                        <div className='title'>{todo}</div>
                        <button className='btn' onClick={() => onClickEdit(todo)}>編集</button>
                        <button className='btn' onClick={() => onClickDelete(index)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};