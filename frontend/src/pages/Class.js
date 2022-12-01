import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {BaseUrl} from "../components/constants";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Class(props) {
    const [classes, setClasses] = useState([]);
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);
    const [userID, setUserID] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
            axios({
                method: 'get',
                url: BaseUrl + '/user_id_search/',
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                setUserID(response.data.userid)
                console.log("userid:" + userID)
            }).catch(error => {
                console.log(error)
            });
        } else {
            setHasToken(false)
        }

        axios({
            method: 'get',
            url: BaseUrl + '/class/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response.data)
            setClasses(response.data)
        }).catch(error => {
            console.log(error)
        });
    }, [classes]);

     const deleteLecturer=(event)=>{
        let staff_id = event.target.value
        axios({
            method: 'delete',
            url: BaseUrl + '/lecturer/' + staff_id + '/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(staff_id)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <NavLink
                to="/addLecturer/"
                activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                }}
                replace
            >
                Add Lecturer
            </NavLink>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>class ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Handle</th>
                </tr>
                </thead>
                <tbody>
                {
                    classes.map((item) =>
                        <tr key={item.number}>
                            <td>{item.number}</td>

                {userID == '1'?
                                <td><NavLink
                                    to={"/updateLecturer/"} state={{staff_id: item.staff_id}}
                                    activeStyle={{
                                        fontWeight: "bold",
                                        color: "red"
                                    }}
                                    replace
                                >
                                    Edit
                                </NavLink><Button value={item.staff_id} onClick={deleteLecturer}>Delete</Button></td>
:''}
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Class