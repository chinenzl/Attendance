import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../components/constants";

// import {Table} from "react-bootstrap";
// import {BaseUrl} from "../components/constants";

function AddLecturer(props) {
    const [staffID, setStaffID] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [DOB, setDOB] = useState([]);
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
        }
    },);

    const addLecturer = () => {
        axios({
            method: 'post',
            url: BaseUrl + '/lecturer/',
            data: {
                'student_id': staffID,
                'first_name': firstName,
                'last_name': lastName,
                'DOB': DOB,
            },
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            console.log('addStaff success')

        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">

            <Form>
                <Form.Group className="mb-3" controlId="Staff_ID">
                    <Form.Label>Staff_ID</Form.Label>
                    <Form.Control type="text" placeholder="Staff ID" onChange={e => setStaffID(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="FirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
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
                    <Form.Control type="text" placeholder="Date of Birth" onChange={e => setDOB(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addLecturer}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddLecturer