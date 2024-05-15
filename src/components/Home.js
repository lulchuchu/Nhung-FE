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
import axios from "axios";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

export default function HOCHome() {
    return (
        <StompSessionProvider url={"ws://localhost:8080/ws"}>
            <Home></Home>
        </StompSessionProvider>
    );
}

function Home() {
    const navigate = useNavigate();
    const [parkingSlots, setParkingSlots] = useState([]);

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

    const initialData = [
        { id: 1, status: 1 },
        { id: 2, status: 0 },
        { id: 3, status: 1 },
        { id: 4, status: 0 },
        { id: 5, status: 0 },
        { id: 6, status: 1 },
        { id: 7, status: 0 },
        { id: 8, status: 0 },
        { id: 9, status: 0 },
        { id: 10, status: 0 },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:8080/parkingSlot")
            .then(({ data }) => setParkingSlots(data));
    }, []);

    const handleTabChange = (id) => {
        setTimeout(() => {
            navigate(id);
        }, 500);
    };

    const renderTd = (id, occupied, isLast) => {
        const redStyle = {
            borderLeft: "2px solid black",
            backgroundColor: occupied === true ? "#f44336" : "   ",
            height: "200px",
            width: "200px",
            borderRight: isLast ? "2px solid black" : "0",
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: 20,
            fontWeight: 300,
            color: "gray",
        };

        return (
            <td key={id} style={redStyle}>
                {id}
            </td>
        );
    };

    useSubscription("/topic/parkingSlot", (message) => {
        console.log(message.body);
        setParkingSlots(JSON.parse(message.body));
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
                <Tabs value={"/car"}>
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

            <div style={{ width: "90%", marginBottom: "50px" }}>
                <table
                    className="table"
                    style={{ borderBottom: "2px solid black" }}
                >
                    {parkingSlots.map(({ id, occupied }, index) =>
                        renderTd(id, occupied, index === 1)
                    )}
                </table>
            </div>
        </div>
    );
}
