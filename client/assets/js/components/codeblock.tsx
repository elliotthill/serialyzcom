import React from 'react';

export function Codeblock({code, lang}: {code:string, lang:string}) {

    return (
        <>
            <div className="w-full space-y-4">
                <div className="overflow-hidden shadow bg-slate-700 text-sm text-white" data-testid="codeblock">
                    <header className="text-xs text-white/50 uppercase flex justify-between items-center p-2 pl-4">
                        <span className="codeblock-language">{lang}</span>
                    </header>
                    <pre className="codeblock-pre whitespace-pre-wrap break-all p-4 pt-1">
                        <code className="codeblock-code language-html lineNumbers">
                        {code}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    )

}
