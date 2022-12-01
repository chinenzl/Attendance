import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BaseUrl} from "../components/constants";



const Login = (props) => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
        }
        // console.log(localStorage.getItem("token"))
    }, [token])

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = () => {
        if (username === "") {
            alert('Please input Username')
            return
        }

        if (password === "") {
            alert('Please input password')
            return
        }

        axios({
            method: 'post',
            url: BaseUrl + '/auth/',
            data: {
                username: username,
                password: password,
            }
        })
            .then(response=> {
                 setToken(response.data)
                setHasToken(true)
                // console.log(response)
                localStorage.setItem("token", response.data.token)
            }).catch(error => {
            console.log(error)
        });

    }

    const logout = () => {
        let login_token = localStorage.getItem("token");
        console.log(login_token)
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/logout/',
        headers: {
                'Authorization':'Token ' + login_token
            }
        }).then(response=> {
                localStorage.removeItem('token')
                setToken('')
                setHasToken(false)
                // console.log(response)
            }).catch(error => {
            console.log(error)
        });
    }


    return (
        <div>
            {hasToken ?
                <Button type="normal small" onClick={logout}>Logout</Button>
                : <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="string" placeholder="UserName" name={"username"}
                                      onChange={usernameHandler}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name={"password"}
                                      onChange={passwordHandler}/>
                    </Form.Group>
                    <div>
                        <Button variant="primary  small" onClick={handleLogin}>
                            Submit
                        </Button>
                        <Button type="normal small">返回</Button>
                    </div>
                </Form>}

        </div>
    )
}


export default Login