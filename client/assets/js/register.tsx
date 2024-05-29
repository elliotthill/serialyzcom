import React, {useEffect, useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import LoadingSpinner from "./components/loading.js"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [error, setError] = useState<boolean | string>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const navigate = useNavigate()

    async function submit() {
        const valid = validate()
        if (!valid || submitting) return

        setSubmitting(true)

        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!response!.ok) {
            const err = await response.json()

            setError(err.error)
            setSubmitting(false)
            return
        }
        setSubmitting(false)
        navigate(0)
    }

    function validate(): boolean {
        if (email === "") {
            setError("Please provide an email")
            return false
        }

        if (password === "" || retypePassword === "") {
            setError("Please type both password fields")
            return false
        }

        if (password !== retypePassword) {
            setError("Passwords do not match")
            return false
        }

        setError(false)
        return true
    }

    useEffect(() => {
        //setError(false);
        //validate();
    }, [email, password, retypePassword])

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        submit()
    }

    return (
        <>
            <section className="py-24">
                <div
                    className={
                        submitting
                            ? "flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 group"
                            : "hidden"
                    }
                >
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-12 py-12">
                        <LoadingSpinner loading={submitting} />
                    </div>
                </div>

                <div className={submitting ? "hidden" : ""}>
                    <form
                        className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 group"
                        noValidate
                        onSubmit={onFormSubmit}
                    >
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Register for an account
                                </h1>
                                <span className="mt-2 text-sm text-red-500">{error}</span>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            <span>Your email</span>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={email}
                                                autoFocus
                                                onChange={event => {
                                                    setEmail(event.target.value)
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900
                         invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500
                         sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 peer"
                                                placeholder="name@company.com"
                                                required
                                                autoComplete="off"
                                            />
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Please enter a valid email address
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            <span>Your password</span>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                pattern=".{7,}"
                                                onChange={event => {
                                                    setPassword(event.target.value)
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900
                         invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500
                         sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 peer"
                                                placeholder=""
                                                required
                                                autoComplete="off"
                                            />
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Password must be at least 7 characters in length
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="retypePassword"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            <span>Retype password</span>
                                            <input
                                                type="password"
                                                name="retypePassword"
                                                id="retypePassword"
                                                value={retypePassword}
                                                onChange={event => {
                                                    setRetypePassword(event.target.value)
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900
                         invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500
                         sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 peer"
                                                placeholder=""
                                                required
                                                autoComplete="off"
                                            />
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                font-medium rounded-md text-sm px-5 py-2.5 text-center group-invalid:pointer-events-none group-invalid:opacity-30"
                                        onClick={submit}
                                    >
                                        Sign in
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?
                                        <Link to="/login" className="font-medium text-primary-600 hover:underline mx-1">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
