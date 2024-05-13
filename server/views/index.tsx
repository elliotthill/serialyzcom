import React from "react"
import TestDriveThumbnails from "./components/test_drive_thumbnail.js"

function App({data}: {data: any}) {
    return (
        <>
            <div className="container mx-auto py-12 pb-12">
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
            <TestDriveThumbnails testDrives={data.testDrives} />
        </>
    )
}

export default App
