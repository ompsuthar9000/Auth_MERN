import React, { useState } from 'react'
import { createContext } from 'react'


export const Context = createContext()

const AppContext = ({ children }) => {
    const [users , setUsers] = useState(null)
    return (
        <Context.Provider value={{users , setUsers}}>
            {children}
        </Context.Provider>
    )
}

export default AppContext