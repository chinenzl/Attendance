import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../components/constants";

// import {Table} from "react-bootstrap";
// import {BaseUrl} from "../components/constants";

function AddCourse(props) {
    const [CourseCode, setCourseCode] = useState([]);
    const [CourseName, setCourseName] = useState([]);
    // const [token, setToken] = useState("");
    const codeHandler =(e)=>{
        setCourseCode(e.target.value)
    }
    const courseNameHandler =(e)=>{
        setCourseName(e.target.value)
    }

    const addCourse = () => {
        axios({
            method: 'post',
            url: BaseUrl + '/course/',
            data:{
                'code':CourseCode,
                'course_name':CourseName,
            },
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log('addCourse success')

        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">

            <Form>
                <Form.Group className="mb-3" controlId="code">
                    <Form.Label>Course Code</Form.Label>
                    <Form.Control type="text" placeholder="Course Code" onChange={codeHandler}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Course_Name">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control type="text" placeholder="Course Name" onChange={courseNameHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addCourse}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddCourse