import React from "react"
import {Codeblock} from "./codeblock.js"
import {timeAgo} from "../utils/time.js"
import {Button} from "flowbite-react"

export default function TestDriveThumbnail({testDrives}) {
    return (
        <>
            {testDrives.map(testDrive => {
                return (
                    <div className="md:px-4 lg:px-20 xl:px-40" key={testDrive.id}>
                        <div className="w-full px-8 py-4 my-12 bg-gray-100 bg-slate-300 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-light text-gray-600">
                                    <b className="font-bold">Test Drive</b> {testDrive.url}
                                </span>
                                <span className="float-right text-lg font-light text-gray-600">
                                    Anonymous User, {timeAgo(testDrive.completed)}
                                </span>
                            </div>
                            <div className="flex py-4">
                                <div className="flex-none w-5/12 pr-6 overflow-y-hidden max-h-60">
                                    <a href={`/test-drive/${testDrive.id}`}>
                                        <img
                                            className="inline-block w-full "
                                            loading="lazy"
                                            src={`https://serialyzr.s3.amazonaws.com/screenshots/${testDrive.id}.jpg`}
                                        />

                                        <div className="text-sm text-left float-left pt-2 block clear-both">
                                            URL screenshot
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-none w-1/12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="stroke-grey-700 size-16 float-right mt-16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-none w-6/12 pl-6">
                                    <a href={`/test-drive/${testDrive.id}`}>
                                        <Codeblock code={testDrive.structure} lang="JSON" />
                                    </a>
                                    <span className="text-sm text-right float-right pt-2">
                                        Structured data extracted -{" "}
                                        <a href={`/test-drive/${testDrive.id}`} className="underline">
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
                    </div>
                )
            })}
        </>
    )
}
