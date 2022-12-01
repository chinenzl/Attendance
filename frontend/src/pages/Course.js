import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {BaseUrl} from "../components/constants";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Course(props) {
    const [course, setCourse] = useState([]);
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
            url: BaseUrl + '/course/',
            headers: {
                'Authorization':'Token ' + localStorage.getItem('token')
            }
        }).then(response=> {
           console.log(response.data)
               setCourse(response.data)
            }).catch(error => {
            console.log(error)
        });
    },[course]);

    const deleteCourse=(event)=>{
        let course_id = event.target.value
        axios({
            method: 'delete',
            url: BaseUrl + '/course/' + course_id + '/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(course_id)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <NavLink
                to="/addCourse/"
                activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                }}
                replace
            >
                Add Course
            </NavLink>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Name</th>
                    <th>Handle</th>

                </tr>
                </thead>
                <tbody>
                {
                    course.map((item) =>
                        <tr key={item.code}>
                            <td>{item.code}</td>
                            <td>{item.course_name}</td>
                        {userID == '1'?
                            <td><NavLink
                                to={"/updateCourse/"} state={{id: item.code}}
                                activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}
                                replace
                            >
                                Edit
                            </NavLink><Button value={item.code} onClick={deleteCourse}>Delete</Button></td>
                                : ''}

                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Course