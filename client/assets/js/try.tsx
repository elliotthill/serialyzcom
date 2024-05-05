import React, {useState} from "react";


export function Try() {

    const [roleSearch, setRoleSearch] = useState('');

    return (
        <div>
            <h3>Try this tool out!</h3>
            <div className="container mx-auto py-12">
                <h1 className="font-bold text-3xl text-center text-slate-800 pb-4 px-4">
                    Test Drive Serialyzr
                </h1>
                <h3 className="font-medium text-xl text-center text-slate-600 px-4">
                    Just enter a URL and hit GO!
                </h3>
            </div>
            <div className="">
                <form className="flex items-center max-w-screen-xl mx-auto px-24">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative basis-4/5">
                        <input type="text" id="simple-search"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-l-lg
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-700"
                               placeholder="http://mydomain.com" required/>
                    </div>
                    <div className="relative basis-1/5">
                        <button type="submit"
                                className="py-3 px-10 text-lg font-medium text-white bg-blue-700 border rounded-r-lg
                            border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
