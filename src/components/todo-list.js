import React from "react";

const TodoList = () => {
    const items = ['Learn React','Drink coffee', 'Build Awesome App']
    return (
        <ul>
            <li>{items[0]}</li>
            <li>{items[1]}</li>
            <li>{items[2]}</li>
        </ul>
    )
}

export default TodoList;