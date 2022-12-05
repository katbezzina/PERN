import React, { createContext, useState, ReactNode, useEffect } from 'react'
import axios from 'axios'

const backendUrl = "http://localhost:5000"

type User = { name: string, email?: string, username?: string, avatar?: string, id?: number }

export type AuthContextValue = {
  user: User | null
  isLoggedIn: boolean
  // isAuthenticated: boolean
  // setAuth: (boolean: boolean) => void 
  getUser: () => void
  register: (email: string, password: string, name: string, username: string, avatar: string) => Promise<{ success: boolean, error: string }>
  login: (email: string, password: string) => Promise<{ success: boolean, error: string }>
  logout: () => void
}

const initialAuth: AuthContextValue = {
  user: null,
  isLoggedIn: false,
  register: () => { throw new Error('register not successful.'); },
  login: () => { throw new Error('login not successful.'); },
  logout: () => { throw new Error('logout not successful.'); },
  getUser: () => { throw new Error('not implemented.'); }
}

// ** Create Context
export const AuthContext = createContext<AuthContextValue>(initialAuth)


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [user, setUser] = useState<User | null>(initialAuth.user)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  
  const getUser = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          method: 'GET',
        }
        const data = await axios.get(`${backendUrl}/users/me`, options);
        if (data.data) {
          console.log("userprofile", data.data)
          setUser(data.data);
        } 
      }
      catch (error) {
        console.log('error', error)
      }
  }

    useEffect(() => {
    getUser()
  }, []);
  
  const login = async (email: string, password: string) => {
    console.log('email', email)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    // const backendUrl = process.env.REACT_APP_SERVER_URL
    const res = await fetch(`${backendUrl}/users/login`, options);
    const { success, jwt, error, name } = await res.json()
    //storing on the client browser
    localStorage.setItem("jwt", jwt)
    setUser({ ...user, name })
    setIsLoggedIn(true);
    return { success, error }
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.clear()
    setUser(null)
  }
    
  const register = async (email: string, password: string, nameForm: string, avatar: string, username: string) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name: nameForm, username, avatar })
    }
    const res = await fetch(`${backendUrl}/users/register`, options);
    const { success, error, jwt, name } = await res.json()
    localStorage.setItem("jwt", jwt)
    setUser({ ...user, name })
    setIsLoggedIn(true);
    console.log(error)
      return { success, error }
  }


  return <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout,  getUser }}>{children}</AuthContext.Provider>
}

