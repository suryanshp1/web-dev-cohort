import React, {useState} from 'react'

const ROLES = ["Frontend", "Backend", "Fullstack", "AI Engineer"]

function ManualForm() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        role: "Frontend",
        experience: "",
        cover: ""
    })

    const [errors, setErrors] = useState({})

    const [submitted, setSubmitted] = useState(false)

    function set(field) {
        return (e) => {
            setValues((v) => {
                return {
                    ...v,
                    [field]: e.target.value
                }
            })
        }
    }

    function validate(v) {
        const e = {}
        if (!v.name.trim()) e.name = "Name is required"
        if (!v.email.trim()) e.email = "Email is required"
        if (!v.email.includes("@")) e.email = "Email is invalid"

        return e
    }

    function submit(event) {
        event.preventDefault()
        const e = validate(values)

        setErrors(e)

        if (Object.keys(e).length === 0) {
            setSubmitted(true)
        }
    }

    if (submitted) {

        return (
            <div>
                <h1>Form submitted successfully {values.name}</h1>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={submit} noValidate>
                <label>
                    Full Name
                    <input value={values.name} onChange={set('name')} />
                    {errors.name && <span>{errors.name}</span>}
                </label>
                <label>
                    Email
                    <input value={values.email} onChange={set('email')} />
                    {errors.name && <span>{errors.name}</span>}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ManualForm