import React from "react"
import TestDriveThumbnails from "./components/test_drive_thumbnail.js"
import {Comparison} from "./components/comparison.js"
import {HowItWorks} from "./components/how_it_works.js"
import {Tests} from "./components/tests.js"
function App({data}: {data: any}) {
    return (
        <>
            <div className="bg-slate-200 dark:bg-gray-900 px-20 py-12 pb-12 my-4 xl:px-40">
                <h1 className="text-gradient-dark font-bold text-2xl md:text-5xl text-center text-slate-800 dark:text-gray-100 pb-4 px-4">
                    Web Page to JSON API
                </h1>

                <h3 className="font-medium text-xl text-center text-slate-600 pb-8">
                    So you can focus on your startup and not web scraping
                </h3>
                <div className="dark:text-slate-300 mx-auto md:w-full lg:w-6/12 text-justify pb-8 px-4"></div>
                <div className="text-center">
                    <a
                        className="text-white dark:text-slate-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium text-xl rounded-md mx-6 px-6 py-4 text-center shadow-md"
                        href="/test-drive"
                    >
                        Test Drive!
                    </a>
                </div>
            </div>

            <section className="px-20 xl:px-40">
                <div className="bg-slate-300 px-4 py-4">
                    <h3 className="text-center font-bold text-lg">Passing field tests: </h3>
                    <Tests name="youtube.com" />
                    <Tests name="amazon.com" />
                    <Tests name="reddit.com" />
                    <Tests name="indeed.com" />
                    <Tests name="boards.greenhouse.io" />
                    <Tests name="thisiswhyimbroke.com" />
                    <Tests name="jobs.netflix.com" />
                </div>
            </section>
            <section className="bg-slate-200 my-4">
                <h3 className="font-medium text-xl text-center text-slate-600 pt-16">Recent User Test Drives:</h3>
                <TestDriveThumbnails testDrives={data.testDrives} />
            </section>
            <section id="how-it-works" className="px-32 mx-auto"></section>
            <section className="lg:px-32 xl:px-52 p-16 block-gradient-light dark:block-gradient">
                <HowItWorks />
                <Comparison />
            </section>
        </>
    )
}

export default App
