import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const navigate = useNavigate();

    const [data, setData] = useState({ user: '', eml: '', pass: '', mobile: '' });

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    })
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
    function handleSubmit(e) {
        console.log(data)
        const { user, pass, eml, mobile } = data

        if (!user || !pass || !eml || !mobile) {
            alert("please fill all detial")
        }
        else if (!eml.includes("@") || !eml.includes(".")) {
            alert("please fill valid email")
        }
        else if (pass.length < 6) {
            alert("please fill valid password")
        }
        else if (mobile.length < 10 || mobile.length > 10 || isNaN(mobile)) {
            alert("please fill valid mobile")
        }
        else {
            e.preventDefault();
            let dataObj = {
                name: user,
                email: eml,
                password: pass,
                mobile: mobile
            }
            axios.post('http://127.0.0.1:4000/signup', dataObj)
                .then(resp => {
                    console.log(resp.data)
                    localStorage.setItem('user', JSON.stringify(resp.data.result))
                    localStorage.setItem('token', JSON.stringify(resp.data.authToken))
                    alert("User Created Successfully...!!!")
                    navigate("/")
                })
                .catch(err => console.log(`error he ${err}`))

            setData({ user: '', eml: '', pass: '', mobile: '' });
        }
    }
    return (
        <div>
            <div className='row justify-content-center text-center'>
                <div className='col-4 bg-primary p-5 rounded'>
                    <form onSubmit={handleSubmit} action="http://127.0.0.1:5000/user" method='post'>

                        <input className="form-control" type="text" value={data.user} onChange={HandleInp} name='user' placeholder='Enter Userid' /><br /><br />
                        <input className="form-control" type="email" value={data.eml} onChange={HandleInp} name='eml' placeholder='Enter Email' /><br /><br />
                        <input className="form-control" type="password" value={data.pass} onChange={HandleInp} name='pass' placeholder='Enter Password' /><br /><br />
                        <input className="form-control" type="text" value={data.mobile} onChange={HandleInp} name='mobile' placeholder='Enter Mobile' /><br /><br />
                        <button className='btn btn-success' type='submit'>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}