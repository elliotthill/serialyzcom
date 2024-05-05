
import React from "react";


export function Try() {


    return (
            <div>
            <h3>Try this tool out!</h3>

            <div className="flex flex-col lg:flex-row py-0">

                <div className="basis-3/3 lg:basis-2/3">
                    Role / Company / Tech Search
                    <div className="w-full">
                        <input name="myInput" placeholder="'Python' or 'Devops' or 'AWS'..." autoComplete="off"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text-xl"/>
                    </div>
                </div>

            </div>
            </div>
    );
}
