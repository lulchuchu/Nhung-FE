import React from "react";
import bg from "../assets/bg.jpg";
import "../css/styles.css";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    TruckIcon,
    QueueListIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [licencePlate, setLicencePlate] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const navigate = useNavigate();

    const data = [
        {
            label: "Đăng ký",
            id: "/signup",
            icon: Square3Stack3DIcon,
        },
        {
            label: "Bãi xe",
            id: "/car",
            icon: TruckIcon,
        },
        {
            label: "Lưu trữ",
            id: "/table",
            icon: QueueListIcon,
        },
    ];

    const handleTabChange = (id) => {
        setTimeout(() => {
            navigate(id);
        }, 500);
    };

    const handleSubmit = () => {
        console.log(userName, licencePlate, cardNumber);
        axios.post("http://localhost:8080/vehicle", {
            licencePlate,
            userName,
            cardNumber,
        });
    };

    return (
        <div
            className="justify-content-center row"
            style={{
                height: "97vh",
                width: "101vw",
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="row mb-4 mt-4">
                <Tabs value="/signup">
                    <TabsHeader>
                        {data.map(({ label, id, icon }) => (
                            <Tab
                                key={id}
                                value={id}
                                onClick={() => handleTabChange(id)}
                            >
                                <div className="flex items-center gap-2">
                                    {React.createElement(icon, {
                                        className: "w-5 h-11",
                                    })}
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
            <div
                className="col-md-4 border-2 border-black rounded-4 custom-shadow-purple p-3"
                style={{ height: "450px" }}
            >
                <div className="fs-3 fw-bolder" style={{ textAlign: "center" }}>
                    Đăng ký
                </div>
                <div className="p-4">
                    <div className="form-group mb-3">
                        <label
                            className="mb-2"
                            htmlFor="name"
                            style={{ fontWeight: 500 }}
                        >
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nhập họ và tên"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label
                            className="mb-2"
                            htmlFor="id"
                            style={{ fontWeight: 500 }}
                        >
                            Mã thẻ
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            placeholder="Nhập mã thẻ"
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-5">
                        <label
                            className="mb-2"
                            htmlFor="licensePlate"
                            style={{ fontWeight: 500 }}
                        >
                            Biển số xe
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="licensePlate"
                            placeholder="Nhập biển số xe"
                            onChange={(e) => setLicencePlate(e.target.value)}
                        />
                    </div>
                    <div style={{ direction: "rtl" }}>
                        <button
                            type="button"
                            class="btn btn-success"
                            style={{ backgroundColor: "#198754", padding: 15 }}
                            onClick={handleSubmit}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
