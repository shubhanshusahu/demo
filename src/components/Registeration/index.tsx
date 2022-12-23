import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
export function SmallInputdesign(props: any) {
    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
                {props.children}
            </div>
        </div>
    )

}

export const baseUrl = 'http://apicouture.nubiz.co.in/api/';
export default function Register() {
const navigate= useNavigate()
    const { register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            "firstName": "",
            "lastName": "",
            "email": "",
            "phoneNumber": "",
            "userName": "",
            "password": "",
            "confirmPassword": ""
        }
    });

    const Create = async (data: any) => {
        console.log(data)
        try {
            axios.get(`${baseUrl}identity/ValidateEmailId?emailId=${data.email}`)
                .then(function (response: any) {
                    if (response.data.failed)
                        alert(response.data.message)
                    else {
                        axios.get(`${baseUrl}identity/ValidateContactNo?contactNo=${data.phoneNumber}`)
                            .then(res => {
                                console.log(res)
                                if (res.data.failed)
                                    alert(res.data.message)
                                else {
                                    axios.post(`${baseUrl}identity/register`, data,
                                        { headers: { 'accept': 'application/json', 'Content-Type': 'application/json' } })
                                        .then(respo => {
                                            alert(respo.data.message)
                                            console.log(respo)
                                        }).catch(e => {
                                            console.log(e)
                                            alert(e.response.data.Message)
                                        })
                                }
                            })
                    }

                })

                .catch(function (error: any) {
                    console.log(error);

                });
        }
        catch (e) {
            console.log(e)
        }
    };


    const checkRegisteration = () => {

navigate('/login')

    }

    return (
        <form onSubmit={handleSubmit(Create)}>

            <div className="row gutters">

                <SmallInputdesign>
                    <label>First Name</label>
                    <input className="form-control" id="education" placeholder="First Name..."
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: 'First name is required'
                            }
                        })} />
                    {errors.firstName && <span className='errormsg'>{errors.firstName.message || 'not validated'}</span>}
                </SmallInputdesign>
                <SmallInputdesign>
                    <label > Last Name</label>
                    <input type="text" {...register("lastName")}
                        className="form-control" id="education" placeholder="Last Name..." />
                </SmallInputdesign>

                <SmallInputdesign>

                    <label >Mobile Number</label>
                    <input className="form-control" placeholder="Mobile Number" type="number"
                        {...register("phoneNumber", {
                            required: {
                                value: true,
                                message: 'Phone number is required'
                            }, maxLength: {
                                value: 10,
                                message: 'Longer than 10'
                            }, minLength: {
                                value: 10,
                                message: "shorter than 10"
                            }
                        })} />
                    {errors.phoneNumber && <div className='errormsg'>{errors.phoneNumber.message}</div>}
                </SmallInputdesign>

                <SmallInputdesign>
                    <label >Email ID</label>
                    <input className="form-control" placeholder="Email ID"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            }, pattern: {
                                value: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{3,10}/, //email pattern
                                message: "Entered value does not match email format"
                            }
                        })} />
                    {errors.email && <span className='errormsg'>{errors.email.message}</span>}
                </SmallInputdesign>

                <SmallInputdesign>
                    <label > UserName</label>
                    <input type="text" {...register("userName", {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }, minLength: {
                            value:6,
                            message:'Expected 6 characters'
                        }
                    })}
                        className="form-control" id="education" placeholder="Username..." />
                    {errors.userName && <span className='errormsg'>{errors.userName.message}</span>}
                </SmallInputdesign>
                <SmallInputdesign>
                    <label > Password</label>
                    <input type="text" {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is required',
                        }
                        , pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            message: 'Atleast 1 Capital,Special sym and number'
                        },
                        minLength: {
                            value: 6,
                            message: 'short Password'
                        }
                    })}
                        className="form-control" id="education" placeholder="Password..." />
                    {errors.password && <span className='errormsg'>{errors.password.message}</span>}
                </SmallInputdesign>
                <SmallInputdesign>
                    <label > Confirm Password</label>
                    <input type="text" {...register("confirmPassword", {
                        required: true, validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        }
                    })}
                        className="form-control" id="education" placeholder="Confirm Password..." />
                    {errors.confirmPassword && <span className='errormsg'>{errors.confirmPassword.message}</span>}
                </SmallInputdesign>


                <div className="">
                    <div className="col-sm-12 col-md-12 col-xs-12 text-right">
                        <div className="text-right classrgsetting" style={{ float: 'right', textAlign: 'right' }}>

                            <button type="submit" className="btn btn-primary btnsubmitdetails">  Submit </button>
                            <button type="button" onClick={() => reset()} className="btn btn-success btnsx">  Reset </button>
                            <button type="button" onClick={() => checkRegisteration()} className="btn btn-success btnsx">  Go to Login </button>

                            {/* <button type='button' onClick={() => navigate(-1)} className="btn btn-success btnbackresult">Back</button> */}
                            {/* <button type="submit" className="btn btn-primary btn-lg btn-block">Submit </button> */}
                        </div>

                    </div>

                </div>


            </div>
        </form>
    )
}
