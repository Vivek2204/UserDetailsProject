import React, { createContext, useEffect, useState } from 'react'
import { GET_USER_URL } from '../../config/dev.env';

export const UserContext=createContext( {
  users: [],
  setUsers: ()=>null,
})

const UserContextProvider =(props)=>{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchData()
      }, [])
    
    const fetchData = async () => {
        const parsedData = await fetch(GET_USER_URL)
          .then((response) => response.text())
          .then((data) => {
            return JSON.parse(data)
          })
        setUsers([...parsedData])
      }
    return(
        <UserContext.Provider
        value={{
            users: users,
            setUsers: setUsers,
        }}
        >
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider
