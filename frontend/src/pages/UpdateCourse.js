import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {BaseUrl} from "../components/constants";
import {useLocation} from "react-router-dom";

// import {Table} from "react-bootstrap";
// import {BaseUrl} from "../components/constants";

function UpdateStudent(props) {
    const location = useLocation()
    const student_id = location.state.student_id
    const [student, setStudent] = useState([]);
    const [studentID, setStudentID] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [DOB, setDOB] = useState([]);
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
         axios({
            method: 'get',
            url: BaseUrl + '/student/' + student_id,
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            console.log('addStudent success')
            setStudent(response.data)
        }).catch(error => {
            console.log(error)
        });
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
        }

    }, );

    const updateStudent = (student_id) => {
        axios({
            method: 'put',
            url: BaseUrl + '/student/' + student_id + '/',
            data: {
                'student_id': studentID,
                'first_name': firstName,
                'last_name': lastName,
                'DOB': DOB,
            },
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            console.log('addStudent success')

        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3" controlId="Student_ID">
                    <Form.Label>Student_ID</Form.Label>
                    <Form.Control type="text" placeholder="Student ID" onChange={e => setStudentID(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="FirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={e => setFirstName( e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="LastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Date_of_Birth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" placeholder="Date of Birth" onClick={e => setDOB(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={updateStudent(studentID)}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UpdateStudent