import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";

function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        secretPassword: "",
        totalGuests: "",
        favoriteCharacter: "",
        foodAllergies: false

    });

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        secretPassword: "",
        totalGuests: "",
        favoriteCharacter: "",
        foodAllergies: ""
    })

    const validate = (e) => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState, [e.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            });
    };

    const inputChange = e => {
        e.persist();
        validate(e);
            let value =
            e.target.type === "checkbox" ?
                e.target.checked : 
                e.target.value;
            setFormState({ ...formState, [e.target.name]: value});
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted!");
        axios 
            .post("https://reqres.in/api/users", formState)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor="email">
                Email
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={inputChange}
                />
            </label>
        </form>
    )
}

export default Form;