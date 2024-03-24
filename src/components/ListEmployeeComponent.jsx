import { useEffect, useState } from "react"
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
//Inorder to navigate user from one page to another page --> "useNavigate" hook 
import { useNavigate } from "react-router-dom"
const ListEmployeeComponent = () => {

    const [employees, setEmployees]= useState([])

    const navigator= useNavigate();

    // inorder to make REST API called in AJAX or React functional component use ==> useEffect
    
    // useEffect(() => {
    //     listEmployees().then((response) => {
    //         setEmployees(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }, [])

    useEffect(() => {
        getAllEmployees();
    }, [])

    // const dummyData= [
    //     {
    //         "id":1,
    //         "firstName": "Vinay",
    //         "lastName": "jagu",
    //         "email":"jaguvinay2002@gmail.com"
    //     },
    //     {
    //         "id":2,
    //         "firstName": "bhargav",
    //         "lastName": "jagu",
    //         "email":"jagubhargav2002@gmail.com"
    //     },
    //     {
    //         "id":3,
    //         "firstName": "srinu",
    //         "lastName": "jagu",
    //         "email":"jagusrinu2002@gmail.com"
    //     } 
    // ]
    function getAllEmployees() {
        listEmployees().then((response) => {
                setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }
    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id) {
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.log(error);
        })
    }
  return (
    <div className="container">
        <h2 className="text-center">List Of Employees</h2>
         <button className="btn btn-primary mb-2" onClick= {addNewEmployee}>Add Employee</button> 
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employeee Id</th>
                    <th>Employeee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                  employees.map(employee => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
export default ListEmployeeComponent