import React from 'react';
import * as yup from "yup";
import axios from "axios";

function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        secretPassword: "",
        totalGuests: "",
        favoriteCharacter: "",
        allergies: false

    });

    const inputChange = e => {
        e.persist();
    }

    const formSubmit = () => {
        e.preventDefault();
        console.log("form submitted!");
        axios 
            .post("https://reqres.in/api/users", formState)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }
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