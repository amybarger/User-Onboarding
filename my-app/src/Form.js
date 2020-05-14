import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Must provide your name"),
    email: yup
        .string()
        .email("Must provide a valid email address: name@email.com")
        .required("Must include email address"),
    secretPassword: yup.string().required("Must provide the secret password given in your invite to attend"),
    totalGuests: yup.string().required("Must provide total guests you plan to bring. Limit 4 per party."),
    favoriteCharacter: yup.string().required("Please tell us your favorite character. If is not Louise, you may not make it home (note: this was not hacked by Louise)."),
    notice: yup.boolean().oneOf([true], "To attend, you must check this box to verify that if any of the Belcher children ruin this ball in anyway that you won't sue us. Thank you.")
})

function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        secretPassword: "",
        totalGuests: "",
        favoriteCharacter: "",
        notice: false

    });

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        secretPassword: "",
        totalGuests: "",
        favoriteCharacter: "",
        notice: ""
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
                {errorState.email.length > 0 ? (
                    <p className="error">
                        {errorState.email}
                </p> ): null}
            </label>
            <label htmlFor="secretPassword">
                Secret password
                <input 
                    type="password"
                    name="secretPassword"
                    id="secretPassword"
                    value={formState.secretPassword}
                    onChange={inputChange}
                />
            </label> 
            <label htmlFor="totalGuests">
                Total Guests
                <input 
                    type="name"
                    name="totalGuests"
                    id="totalGuests"
                    value={formState.totalGuests}
                    onChange={inputChange}  
                />
            </label>
            <label htmlFor="favoriteCharacter">
                Favorite Character
                <input 
                    type="name"
                    name="favoriteCharacter"
                    id="favoriteCharacter"
                    value={formState.totalGuests}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor="notice">
                <input 
                    type="checkbox"
                    id="notice"
                    name="notice"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                Notice
            </label>
            <button>Submit</button>    
        </form>
    )
}

export default Form;