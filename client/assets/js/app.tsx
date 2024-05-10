import React from "react"
import {Codeblock} from "./components/codeblock.js"

const htmlExample = `
<html>
    <head>
        ...
    </head>
    <body>
        ...

    </body>
</html>`
const jsonExample = `
[
    {
        title: "Murray's game-winner",
        content: [
            "[Highlight] Jamal Murray with the go..", "r/nba"
        ],
    },
    {
        title: "Paramount CEO is out",
        content: [
            "Bob Bakish Officialy Ousted as Para...", "r/movies",
        ],
    },
    {
        title: "Scooby-Doo",
        content: [
            "'Scooby-Doo' Live-Action..", "r/television",
        ],
    },
    {
        title: "What's something you think is totally normal in the UK but surprises people not from the country because it's mainly a UK thingy?",
        content: [
            "What's something ...", "r/AskUK", "•", "I'll go first: Electric kettles, train ticket prices..."
        ],
    },

    ...

]

`

function App({data}: {data: any}) {
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
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium text-xl rounded-lg text-sm mx-4 px-4 py-2 text-center"
                        href="/try"
                    >
                        Test Drive!
                    </a>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="w-2/5 h12">
                    <h3 className="text-2xl font-medium pb-4 text-center">Unstructured Data</h3>
                    <Codeblock code={htmlExample} lang="HTML" />
                    <br />
                    <img src="/assets/images/reddit.jpg" />
                </div>
                <div className="w-1/5 h12 text-2xl text-center">{"==>"}</div>
                <div className="w-2/5 h12">
                    <h3 className="text-2xl font-medium pb-4 text-center">Structured Data</h3>
                    <Codeblock code={jsonExample} lang="JSON" />
                </div>
            </div>
        </>
    )
}

export default App
