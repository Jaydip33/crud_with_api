import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function AxiosComponent(props) {
    const [users, setUsers] = useState([]);

    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        number: "",
    });

    const [id, setId] = useState("");

    // Display Api Data
    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => {
                console.log(res.data);

                const removeData = [
                    ...new Map(res.data.map((i) => [i.name.toLowerCase(), i])).values(),
                ];
                setAllUsers(removeData);
                // setAllUsers(res.data || []);
                setUsers(res.data || []);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    // Submit Data
    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/users", inputValue);
            setUsers(res.data);
            console.log("New post added:", res.data);

            setInputValue({
                name: "",
                email: "",
                number: "",
            });
        } catch (error) {
            console.error("Error adding users:", error);
        }
    };

    // Delete Api Data
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/users/${id}`);
            if (res.status === 200) {
                setUsers(users.filter((user) => user.id !== id));
                console.log("User deleted successfully");
            } else {
                console.log("Error deleting user");
            }
        } catch (err) {
            console.log("Error deleting user:", err);
        }
    };

    // Update Api Data
    const handleEdit = async (id) => {
        setId(id);

        try {
            const res = await axios.get(`http://localhost:3000/users/${id}`);
            const data = res.data;
            setInputValue({
                name: data.name,
                email: data.email,
                number: data.number,
            });
            console.log("New post added:", data);
        } catch (err) {
            console.log("Error adding posts:", err);
        }
    };

    const handleEditData = async () => {
        try {
            const res = await axios.put(
                `http://localhost:3000/users/${id}`,
                inputValue
            );
            const data = res.data;
            console.log("New post added:", data);
        } catch (err) {
            console.log("Error adding posts:", err);
        }
        setId("")
    };

    // Select option and filter

    const [selectedValue, setSelectedValue] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const onHandleChange = (e) => {
        const data = e.target.value;
        setSelectedValue(data);
        if (data === "") {
            setUsers(allUsers);
        } else {
            const filteredData = allUsers.filter((user) => user.name.includes(data));
            setUsers(filteredData);
        }
    };

    // Searching Data
    const [input, setInput] = useState("");

    const handleChangeSearch = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setInput(inputValue);

        if (inputValue === "") {
            axios
                .get("http://localhost:3000/users")
                .then((res) => {
                    console.log(res.data);
                    setUsers(res.data || []);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        } else {
            const filteredData = users.filter((user) =>
                user.name.toLowerCase().includes(inputValue)
            );
            setUsers(filteredData);
        }
    };

    return (
        <div>
            <center>
                <h2>User Information</h2>

                <br />

                <Form
                    onSubmit={id !== "" ? handleEditData : handleSubmit}
                    style={{ border: "2px solid black", width: "400px", padding: "35px" }}
                    className="shadow-lg mb-5 bg-body rounded-2"
                >
                    <label htmlFor="">Name :</label>
                    <input
                        required
                        className="ms-2"
                        type="text"
                        name="name"
                        value={inputValue.name}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="">Email :</label>
                    <input
                        required
                        className="ms-2"
                        type="email"
                        name="email"
                        value={inputValue.email}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="">Mobile :</label>
                    <input
                        required
                        className="ms-2"
                        type="tel"
                        name="number"
                        value={inputValue.number}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value={id !== "" ? "Update Data" : "Add Data"}
                        className="btn btn-primary"
                    />
                </Form>

                <br />
                <br />

                <div className="d-flex justify-content-center">
                    <h5 className="mx-5">
                        <select value={selectedValue} onChange={onHandleChange}>
                            <option value="">Select Option</option>
                            {allUsers.map((i, index) => {
                                return (
                                    <option key={index} value={i.name}>
                                        {i.name}
                                    </option>
                                );
                            })}
                        </select>
                    </h5>

                    <label htmlFor="" className="d-flex align-items-center">
                        Search :
                    </label>
                    <input
                        className="ms-2"
                        type="search"
                        name="search"
                        id="search"
                        value={input}
                        onChange={handleChangeSearch}
                    />
                </div>

                <br />

                <div className="container">
                    <Table border={2} style={{ border: "2px solid black" }}>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Mobile</td>
                            <td>Action</td>
                        </tr>
                        {users.length > 0 ? (
                            users.map((i) => {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.email}</td>
                                        <td>+91 {i.number}</td>
                                        <td>
                                            <Button
                                                className="m-2"
                                                type="button"
                                                onClick={() => handleEdit(i.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => handleDelete(i.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    <h4 className="text-center">No Data Found</h4>
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>
            </center>
        </div>
    );
}

export default AxiosComponent;
