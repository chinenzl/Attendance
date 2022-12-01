import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {BaseUrl} from "../components/constants";
import {useLocation} from "react-router-dom";

// import {Table} from "react-bootstrap";
// import {BaseUrl} from "../components/constants";

function UpdateSemester(props) {
    const location = useLocation()
    const id = location.state.id
    const [ID, setID] = useState([]);
    const [year, setYear] = useState([]);
    const [semester, setSemester] = useState([]);
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
         axios({
            method: 'get',
            url: BaseUrl + '/semester/' + id,
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            console.log('Semester success')

        }).catch(error => {
            console.log(error)
        });
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true)
        }

    }, );

    const updateSemester = (id) => {
        axios({
            method: 'put',
            url: BaseUrl + '/semester/' + id + '/',
            data: {
                "id": ID,
                "year": year,
                "semester":semester
            },
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            console.log('updateSemester success')

        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3" controlId="ID">
                    <Form.Label>Semester ID</Form.Label>
                    <Form.Control type="text" placeholder="ID" onChange={e => setID(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" placeholder="Year" onChange={e => setYear( e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="LastName">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="text" placeholder="Semester" onChange={e => setSemester(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={updateSemester(ID)}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UpdateSemester