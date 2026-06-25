import React, {useState} from 'react'
import { useForm } from "react-hook-form"

const ROLES = ["Frontend", "Backend", "Fullstack", "AI Engineer"]

function HookForm() {
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({defaultValues: {name: "Surya", email: "", role: "Frontend"}, mode: "onTouched"})

    function submit(data) {
        return new Promise((resolve) => {
            console.log("submitted", data)
        })
    }

    if (isSubmitSuccessful) {
        return (
            <div>
                <h1>Form submitted successfully</h1>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <label>
                    Full Name
                    <input {...register("name", {required: "name is required"})} />
                </label>
                {errors.name && <p>{errors.name.message}</p>}
                <label>
                    Email
                    <input {...register("email", {required: "email is required"})} />
                </label>
                {errors.email && <p>{errors.email.message}</p>}
                <label>
                    Role
                    <select {...register("role", {required: "role is required"})}>
                        {ROLES.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </label>
                {errors.role && <p>{errors.role.message}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default HookForm