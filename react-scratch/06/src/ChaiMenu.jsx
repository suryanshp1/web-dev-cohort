import { useState, useEffect } from "react";

export function ChaiMenu() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/all-chai')
            .then(res => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>
            <h1>Chai Menu</h1>
            <ul>
                {data && data.map(chai => <li key={chai.id}>{chai.name}</li>)}
            </ul>
        </div>
    )
}