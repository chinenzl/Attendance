import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {BaseUrl} from "../components/constants";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";

function Student(props) {
    const [student, setStudent] = useState([]);
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
        }else{
            setHasToken(false)
        }

        axios({
            method: 'get',
            url: BaseUrl + '/student/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            setStudent(response.data)
            console.log(student)
        }).catch(error => {
            console.log(error)
        });
    }, [student]);

    const deleteStudent=(event)=>{
        let student_id = event.target.value
        axios({
            method: 'delete',
            url: BaseUrl + '/student/' + student_id + '/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(student_id)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <NavLink
                to="/addStudent/"
                activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                }}
                replace
            >
                Add Student
            </NavLink>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Handle</th>
                </tr>
                </thead>
                <tbody>
                {
                    student.map((item) =>
                        <tr key={item.student_id}>
                            <td>{item.student_id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.DOB}</td>
                            {userID == '1'?
                            <td><NavLink
                                to={"/updateStudent/"} state={{student_id: item.student_id}}
                                activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}
                                replace
                            >
                                Edit
                            </NavLink><Button value={item.student_id} onClick={deleteStudent}>Delete</Button></td>
                                : <td>100%</td>}
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Student