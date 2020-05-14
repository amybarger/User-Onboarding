import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Must provide your name"),
    email: yup
        .string()
        .email("Must provide a valid email address: name@email.com")
        .required("Must include email address"),
    secretPassword: yup
        .string()
        .required("Must provide the secret password given in your invite to attend"),
    totalGuests: yup
        .string()
        .required("Must provide total guests you plan to bring. Limit 4 per party."),
    favoriteCharacter: yup
        .string()
        .required("Please tell us your favorite character. If is not Louise, you may not make it home (note: this was not hacked by Louise)."),
    notice: yup
        .boolean()
        .oneOf([true], "To attend, you must check this box to verify that if any of the Belcher children ruin this ball in anyway that you won't sue us. Thank you.")
});

const Form = () =>{
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted!");
     axios 
        .post("https://reqres.in/api/users", formState)
        .then(response => console.log(response))
        .catch(err => console.log(err));
};

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
});

const inputChange = (e) => {
    e.persist()
    validate(e);
            let value =
            e.target.type === "checkbox" ?
                e.target.checked : 
                e.target.value;
            setFormState({ ...formState, [e.target.name]: e.target.value});
;}

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
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
                });
            });
        };

    return (
    <div>
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={inputChange}
                    required
                />
                {errorState.name.length > 0 ? (
                    <p className="error">
                    {errorState.name}
                </p> ): null}
            </label>
            <label htmlFor="email">
                Email
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={inputChange}
                    required
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
                    required
                />
                {errorState.secretPassword.length > 0 ? (
                    <p className="error">
                    {errorState.secretPassword}
                </p> ): null}
            </label> 
            <label htmlFor="totalGuests">
                Total Guests
                <input 
                    type="name"
                    name="totalGuests"
                    id="totalGuests"
                    value={formState.totalGuests}
                    onChange={inputChange}
                    required  
                />
                {errorState.totalGuests.length > 0 ? (
                    <p className="error">
                    {errorState.totalGuests}
                </p> ): null}
            </label>
            <label htmlFor="favoriteCharacter">
                Favorite Character
                <input 
                    type="name"
                    name="favoriteCharacter"
                    id="favoriteCharacter"
                    value={formState.favoriteCharacter}
                    onChange={inputChange}
                    required
                />
                {errorState.favoriteCharacter.length > 0 ? (
                    <p className="error">
                    {errorState.favoriteCharacter}
                </p> ): null}
            </label>
            <label htmlFor="notice">
                <input 
                    type="checkbox"
                    id="notice"
                    name="notice"
                    checked={formState.terms}
                    onChange={inputChange}
                    required
                />
                {errorState.notice.length > 0 ? (
                    <p className="error">
                    {errorState.notice}
                </p> ): null}
                Notice
            </label>
            <button>Submit</button>    
        </form>  
    </div>
    )
};

export default Form;