import React, { useState, useEffect } from 'react';
import "./style.css";

export const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [currentTodo, setCurrentTodo] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // 追加機能
    const onChangeTodoText = (e) => {
        setTodoTitle(e.target.value);
    }

    const handleAddFormSubmit = (e) => {
        e.preventDefault();

        if (todoTitle === '') return;
        const newTodoItems = [...todoList,
        {
            id: todoList.length,
            title: todoTitle,
        }];
        setTodoList(newTodoItems);
        setTodoTitle('');
    };

    // 削除機能
    const onClickDelete = (id) => {
        const removeItems = [...todoList];
        removeItems.splice(id, 1);
        setTodoList(removeItems);
    };

    // 編集機能
    const onClickEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    };

    const handleEditInputChange = (e) => {
        setCurrentTodo({ ...currentTodo, title: e.target.value });
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        handleUpdateTodo(currentTodo.id, currentTodo);
        console.log(currentTodo.id)
    };

    const handleUpdateTodo = (id, updatedTodo) => {
        const updatedItems = todoList.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodoList(updatedItems);
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
                            value={currentTodo.title}
                            onChange={handleEditInputChange}
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
                            value={todoTitle}
                            onChange={onChangeTodoText}
                        />
                        <button type="submit">追加</button>
                    </form>
                </div>
            )}

            <ul className='filterBtnList'>
                <li>全てを表示</li>
                <li>未着手</li>
                <li>進行中</li>
                <li>完了</li>
            </ul>

            <ul className='todoList'>
                {todoList.map((todo, id) => (
                    <li key={id}>
                        <div>#{id + 1}：　</div>
                        <div className='title'>{todo.title}</div>
                        <button className='btn' onClick={() => onClickEdit(todo)}>編集</button>
                        <button className='btn' onClick={() => onClickDelete(id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};