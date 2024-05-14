import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import '../css/styles.css';
import {
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    TruckIcon,
    QueueListIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

export default function Status() {
    const navigate = useNavigate();

    const data = [
        {
            label: "Đăng ký",
            id: '/signup',
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
        { id: 1, name: 'John Doe', age: 25, status: 1 },
        { id: 2, name: 'Jane Smith', age: 30, status: 0 },
        { id: 3, name: 'John Doe', age: 25, status: 1 },
        { id: 4, name: 'Jane Smith', age: 30, status: 0 },
        { id: 5, name: 'John Doe', age: 25, status: 1 },
        { id: 6, name: 'John Doe', age: 25, status: 1 },
        { id: 7, name: 'Jane Smith', age: 30, status: 0 }
    ];

    const handleTabChange = (id) => {
        setTimeout(() => {
            navigate(id);
        }, 500); 
    }

    return (
        <div className='row'
            style={{
                minHeight: '97vh',
                width: '101vw',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div className='row mb-4 mt-4'>
                <Tabs value={'/table'}>
                    <TabsHeader>
                        {data.map(({ label, id, icon }) => (
                            <Tab key={id} value={id} onClick={() => handleTabChange(id)}>
                                <div className="flex items-center gap-2">
                                    {React.createElement(icon, { className: "w-5 h-11" })}
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>

            <div style={{width: '90%'}}>
                <table className='table border-black'>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Biển số</th>
                            <th>Trạng thái</th>
                            <th>Giờ vào</th>
                            <th>Giờ ra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialData.map((row, index) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td style={{ color: row.status === 1 ? 'green' : 'red' }}>
                                    {row.status === 1 ? 'Online' : 'Offline'}
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}