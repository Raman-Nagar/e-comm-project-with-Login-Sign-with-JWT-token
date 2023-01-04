import React, { useState } from 'react'

export default function AddProduct() {

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
    const handleSubmit = () => {
        console.log(data)
        const { name, price, category, company } = data

        if (!name || !price || !category || !company) {
            alert("please fill all detial")
        }
        else {
            const userid = JSON.parse(localStorage.getItem("user"))._id;

            fetch('http://127.0.0.1:4000/add-product', {
                method: 'post',
                body: JSON.stringify({ name, price, category, company, userid }),
                headers: {
                    "Content-Type":"application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
                .then(resp => {
                    console.log(resp)
                    alert("User Created Successfully...!!!")
                }).catch(err => console.log(`error he ${err}`))

            setData({ name: '', price: '', category: '', company: '' });
        }
    }
    return (
        <div>

            <div className='row justify-content-center text-center'>
                <div className='col-4 bg-primary p-5 rounded'>

                    <input className="form-control" type="text" value={data.name} onChange={HandleInp} name='name' placeholder='product name' /><br /><br />
                    <input className="form-control" type="text" value={data.price} onChange={HandleInp} name='price' placeholder='product price' /><br /><br />
                    <input className="form-control" type="text" value={data.category} onChange={HandleInp} name='category' placeholder='product category' /><br /><br />
                    <input className="form-control" type="text" value={data.company} onChange={HandleInp} name='company' placeholder='product company' /><br /><br />
                    <button className='btn btn-success' onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
        </div>
    )
}