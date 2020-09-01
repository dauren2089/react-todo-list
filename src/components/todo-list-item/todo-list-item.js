import React, { Component } from "react";
import './todo-list-item.css';

export default class TodoListItem extends Component {
    // как работает прототип?
    // constructor() {
    //     super();
    //     this.onLabelClick = () => {
    //         console.log(`Done: ${this.props.label}`)
    //     }
    // }

    state = {
        done: false,
        important: false
    };
    // используем синтаксис полей класса
    onLabelClick = () => {
        // console.log(`Done: ${this.props.label}`)
        this.setState(({done}) => {
            return {
                done: !done
            }
        })
    }
    onMarkImportant = () => {
        this.setState(({important}) => {
            return {
                important: !important
            }
        });
    };

    render() {
        const { label, onDeleted } = this.props;
        const { done, important } = this.state;

        let classNames = 'todo-list-item';
        if(done) {
            classNames += ' done';
        }
        if(important) {
            classNames += ' important';
        }

        return (
            <span className={classNames}>
                <span className="todo-list-item-label"
                    onClick={ this.onLabelClick }>
                        {label}
                </span>
                {/* onClick={ this.onLabelClick.bind(this) } */}
                <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={this.onMarkImportant}>
                        <i className="fa fa-exclamation" />
                </button>
                <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={ onDeleted }>
                        <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
}
