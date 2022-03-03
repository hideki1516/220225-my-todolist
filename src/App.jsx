import React, { useState, useEffect } from 'react';
import "./style.css";

export const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoStatus, setTodoStatus] = useState([
        { 'id': 1, 'text': '全て', 'value': 'all' },
        { 'id': 2, 'text': '未着手', 'value': 'incomplete' },
        { 'id': 3, 'text': '着手', 'value': 'inProgress' },
        { 'id': 4, 'text': '完了', 'value': 'complete' },
    ]);
    const [currentTodo, setCurrentTodo] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // 追加機能
    const handleAddTodoTitle = (e) => {
        setTodoTitle(e.target.value);
    };

    const handleAddFormSubmit = (e) => {
        e.preventDefault();

        if (todoTitle === '') return;
        const newTodoItems = [...todoList,
        {
            id: todoList.length,
            title: todoTitle,
            status: todoStatus,
        }];
        setTodoList(newTodoItems);
        setTodoTitle('');
    };

    const handleStatusSelectChange = (e) => {
        // e.target.value に選択したvalueが渡ってくるのは分かるのですが...
        // 例）完了を選択したら「e.target.value」には「complete」が渡される。
    }

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
                            onChange={handleAddTodoTitle}
                        />
                        <button type="submit">追加</button>
                    </form>
                </div>
            )}
            
            <div className='listArea'>
                <select onChange={handleStatusSelectChange} className='select'>
                    {todoStatus.map((status) => (
                        <option key={status.id} value={status.value}>
                            {status.text}
                        </option>
                    ))}
                </select>

                <ul className='todoList'>
                    {todoList.map((todo, id) => (
                        <li key={id}>
                            <div>#{id + 1}：　</div>
                            <div className='title'>{todo.title}</div>
                            <div>
                                <select onChange={handleStatusSelectChange}>
                                    {todoStatus.map((status) => (
                                        <option key={status.id} value={status.value}>
                                            {status.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='btn' onClick={() => onClickEdit(todo)}>編集</button>
                            <button className='btn' onClick={() => onClickDelete(id)}>削除</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};