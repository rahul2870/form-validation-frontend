import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URI } from '../commons';

export default function AllForms() {
    const [allForms, setAllForms] = useState(null)
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const { data } = await axios.post(`${SERVER_URI}/get-form`);
                setAllForms(data)
            } catch (error) {
                console.log("error : ", error)
                setAllForms(null)
            }
        }
        fetchAll()
    }, [])
    return <div className='m-10'>
        {!allForms ? <h1>No Form's Found!</h1> : <>{
            allForms?.map((form, idx) => {
                return <div className='shadow-lg inline-flex max-w-md p-4 flex-col cursor-pointer m-4 pr-20'>
                    <p className='font-bold'>{idx + 1}.)</p>
                    <div className='flex mt-4'>
                        <p className='font-bold'>Name : </p>
                        <p className='pl-4'>{form?.first_name}</p>
                    </div>
                    <div className='flex mt-4'>
                        <p className='font-bold'>Email : </p>
                        <p className='pl-4'>{form?.email}</p>
                    </div>
                    <div className='flex mt-4'>
                        <p className='font-bold'>{form?.city},</p>
                        <p className='font-bold'>{form?.state},</p>
                        <p className='font-bold'>{form?.country}</p>
                    </div>
                </div>
            })}</>}


 

    </div>
}
