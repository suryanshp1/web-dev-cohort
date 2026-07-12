'use client';
import React, { useState, useEffect } from 'react'

const ClientPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10");
            const data = await res.json();
            console.log(data);
            setData(data);
        }
        fetchData();
        // console.log(window);
    }, []);
  return (
    <div>
        <button onClick={() => alert("Hello World")}>Click Me</button>
    </div>
  )
}

export default ClientPage