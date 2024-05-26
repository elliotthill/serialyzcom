"use client"

import React, {FormEvent, FormEventHandler, useEffect, useState} from "react"
import {Progress} from "flowbite-react"
import {Codeblock} from "./components/codeblock.js"
import Loading from "./components/loading.js"

export function TestDrive() {
    const [progress, setProgress] = useState(0)
    const [url, setURL] = useState<string | null>(null)
    const [urlError, setURLError] = useState<string | null>(null)

    const [output, setOutput] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [jobImage, setJobImage] = useState<string | null>(null)

    const submitUrl = async (e: FormEvent) => {
        e.preventDefault()
        setURLError(null)

        if (submitting) return

        try {
            new URL(url!)
        } catch (e) {
            setURLError("Please provide a valid URL")
            return
        }

        setSubmitting(true)
        let pb = progressBar()

        const response = await fetch("/api/test-drive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url})
        }).catch(e => {
            setProgress(0)
            clearInterval(pb)
            setSubmitting(false)
            setURLError(e)
            return e
        })

        const json = await response.json()

        if (response.status !== 200) {
            setProgress(0)
            clearInterval(pb)
            setSubmitting(false)
            setURLError(json.error ? json.error : "Our crawler experienced a problem with this URL")
            return
        }

        if (json) setOutput(JSON.stringify(json, null, 2))
        console.log(response)
        setSubmitting(false)

        //Clear UI
        setProgress(0)
        clearInterval(pb)

        //Show the jobImage
        setTimeout(() => {
            setJobImage(`https://serialyzr.s3.amazonaws.com/screenshots/${json.id}.jpg`)
        }, 5000)
    }

    const progressBar = () => {
        console.log("Progress bar")
        let progressRun = 0
        let progressInt = setInterval(() => {
            progressRun++
            setProgress(prevState => prevState + 1)
            if (progressRun > 99) clearInterval(progressInt)
        }, 50)
        return progressInt
    }

    useEffect(() => {
        //Load other locations for this job
        fetch("/api/jobs/locations")
            .then(response => response.json())
            .then(data => {
                setAllLocationOptions(LocationOptions.concat(data))
            })
            .catch(error => console.error(error))
    }, [])

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
                    <form className="flex items-center max-w-screen-xl mx-auto lg:px-64" onSubmit={submitUrl}>
                        <div className="relative basis-4/5">
                            <label htmlFor="simple-search" className="sr-only">
                                URL input
                            </label>
                            <input
                                type="url"
                                id="simple-search"
                                onChange={event => {
                                    setURL(event.target.value)
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-l-lg
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-700"
                                placeholder="http://mydomain.com"
                                required
                            />
                            <span className="absolute mt-2 text-md text-red-500">{urlError}</span>
                        </div>
                        <div className="relative basis-1/5">
                            <button
                                type="submit"
                                onClick={submitUrl}
                                className="w-full py-3 px-10 text-xl font-medium text-white bg-primary-600 border rounded-r-lg
                            border-primary-700 hover:bg-primary-700 focus:ring-1 focus:outline-none focus:ring-blue-300"
                            >
                                <span className={submitting ? "hidden" : ""}>Go</span>
                                <Loading loading={submitting} size="md" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="w-full" suppressHydrationWarning={true}>
                <div className="w-full mx-auto lg:px-64 py-6">
                    <Progress progress={progress} />
                </div>
                <div className={output ? "py-12 w-full" : "hidden"}>
                    <div className="float-left w-1/2">
                        <h5 className="text-center font-medium text-lg pb-12">Source</h5>
                        <div className="w-full p-2">
                            <img src={jobImage ? jobImage : ""} />
                            <div className={jobImage ? "hidden" : ""}>
                                <div role="status" className="space-y-8 animate-pulse">
                                    <div className="flex items-center justify-center w-full h-96 bg-gray-400 rounded">
                                        <svg
                                            className="w-full h-10 text-gray-200"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 18"
                                        >
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="float-left w-1/2">
                        <h5 className="text-center font-medium text-lg pb-12">Serialyz Output</h5>
                        <div className="w-full p-2">
                            <Codeblock code={output} lang="JSON" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
