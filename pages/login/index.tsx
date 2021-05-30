import {useEffect, useState} from "react"
import Router from "next/router";
import { useAuth } from "../../context/AuthContext"

const Login = () => {
    const [formInput, setFormInput] = useState({email: '', password: ''})
    const { user, login } = useAuth()

    const signIn = (e: any) => {
        e.preventDefault()

        if (formInput) {
            if (login(formInput.email, formInput.password)) {
                //todo: show success notifocation
            } else {
                console.log('invalid data')
            }
        } else {
            console.log('fill fields')
        }
    }

    const updateFormInput = (e: any) => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        if (user) {
            Router.replace("/");
        }
    }, [user]);

    return (
        <div className="w-full max-w-xs mx-auto pt-6 pb-3">
            <span className="flex">
                Email: corene88@example.net
            </span>
            <span className="pb-3 flex">
                Psw: password
            </span>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={updateFormInput}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" name="email" type="text" placeholder="Email" autoComplete={'off'} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        onChange={updateFormInput}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" name="password" type="password" autoComplete={'off'} />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={signIn}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

Login.title = 'Login'

export default Login