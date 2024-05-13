import React from "react"
import {Codeblock} from "./codeblock.js"
import {timeAgo} from "../utils/time.js"
import {Button} from "flowbite-react"

export default function TestDriveThumbnail({testDrives}) {
    return (
        <>
            {testDrives.map(testDrive => {
                return (
                    <div className="w-full px-8 py-4 my-12 bg-gray-100 rounded-lg shadow-md" key={testDrive.id}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-light text-gray-600">
                                <b className="font-bold">Test Drive</b> {testDrive.url}
                            </span>
                            <span className="float-right text-sm font-light text-gray-600">
                                Anonymous User, {timeAgo(testDrive.completed)}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 divide-x-[5px] py-4">
                            <div className="pr-6">
                                <img src={`https://serialyzr.s3.amazonaws.com/screenshots/${testDrive.id}.jpg`} />
                                <span className="text-sm text-right float-right pt-2">URL screenshot</span>
                            </div>
                            <div className="pl-6">
                                <Codeblock code={testDrive.structure} lang="JSON" />
                                <span className="text-sm text-right float-right pt-2">
                                    Structured data extracted -{" "}
                                    <a href={`/try/${testDrive.id}`} className="underline">
                                        view full{" "}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="inline w-4 h-4"
                                        >
                                            <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                                            <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
