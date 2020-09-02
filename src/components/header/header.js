import React, {Component} from "react";
import './header.css'

export default class Header extends Component {
    render() {
        return (
            <header className="shadow-sm bg-light rounded header d-flex">
                <div className="header-logo">
                    <a href="">
                        <img src="../../logo192.png" alt="logo" className="logo grey"/>
                    </a>
                </div>
                <aside className="aside">
                    <button className="btn navbar-btn text-secondary">
                        <i id="icon" className="fas fa-bars"></i>
                    </button>

                </aside>
            </header>
        )
    }
}