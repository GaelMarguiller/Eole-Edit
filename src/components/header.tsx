import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';

export default function Header() {
    return (
        <>
            <header>
                <h1 className="text-center">Eole Edit</h1>
            </header>
            <Nav className="d-flex flex-row justify-content-center" defaultActiveKey="/home">
                <NavItem>
                    <NavLink href="/">
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/list">
                        List
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    );
}
