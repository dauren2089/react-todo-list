import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import React from "react";

const App = () => {

    const todoData = [
        {label: 'Drink Coffee', important: false, id: 0},
        {label: 'Learn React', important: false, id: 1},
        {label: 'Build React App', important: true, id: 2}
    ]

    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList todos={todoData} />
        </div>
    )
}

export default App;