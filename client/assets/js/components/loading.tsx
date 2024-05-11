import React from "react"

import {Spinner} from "flowbite-react"

export default function loading({loading, size = "xl"}: {loading: boolean; size: string}) {
    if (loading) {
        return (
            <div className="text-center block w-full">
                <Spinner aria-label="Default status example" size={size} />
            </div>
        )
    }
}
