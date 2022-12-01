import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";
import axios from "axios";

function BasicExample() {
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
        }
    }, [token]);


    const logout = () => {
        let login_token = localStorage.getItem("token");
        console.log(login_token)
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/logout/',
            headers: {
                'Authorization': 'Token ' + login_token
            }
        }).then(response => {
            localStorage.removeItem('token')
            setToken('')
            setHasToken(false)
            // console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Unitec</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/student">Student</Nav.Link>
                        <Nav.Link href="/lecturer">Lecturer</Nav.Link>
                        <Nav.Link href="/course">Course</Nav.Link>
                        <Nav.Link href="/class">Class</Nav.Link>
                        <Nav.Link href="/semester">Semester</Nav.Link>
                    </Nav>
                    {hasToken ?
                        <Nav>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav> :
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;