
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, useNavigate } from "react-router-dom";
import { baseUrl } from "../Registeration";

let pageNumber: any = []
export default function Paginate() {
    const [data, setdata] = useState([])
    const [Pno, setPno] = useState(1)
    const [limit, setlimit] = useState(12)
    const navigate = useNavigate()
    useEffect(() => {

        if (localStorage.getItem('user')) {
            axios.get(`${baseUrl}v1/Geolocation/GetStateListByPaging?pageNumber=${Pno}&pageSize=${limit}`)
                .then(async res => {
                    console.log(res)
                    setdata(res.data.data.data)
                    if (Pno > res.data.data.totalPages) {
                        setPno(res.data.data.totalPages)
                    }
                    GetPagenumbers(res.data.data.totalPages);
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            alert('Login first!')
            navigate('/login')
        }
    }, [Pno, limit])
    const GetPagenumbers = (totalPages: number) => {
        pageNumber = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumber.push(
                <button type="button" className="page" onClick={() => setPno(i)}> {i}</button>
            )
        }
    }
    const logout = () => {
        localStorage.setItem('user', "")
        navigate('/login')
    }
    return (<>
        <div className="tabdata">
            <tr>
                <th>
                    name
                </th>
                <th>
                    Country
                </th>
                <th>
                    IsActive (state Status)
                </th>
            </tr>
            {data !== null && data.map((item: any) => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.countryName}</td>
                        <td>{item.isActive ? 'Active' : 'InActive'}</td>
                    </tr>
                )
            })}
        </div>
        Page Limit: <input type="number" onChange={e => {
            setlimit(parseInt(e.target.value))
        }} value={limit} />
        <div className="flex">{pageNumber}</div>
        <button type="button" onClick={() => logout()}>Logout</button>
    </>
    )
}