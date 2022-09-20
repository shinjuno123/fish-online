import React from "react";



function Header (props) {
    return (
        <header className="header">
            <img alt="fish" src="/images/fish.png" />
            <h1>Fish Online</h1>
            <p>({ props.mode })</p>
        </header>
    );
}

export default Header;