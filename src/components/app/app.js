import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import Header from "../header"

import './app.css'

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Learn React'),
            this.createTodoItem('Build React App')
        ],
        term: '',
        filter: 'all' // active, all, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData} ) => {
            const idx = todoData.findIndex((el) => el.id === id);

            // удалять элемент запрещено!
            // todoData.splice(idx, 1);

            // Вместо удаления старого массива, заменяем на новый массив без удаленного элемента
            // [a, b, c, d, e]
            // [a, b,    d, e]
            // вариант1
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);
            // const newArray = [...before, ...after];

            // вариант2 сокращенный
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    }

    itemAdded = (text) => {
        // create new Item
        const newItem = this.createTodoItem(text)

        // add element in array
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ]

            return{
                todoData: newArray
            }
        })
    }

    toggleProperties(arr, id, propName) {
        //  1. находим текущий индекс выбранного элемента в массиве todoData/
        const idx = arr.findIndex((el) => el.id === id);

        // 2. сохраняем данные выбранного элемента в переменную oldItem
        const oldItem = arr[idx];

        // 3. создаем новый элемент с данными старого элемента, кроме отметки IMPORTANT
        // 3.1 свойство IMPORTANT будет менять свое значение
        const newItem = { ...oldItem, [propName]: !oldItem[propName]};

        // 4. Создаем новый массив с данными старого массива и добавляем изменненый элемент
        // 5.  возвращаем новый массив в STATE
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    toggleImportant = (id) => {
        // Для редактирования массива сохраненного в STATE, используем setSTATE()
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperties(todoData, id, 'important')
            }
        })
    }

    toggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperties(todoData, id, 'done')
            }
        })
    }

    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }

        // switch (filter) {
        //     case 'all':
        //         return items;
        //     case 'active':
        //         return items.filter((item) => !item.done);
        //     case 'done':
        //         return items.filter((item) => item.done);
        //     default:
        //         return items;
        // }
    }

    searchItems(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filterItems(
            this.searchItems(todoData, term), filter);

        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <Header />
                <main className="main">
                    <AppHeader toDo={todoCount} done={doneCount} />
                    <div className="top-panel d-flex">
                        <SearchPanel
                            onSearchChange={this.onSearchChange} />
                        <ItemStatusFilter
                            filter={filter}
                            onFilterChange={this.onFilterChange} />
                    </div>
                    <TodoList
                        todos = {visibleItems}
                        onDeleted = { this.deleteItem }
                        onToggleImportant = { this.toggleImportant }
                        onToggleDone = { this.toggleDone } />
                    <ItemAddForm onItemAdded = { this.itemAdded }
                                 onLabelChange = {this.onLabelChange } />
                </main>
            </div>
        )

    }
}