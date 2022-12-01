import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {BaseUrl} from "../components/constants";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Semester(props) {
    const [semester, setSemester] = useState([]);
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
            url: BaseUrl + '/semester/',
            headers: {
                'Authorization':'Token ' + localStorage.getItem('token')
            }
        }).then(response=> {
           console.log(response.data)
               setSemester(response.data)
            }).catch(error => {
            console.log(error)
        });
    },[semester]);

     const deleteSemester=(event)=>{
        let id = event.target.value
        axios({
            method: 'delete',
            url: BaseUrl + '/semester/' + id + '/',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(id)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <NavLink
                to="/addSemester/"
                activeStyle={{
                    fontWeight: "bold",
                    color: "red"
                }}
                replace
            >
                Add Semester
            </NavLink>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Handle</th>
                </tr>
                </thead>
                <tbody>
                {
                    semester.map((item) =>
                        <tr key={item.id}>
                            <td>{item.year}</td>
                            <td>{item.semester}</td>
                            {userID == '1'?
                            <td><NavLink
                                to={"/updateSemester/"} state={{id: item.id}}
                                activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}
                                replace
                            >
                                Edit
                            </NavLink><Button value={item.id} onClick={deleteSemester}>Delete</Button></td>
                                : ''}
                        </tr>
                    )
                }
                </tbody>
            </Table>
           
        </div>
    )
}

export default Semester
