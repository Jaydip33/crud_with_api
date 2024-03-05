import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function RegistrationForm() {
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        salary: "",
        mobile: "",
        password: "",
        file: null,
        city: "India",
        gender: "",
    });

    const navigate = useNavigate();

    const [id, setId] = useState("");

    const [posts, setPosts] = useState("");

    const location = useLocation();

    const editData = location?.state && location?.state?.editData;

    useEffect(() => {
        if (editData) {
            setInputValue({
                name: editData.name || "",
                email: editData.email || "",
                salary: editData.salary || "",
                mobile: editData.mobile || "",
                password: editData.password || "",
                // file: editData.file || "",
                city: editData.city || "",
                gender: editData.gender || "",
            });
            setId(editData.id);
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "radio") {
            setInputValue({ ...inputValue, [name]: value });
        } else {
            setInputValue({ ...inputValue, [name]: value });
        }
    };

    // Submit Data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/users", inputValue);
            console.log(res.data);

            setInputValue({
                name: "",
                email: "",
                salary: "",
                mobile: "",
                password: "",
                file: "",
                city: "India",
                gender: "",
            });

            navigate("/list", { replace: true });
        } catch (err) {
            console.log(err);
        }
    };

    // Update Data
    const handleUpdateData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `http://localhost:3000/users/${id}`,
                inputValue
            );

            const data = await res.data;

            setPosts((users) => {
                return users.map((user) => (user.id === data.id ? data : user));
            });
            console.log(res.data);

            setInputValue({
                name: "",
                email: "",
                salary: "",
                mobile: "",
                password: "",
                file: "",
                city: "India",
                gender: "",
            });

            navigate("/list", { replace: true });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="mt-3">
                <h1>Crud with Api</h1>
            </div>

            <div className="d-flex justify-content-center">
                <Form
                    className="border border-dark rounded-1 w-50 m-4 p-3"
                    onSubmit={id !== "" ? handleUpdateData : handleSubmit}
                >
                    <h3>Registration Form</h3>
                    <br />

                    <label>Name :</label>
                    <input
                        required
                        type="text"
                        name="name"
                        className="ms-3"
                        value={inputValue.name}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label>Email :</label>
                    <input
                        required
                        type="email"
                        name="email"
                        className="ms-3"
                        value={inputValue.email}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    {/* <label>Gender:</label> */}
                    <fieldset>
                        <label>Gender:</label>
                        <input
                            className="ms-3"
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                        />
                        <label for="male" className="ms-2">
                            Male
                        </label>
                        <input
                            className="ms-3"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                        />
                        <label for="female" className="ms-2">
                            Female
                        </label>
                        <input
                            className="ms-3"
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleChange}
                        />
                        <label for="other" className="ms-2">
                            Other
                        </label>
                    </fieldset>
                    <br />
                    <br />

                    <label for="city">City Name :</label>
                    <select
                        id="city"
                        name="city"
                        className="ms-3 w-25"
                        onChange={handleChange}
                    >
                        <option value="india">India</option>
                        <option value="USA">USA</option>
                        <option value="canada">Canada</option>
                        <option value="other">Other</option>
                    </select>
                    <br />
                    <br />

                    <label>Salary :</label>
                    <input
                        required
                        type="number"
                        name="salary"
                        className="ms-3"
                        value={inputValue.salary}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label>Mobile :</label>
                    <input
                        required
                        type="tel"
                        name="mobile"
                        className="ms-3"
                        value={inputValue.mobile}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label>Password :</label>
                    <input
                        required
                        type="password"
                        name="password"
                        className="ms-3"
                        value={inputValue.password}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <label style={{ marginLeft: "100px" }}>Profile Picture :</label>
                    <input
                        required
                        type="file"
                        name="file"
                        accept="image/jpg/png"
                        className="ms-3"
                        value={inputValue.file}
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <input
                        type="submit"
                        value={id !== "" ? "Update Data" : "Add Data"}
                        className="btn btn-success"
                    />
                </Form>
            </div>
        </div>
    );
}

export default RegistrationForm;
