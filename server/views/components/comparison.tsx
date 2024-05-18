export function Comparison() {
    return (
        <div id="detailed-pricing" className="w-full mx-auto  shadow-md bg-gray-800 glass">
            <div className="overflow-hidden min-w-max">
                <div className="grid grid-cols-3 p-4 text-base font-medium text-gray-100 border-t border-b border-gray-600 gap-x-4">
                    <div className="flex items-center"></div>
                    <div>Traditional Webscraping</div>
                    <div>Serialyz</div>
                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-400 border-b border-slate-600 gap-x-4">
                    <div>General purpose?</div>
                    <div>
                        <RedCross />
                        <span className="m-2 text-red-500 inline">Bespoke per website</span>
                    </div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Designed to work on any website</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-400 border-b border-slate-600 gap-x-4">
                    <div>class/id/tag HTML changes?</div>
                    <div>
                        <RedCross />
                        <span className="m-2 text-red-500 inline">Breaks</span>
                    </div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Keeps working</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-400 border-b border-slate-600 gap-x-4">
                    <div>Source site structural changes?</div>
                    <div>
                        <RedCross />
                        <span className="m-2 text-red-500 inline">Breaks</span>
                    </div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Keeps working</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-400 border-b border-slate-600 gap-x-4">
                    <div>Setup and forget?</div>
                    <div>
                        <RedCross />
                        <span className="m-2 text-red-500 inline">No, maintenance and monitoring</span>
                    </div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Yes</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-400 border-b border-slate-600 gap-x-4">
                    <div>Easily transformable with AI?</div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Yes</span>
                    </div>
                    <div>
                        <GreenCross />
                        <span className="m-2 text-green-500 inline">Yes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function RedCross() {
    return (
        <svg
            className="w-3 h-3 text-red-500 inline"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
        </svg>
    )
}

export function GreenCross() {
    return (
        <svg
            className="w-3 h-3 text-green-500 inline"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5.917 5.724 10.5 15 1.5"
            />
        </svg>
    )
}
