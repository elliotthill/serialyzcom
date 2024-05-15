"use server"
import React from "react"
import {Progress} from "flowbite-react"
import {Codeblock} from "./components/codeblock.js"

export function ViewTestDrive({data}) {
    const testDrive = data.testDrive
    return (
        <section className="w-full py-4" suppressHydrationWarning={true}>
            <div className="float-left w-1/2">
                <h5 className="text-center font-medium text-lg pb-4">Source</h5>
                <div className="w-full p-2">
                    <img src={`https://serialyzr.s3.amazonaws.com/screenshots/${testDrive.id}.jpg`} />
                </div>
            </div>
            <div className="float-left w-1/2">
                <h5 className="text-center font-medium text-lg pb-4">Serialyz Output</h5>
                <div className="w-full p-2 overflow-y-scroll max-h-[800px]">
                    <Codeblock code={testDrive.structure} lang="JSON" />
                </div>
            </div>
        </section>
    )
}
