"use server"
import React from "react"
import {Progress} from "flowbite-react"

export function TestDrive({data}) {
    return (
        <div>
            <section>
                <div className="container mx-auto py-12">
                    <h1 className="font-bold text-3xl text-center text-slate-800 pb-4 px-4">Test Drive Serialyzr</h1>
                    <h3 className="font-medium text-xl text-center text-slate-600 px-4">
                        Just enter a URL and hit GO!
                    </h3>
                </div>
                <div>
                    <form className="flex items-center max-w-screen-xl mx-auto lg:px-64">
                        <label htmlFor="simple-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative basis-4/5">
                            <input
                                type="url"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-l-lg
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-700"
                                placeholder="http://mydomain.com"
                                required
                            />
                        </div>
                        <div className="relative basis-1/5">
                            <button
                                type="submit"
                                className="w-full py-3 px-10 text-xl font-medium text-white bg-primary-600 border rounded-r-lg
                            border-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Go
                                <span className="sr-only">Go</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section suppressHydrationWarning={true}>
                <div className="w-full mx-auto lg:px-64 py-12">
                    <Progress progress={0} color="dark" suppressHydrationWarning={true} />
                </div>
                <div className="flex flex-row py-12 hidden">
                    <div className="float-left w-1/2">
                        <h5 className="text-center font-medium text-lg pb-12">Source</h5>
                        <div className="w-full p-2"></div>
                    </div>
                    <div className="float-left w-1/2">
                        <h5 className="text-center font-medium text-lg pb-12">Serialyz Output</h5>
                        <div className="w-full p-2"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}
