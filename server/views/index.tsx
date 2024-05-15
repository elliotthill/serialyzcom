import React from "react"
import TestDriveThumbnails from "./components/test_drive_thumbnail.js"
import { Comparison } from "./components/comparison.js"
import { HowItWorks } from "./components/how_it_works.js"
function App({ data }: { data: any }) {
    return (
        <>
            <div className="bg-slate-200 px-20 py-12 pb-12">
                <h1 className="font-bold text-2xl md:text-5xl text-center text-slate-800 pb-4 px-4">
                    Access the web as a JSON document
                </h1>
                <h3 className="font-medium text-xl text-center text-slate-600 pb-8">
                    Powered by rugged visual cue detection algorithm.
                </h3>
                <p>This is some more info</p>
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

            <section className="bg-slate-300 lg:px-32 xl:px-52 p-16">
                <Comparison />
                <a className="underline text-right float-right" href="#how-it-works">
                    How does it work?
                </a>
            </section>
            <section className="bg-slate-200">
                <h3 className="font-medium text-xl text-center text-slate-600 pb-4 pt-16">Popular Test Drives:</h3>
                <TestDriveThumbnails testDrives={data.testDrives} />
            </section>
            <section id="how-it-works mx-auto" className="px-32">
                <h3 className="font-medium text-xl text-center text-slate-600 pb-4 pt-16">How it works:</h3>
                <HowItWorks />
            </section>
        </>
    )
}

export default App
