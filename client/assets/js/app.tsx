import React, {Fragment, useEffect, useState} from "react"
import {Codeblock} from "./components/codeblock.js"

type TestDrive = {
    id: number
    url: string
    structure: string
    completed: string
}
function App({data}: {data: any}) {
    const [testDrives, setTestDrives] = useState<TestDrive[] | []>([])

    useEffect(() => {
        fetch(`/api/srv/latest-test-drives`)
            .then(response => response.json())
            .then((data: TestDrive[]) => {
                setTestDrives(data)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <div className="container mx-auto py-12 pb-24">
                <h1 className="font-bold text-2xl md:text-5xl text-center text-slate-800 pb-4 px-4">
                    Access the web as a JSON document
                </h1>
                <h3 className="font-medium text-xl text-center text-slate-600 pb-8">
                    Powered by rugged visual cue detection algorithm.
                </h3>
                <div className="text-center">
                    <a
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium text-xl rounded-lg text-sm mx-4 px-4 py-2 text-center"
                        href="/test-drive"
                    >
                        Test Drive!
                    </a>
                </div>
            </div>
            <Fragment>
                {testDrives!.map(testDrive => {
                    return (
                        <div className="flex mb-4" key={testDrive.id}>
                            <div className="w-2/5 h12">
                                <h3 className="text-2xl font-medium pb-4 text-center">Unstructured Data</h3>
                                <span>{testDrive.url}</span>
                                <br />
                                <img src={`https://serialyzr.s3.amazonaws.com/screenshots/${testDrive.id}.jpg`} />
                            </div>
                            <div className="w-1/5 h12 text-2xl text-center">{"==>"}</div>
                            <div className="w-2/5 h12">
                                <h3 className="text-2xl font-medium pb-4 text-center">Structured Data</h3>
                                <Codeblock code={testDrive.structure} lang="JSON" />
                            </div>
                        </div>
                    )
                })}
            </Fragment>
        </>
    )
}

export default App
