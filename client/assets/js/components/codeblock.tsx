"use client"
import React, { useState } from "react"
import { Button } from "flowbite-react"

export function Codeblock({ code, lang }: { code: string | null; lang: string }) {
    if (!code) return

    const [copied, setCopied] = useState<boolean>(false)
    const copyToClipboard = () => {
        console.log("Copy to clipboard")
        navigator.clipboard.writeText(code).then(result => {
            setCopied(true)
        })
    }

    return (
        <>
            <div className="w-full space-y-4">
                <div className="overflow-hidden shadow bg-grey-700 text-sm text-white rounded" data-testid="codeblock">
                    <header className="relative text-xs text-white/50 uppercase flex justify-between items-center p-2 pl-4">
                        <span className="codeblock-language text-base">{lang}</span>
                        <button className="absolute right-[15px] hover:text-gray-600" onClick={copyToClipboard}>
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </header>
                    <pre className="codeblock-pre text-xs whitespace-pre-wrap break-all p-4 pt-1">
                        <code className="codeblock-code language-html lineNumbers">{code}</code>
                    </pre>
                </div>
            </div>
        </>
    )
}
