import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css'

export default class App extends Component {
    state = {
        todoData: [
            {label: 'Drink Coffee', important: false, id: 0},
            {label: 'Learn React', important: false, id: 1},
            {label: 'Build React App', important: true, id: 2}
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData} ) => {
            const idx = todoData.findIndex((el) => el.id === id);
            // todoData.splice(idx, 1);
            // [a, b, c, d, e]
            // [a, b,    d, e]
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            // const newArray = [...before, ...after];

            const newArray = [
                ... todoData.slice(0, idx),
                ... todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    }

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos = { this.state.todoData }
                    onDeleted = { this.deleteItem } />
            </div>
        )
    }
}