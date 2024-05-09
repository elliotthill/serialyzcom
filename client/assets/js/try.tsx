'use client';

import React, {FormEvent, FormEventHandler, useState} from "react";
import { Progress } from "flowbite-react";
import {Codeblock} from './components/codeblock.js';

export function Try() {

    const [progress, setProgress] = useState(0);
    const [url, setURL] = useState<string|null>(null);
    const [urlError, setURLError] = useState<string|null>(null);


    const [output, setOutput] = useState<string|null>(null);

    const submitUrl = async (e: FormEvent) => {

        e.preventDefault();
        setURLError(null);

        try {
            const userURL = new URL(url!);
        } catch(e){
            setURLError("Please provide a valid URL")
            return;
        }
        console.log(url);

        const response = await fetch("/api/srv/try", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url})
        })


        const json = await response.json()
        if (json)
        setOutput(JSON.stringify(json, null, 2))
        console.log(response);
    }
    return (
        <div>
            <section>
                <div className="container mx-auto py-12">
                    <h1 className="font-bold text-3xl text-center text-slate-800 pb-4 px-4">
                        Test Drive Serialyzr
                    </h1>
                    <h3 className="font-medium text-xl text-center text-slate-600 px-4">
                        Just enter a URL and hit GO!
                    </h3>
                </div>
                <div>
                    <form className="flex items-center max-w-screen-xl mx-auto lg:px-64" onSubmit={submitUrl}>

                        <div className="relative basis-4/5">
                            <label htmlFor="simple-search" className="sr-only">URL input</label>
                            <input type="url" id="simple-search" onChange={(event) => {
                                setURL(event.target.value)
                            }}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-l-lg
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-700"
                                   placeholder="http://mydomain.com" required/>
                            <span
                                className="absolute mt-2 text-sm text-red-500">
                            {urlError}
                            </span>

                        </div>
                        <div className="relative basis-1/5">
                        <button type="submit" onClick={submitUrl}
                                    className="w-full py-3 px-10 text-xl font-medium text-white bg-primary-600 border rounded-r-lg
                            border-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300">

                                Go
                                <span className="sr-only">Go</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="w-full" suppressHydrationWarning={true}>
                <div className="w-full mx-auto lg:px-64">
                    <Progress progress={progress} color="dark" suppressHydrationWarning={true}/>
                </div>
                <div className="py-12 w-full">
                    <div className="float-left w-2/5">
                        <h5 className="text-center font-medium text-lg">Source</h5>


                    </div>
                    <div className="float-left w-1/5 text-center">
                        ={">"}
                    </div>
                    <div className="float-left w-2/5">
                        <h5 className="text-center font-medium text-lg">Output</h5>
                        <div className="w-full">
                            <Codeblock code={output} lang="JSON" />
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}
