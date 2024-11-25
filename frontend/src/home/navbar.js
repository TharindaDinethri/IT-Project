import React from 'react';
import logo from '../img/logo.png';
import cart from '../img/cart_icon.png';
import './navbar.css';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg container">
                <a className="navbar-brand" href="#">
                    <img src={logo} className='img-fluid w-25'/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <a className="nav-link fw-bold text-dark" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-dark" href="/coco">Cocunut Related</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-dark" href="/spices">Spices</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-dark" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold text-dark" href="">Contact Us</a>
                        </li>
                        <li className="nav-item" style={{marginLeft:"110px"}}>
                            <a className="nav-link fw-bold text-dark" href="#">
                                <img src={cart}  className='img-fluid w-75'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
