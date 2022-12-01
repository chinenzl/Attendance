import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Lecturer from "./pages/Lecturer";
import Login from "./pages/Login";
import Course from "./pages/Course"
import Semester from "./pages/Semester";
import AddStudent from "./pages/AddStudent";
import AddLecturer from "./pages/AddLecturer";
import AddCourse from "./pages/AddCourse";
import AddSemester from "./pages/AddSemester";
import UpdateStudent from "./pages/UpdateStudent";
import UpdateLecturer from "./pages/UpdateLecturer";
import UpdateCourse from "./pages/UpdateCourse";
import UpdateSemester from "./pages/UpdateSemester";

function App() {
    return (
        <div className="App container">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path="/course" element={<Course/>}/>
                <Route path="/semester" element={<Semester/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/addStudent" element={<AddStudent/>}/>
                <Route path="/updateStudent/" element={<UpdateStudent/>}/>
                <Route path="/addLecturer" element={<AddLecturer/>}/>
                <Route path="/updateLecturer/" element={<UpdateLecturer/>}/>
                <Route path="/addCourse" element={<AddCourse/>}/>
                <Route path="/updateCourse/" element={<UpdateCourse/>}/>
                <Route path="/addSemester" element={<AddSemester/>}/>
                <Route path="/updateSemester/" element={<UpdateSemester/>}/>
            </Routes>
        </div>
    );
}

export default App;
