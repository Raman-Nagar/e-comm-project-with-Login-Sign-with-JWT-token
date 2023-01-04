import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function Update() {

    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState({ name: '', price: '', category: '', company: '' });

    const HandleInp = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setData((predata) => {
            return {
                ...predata,
                [name]: value
            }
        });
    }
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get(`http://127.0.0.1:4000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
            .then(resp => {
                const { name, price, category, company } = resp.data;
                setData({ name, price, category, company })
            })
    }
    function handleSubmit() {
        const { name, price, category, company } = data
        fetch(`http://127.0.0.1:4000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(resp => {
            console.log(resp)
            alert("User Updated Successfully...!!!")
            navigate(-1);
        }).catch(err => console.log(err))
    }

    return (

        <div className='container'>
            <div className='row justify-content-center text-center'>
                <div className='col-4 bg-primary p-5 rounded'>

                    <input className="form-control" type="text" value={data.name} onChange={HandleInp} name='name' placeholder='product name' />
                    <br /><br />
                    <input className="form-control" type="text" value={data.price} onChange={HandleInp} name='price' placeholder='product price' />
                    <br /><br />
                    <input className="form-control" type="text" value={data.category} onChange={HandleInp} name='category' placeholder='product category' />
                    <br /><br />
                    <input className="form-control" type="text" value={data.company} onChange={HandleInp} name='company' placeholder='product company' />
                    <br /><br />
                    <button className='btn btn-success' onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
        </div>
    )
}