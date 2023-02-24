import React, { createContext, useEffect, useState } from 'react'

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
        const parsedData = await fetch('https://jsonplaceholder.typicode.com/users')
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
