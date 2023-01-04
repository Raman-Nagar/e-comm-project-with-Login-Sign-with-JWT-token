import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        fetch('http://127.0.0.1:4000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(resp => resp.json())
            .then(resp => {
                setProducts(resp);
            })
    }
    const deleteProduct = async (e) => {
        let result = await axios.delete(`http://127.0.0.1:4000/product/${e}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        if (result) {
            getData();
        }
    }
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await axios.get(`http://127.0.0.1:4000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            if (result) {
                setProducts(result.data)
            }
        }
        else {
            getData();
        }
    }
    return (
        <div className='container text-center'>

            <div className='row text-center bg-primary text-light'>
                <h1> TotalList</h1>
            </div>
            <input type={"text"} className="form-control m-auto my-3" onChange={(e) => searchHandle(e)} placeholder="search product by : - name / category / company" />
            <table className='table'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>category</th>
                        <th>company</th>
                        <th>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ? products.map((product, i) => {
                            return (
                                <tr key={i}>
                                    <td>{product.name} </td>
                                    <td>$ {product.price} </td>
                                    <td>{product.category} </td>
                                    <td>{product.company} </td>
                                    <td><button onClick={() => deleteProduct(product._id)} >delet</button> <Link className='text-dark' to={"update/" + product._id}>Update</Link> </td>
                                </tr>
                            )
                        }) : <tr><td><h1>no result found</h1></td></tr>
                    }
                </tbody>
            </table>

        </div>
    )
}