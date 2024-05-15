import React, { useEffect, useState } from "react";
import bg from "../assets/bg.jpg";
import "../css/styles.css";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    TruckIcon,
    QueueListIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";
import axios from "axios";

export default function History() {
    return (
        <StompSessionProvider url={"ws://localhost:8080/ws"}>
            <Status></Status>
        </StompSessionProvider>
    );
}

export function Status() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

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

    useEffect(() => {
        axios("http://localhost:8080/history").then(({ data }) => {
            console.log({ data });
            setHistory(data);
        });
    }, []);

    useSubscription("/topic/history", (message) => {
        console.log(message.body);
        const historyCloned = [JSON.parse(message.body), ...history];
        setHistory(historyCloned);
    });

    return (
        <div
            className="row"
            style={{
                minHeight: "97vh",
                width: "101vw",
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className="row mb-4 mt-4">
                <Tabs value={"/table"}>
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

            <div style={{ width: "90%" }}>
                <table className="table border-black">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Biển số</th>
                            <th>Trạng thái</th>
                            <th>Giờ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((row) => (
                            <tr key={row.id}>
                                <td>{row?.vehicle?.user?.name}</td>
                                <td>{row?.vehicle?.licencePlate}</td>
                                <td>{row?.checkInOutType}</td>
                                <td>{row?.checkInOutTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
