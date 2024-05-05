import React, {useState} from "react";


export function Try() {

    const [roleSearch, setRoleSearch] = useState('');

    return (
            <div>
            <h3>Try this tool out!</h3>

            <div className="flex flex-col lg:flex-row py-0">

                <div className="basis-3/3 lg:basis-2/3">
                    Role / Company / Tech Search
                    <div className="w-full">
                        <input name="myInput" value={roleSearch} placeholder="'Python' or 'Devops' or 'AWS'..." autoComplete="off"
                        onChange={(e) => {setRoleSearch(e.target.value)}}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text-xl"/>
                    </div>
                </div>

            </div>
            </div>
    );
}
