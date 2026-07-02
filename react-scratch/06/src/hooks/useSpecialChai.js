import { useState, useEffect } from "react";

export function useSpecialChai() {
    const [chai, setChai] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/special-chai')
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then((data) => {
                setChai(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
    }, [])

    return {
        chai,
        loading,
        error
    }
}