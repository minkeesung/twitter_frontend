import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const SessionContext = createContext() 

const SessionProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios
         .get("http://localhost:3001/api/logged_in", { withCredentials: true })
         .then(resp => {
             if (resp.data.logged_in && !user) {
                 setUser(resp.data.user)
             } else if (!resp.data.logged_in && user) {
                 setUser(null)
             }

         })
    }, [])

    return (
        <SessionContext.Provider value={{user}}>
         {children}
         </SessionContext.Provider>
    )
}

export default SessionProvider