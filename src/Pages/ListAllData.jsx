import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Profile from "../assets/images/Screenshot 2024-02-08 201651.png";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function ListAllData() {
    const [posts, setPosts] = useState([]);

    const [id, setId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => {
                setPosts(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Delete Data
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/users/${id}`);

            if (res.status === 200) {
                // this code one Data Allwes Show
                // const filterDataDelete = posts.filter((post) => post.id !== id).map((item, index) => ({
                //     ...item,
                //     id: index + 1
                // }));
                // setPosts(filterDataDelete);

                const updateData = posts.filter((post) => post.id !== id);

                const newUpdateId = updateData.map((item, index) => ({
                    ...item,
                    id: index + 1,
                }));
                setPosts(newUpdateId);
            } else {
                console.log("Error deleting ");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // edit data
    const handleEdit = (id) => {
        const selectedData = posts.find((post) => post.id === id);
        setId(id);
        navigate("/", { state: { editData: selectedData } });
    };

    const downloadExcel = () => {
        // Define file properties
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = "data";

        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(posts);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        // Convert worksheet to Excel file format
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        // Create a Blob object containing the Excel file data
        const data = new Blob([excelBuffer], { type: fileType });

        // Create a temporary URL for the Blob object
        const href = URL.createObjectURL(data);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + fileExtension;

        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the link element and URL object
        document.body.removeChild(link);
    };

    return (
        <div>
            <div>
                <h1>Crud with Api</h1>
            </div>
            <center>
                <br />
                <div className="d-flex justify-content-end container">
                    <button className="btn btn-info m-2" onClick={downloadExcel}>
                        Download
                    </button>
                </div>
                <Table className="container border border-2 border-dark">
                    <tbody>
                        <tr className="bg-dark text-white">
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Gender</td>
                            <td>City Name</td>
                            <td>Salary</td>
                            <td>Mobile</td>
                            <td>Password</td>
                            <td>picture</td>
                            <td>Action</td>
                        </tr>
                        {posts.length > 0 ? (
                            posts.map((i) => {
                                return (
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.email}</td>
                                        <td>{i.gender}</td>
                                        <td>{i.city}</td>
                                        <td>$ {i.salary}</td>
                                        <td>{i.mobile}</td>
                                        <td>{i.password}</td>
                                        <td>
                                            <img
                                                key={i.id}
                                                src={i.file && Profile}
                                                alt="Profile"
                                                width={80}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary m-2"
                                                onClick={() => handleEdit(i.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(i.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="10">
                                    <h4 style={{ textAlign: "center" }}>No Data Found</h4>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </center>
        </div>
    );
}

export default ListAllData;
