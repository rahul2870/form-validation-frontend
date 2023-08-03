import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculateAge, DatePickerCMP, DropField, getCountries, InputField, InputFieldDisabled, RadioInput, SERVER_URI, useAccessToken } from '../commons';

export default function FrontedCMP() {
    const [formState, setFormState] = useState({});
    const [errors, setErrors] = useState({});
    const [countList, setCountList] = useState({});
    const submitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formDataObject = {};
        for (let [name, value] of formData.entries()) {
            formDataObject[name] = value;
        }

        try {
            await axios.post(`${SERVER_URI}/form`, { ...formDataObject, age: formState?.age });
            alert('Form submitted successfully!');
            window.location.reload();
        } catch (err) {
            const errorObject = {};
            console.log("error ::: ", err)
            if (err.response.data && err.response.data?.errors) {
                err.response.data.errors.forEach((error) => {
                    errorObject[error.path] = error.msg;
                });
                setErrors(errorObject);
            }

        }
    };

    const onChangeHandler = async (event) => {
        const { name, value } = event.target;
        if (name === "dob") {
            setFormState(_ => ({ ..._, age: `${calculateAge(value)} Year's   ` }))
        } else if (name === "country") {
            try {
                const { data } = await axios.post(`${SERVER_URI}/get-country-state-city`, { need: "state", value: value });
                setCountList(_ => ({ ..._, state: data }));
            } catch (error) {
                console.log("error")
            }
        } else if (name === "state") {
            try {
                const { data } = await axios.post(`${SERVER_URI}/get-country-state-city`, { need: "city", value: value });
                setCountList(_ => ({ ..._, city: data }))
            } catch (error) {
                console.log("error in fetching city.")
            }
        }
    };

    useEffect(() => {
        async function fetchCountries() {
            try {
                const { data } = await axios.post(`${SERVER_URI}/get-country-state-city`, { need: "country" });
                setCountList(_ => ({ ..._, country: data }))
            } catch (error) {
                console.log("error : ", error)
            }
        }

        fetchCountries();
    }, [])
    return <div>
        <div class="w-full max-w-md m-auto mt-10">
            <form onSubmit={submitHandler} onChange={onChangeHandler} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <InputField label="First Name" name="first_name" placeholder="Enter Your Name" errors={errors} key="name" />
                <InputField label="Last Name" name="last_name" placeholder="Enter Your Last Name" errors={errors} key="last_name" />
                <InputField label="Email" name="email" placeholder="Enter Your Email" key="email" errors={errors} />


                {errors?.state && <p className="text-red-700 capitalize">{errors?.["state"]}</p>}
                <DropField label="Select Country" name="country" options={countList?.country} placeholder="Select Country" errors={errors} />
                {countList?.state && <DropField label="Select State" name="state" options={countList?.state} placeholder="Select State" errors={errors} />}
                {countList?.city && <DropField label="Select City" name="city" options={countList?.city} placeholder="Select City" errors={errors} />}
                <RadioInput label="Gender" name="gender" options={["Male", "Female", "Others"]} errors={errors} />

                <DatePickerCMP label="Date Of Birth" name="dob" errors={errors} />

                <InputFieldDisabled label="Age" name="age" value={formState?.age} />
                <button class="bg-gray-700 text-white w-full py-3 mt-4" type="submit">Sumbit</button>
            </form>
        </div>

    </div>
}
