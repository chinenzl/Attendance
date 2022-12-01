import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {BaseUrl} from "../components/constants";

// import {Table} from "react-bootstrap";
// import {BaseUrl} from "../components/constants";

function AddSemester(props) {
    const [year, setYear] = useState([]);
    const [semester, setSemester] = useState([]);
    const [token, setToken] = useState("");
    // const [hasToken, setHasToken] = useState(false);
    const yearHandler =(e)=>{
        setYear(e.target.value)
    }
    const semesterHandler =(e)=>{
        setSemester(e.target.value)
    }

    const addSemester = () => {
        axios({
            method: 'post',
            url: BaseUrl + '/semester/',
            data:{
                'year':year,
                'semester':semester,
            },
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log('addSemester success')
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" placeholder="Year" onChange={yearHandler}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="semester">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="text" placeholder="Semester" onChange={semesterHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addSemester}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddSemester