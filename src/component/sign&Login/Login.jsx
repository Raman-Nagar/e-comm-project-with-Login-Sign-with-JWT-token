import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const [data, setData] = useState({ eml: '', pass: '' });

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
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    })
    const handleLogin = () => {
        const { eml, pass } = data
        if (!eml || !pass) {
            alert("please fill all detial")
        }
        else {
            let dataObj = {
                email: eml,
                password: pass
            }
            axios.post('http://127.0.0.1:4000/login', dataObj).then((resp) => {
                console.log(resp.data)
                if (resp.data.authToken) {
                    localStorage.setItem("user", JSON.stringify(resp.data.result));
                    localStorage.setItem("token", JSON.stringify(resp.data.authToken));
                    alert("Login Successfully....")
                    navigate("/")
                } else {
                    console.log("user not found")
                }
            })
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center text-center'>
                <div className='col-4 bg-primary p-5 rounded'>

                    <input className="form-control" type="email" value={data.eml} onChange={HandleInp} name='eml' placeholder='Enter Email' /><br /><br />
                    <input className="form-control" type="password" value={data.pass} onChange={HandleInp} name='pass' placeholder='Enter Password' /><br /><br />
                    <button className='btn btn-light col-3' onClick={(e) => handleLogin(e)}>Login</button>
                </div>
            </div>
        </div>
    )
}