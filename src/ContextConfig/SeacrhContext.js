

import React from 'react'
import { createContext } from "react"

export const SeacrhContext = createContext({
    startDate: new Date(),
    endDate: new Date
})

export const useSearchContextValue = () => {

    const [searchDate, setSearchDate] = React.useState({
        startDate: new Date(),
        endDate: new Date
    })

    return {
        searchDate,
        setSearchDate
    }

}