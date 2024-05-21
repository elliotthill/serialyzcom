"use server"
import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import {Progress} from "flowbite-react"
import {Codeblock} from "./components/codeblock.js"
import {type TestDrive} from "./app.js"

export function ViewTestDrive() {
    const [testDrive, setTestDrive] = useState<TestDrive | undefined>(undefined)

    let {id} = useParams()
    useEffect(() => {
        fetch(`/api/test-drive/${id}`)
            .then(response => response.json())
            .then((data: TestDrive) => {
                setTestDrive(data)
            })
            .catch(error => console.error(error))
    }, [])

    if (testDrive)
        return (
            <section className="w-full py-4" suppressHydrationWarning={true}>
                <div className="float-left w-1/2">
                    <h5 className="text-center font-medium text-lg pb-4">Source</h5>
                    <div className="w-full p-2">
                        <img
                            loading="lazy"
                            src={`https://serialyzr.s3.amazonaws.com/screenshots/${testDrive.id}.jpg`}
                        />
                    </div>
                </div>
                <div className="float-left w-1/2">
                    <h5 className="text-center font-medium text-lg pb-4">Serialyz Output</h5>
                    <div className="w-full p-2 overflow-y-scroll max-h-[800px]">
                        <Codeblock code={testDrive.debug} lang="JSON" />
                        <Codeblock code={testDrive.structure} lang="JSON" />
                    </div>
                </div>
            </section>
        )
    else return <>Loading... w</>
}
