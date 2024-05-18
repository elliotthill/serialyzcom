import React from "react"
import TestDriveThumbnails from "./components/test_drive_thumbnail.js"
import { Comparison } from "./components/comparison.js"
import { HowItWorks } from "./components/how_it_works.js"
function App({ data }: { data: any }) {
    return (
        <>
            <div className="bg-slate-200 dark:bg-gray-900 px-20 py-12 pb-12 my-4">
                <h1 className="font-bold text-2xl md:text-5xl text-center text-slate-800 dark:text-gray-100 pb-4 px-4">
                    Transform Web Pages into Structured Data
                </h1>

                <h3 className="font-medium text-xl text-center text-slate-600 pb-8">Test drive any URL!</h3>
                <div className="dark:text-slate-300 mx-auto md:w-full lg:w-6/12 text-justify pb-8 px-4">
                    Welcome to Serialyzr.com, your ultimate solution for converting web pages into structured data
                    effortlessly. Say goodbye to the challenges of traditional web scraping methods that break with
                    every minor change in CSS or HTML. With Serialyzr, you get a robust, reliable, and versatile tool
                    that delivers clean, structured data seamlessly.
                </div>
                <div className="text-center">
                    <a
                        className="text-white dark:text-slate-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium text-xl rounded-lg mx-6 px-6 py-4 text-center"
                        href="/test-drive"
                    >
                        Test Drive!
                    </a>
                </div>
            </div>

            <section className="lg:px-32 xl:px-52 p-16 block-gradient-light dark:block-gradient">
                <Comparison />
                <a className="underline text-right float-right" href="#how-it-works">
                    How does it work?
                </a>
            </section>
            <section className="bg-slate-200 my-4">
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
