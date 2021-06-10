import {createContext, useContext, ReactNode, useState, useEffect} from "react"
import ApiClient from "../lib/ApiClient"
import SessionClient from "../lib/SessionClient"

type authContextType = {
    user?: Object;
    login: (email: string, password: string) => boolean;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: undefined,
    login(email: string, password: string): boolean {
        return false
    },
    logout(): void {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues)

type Props = {
    children: ReactNode;
};

// @ts-ignore
export const AuthProvider = ({children, authUser}) => {
    const [user, setUser] = useState(authUser)

    const getUser = async () => {
        try {
            let res = await ApiClient.get(`/user`);
            setUser(res.data)
        } catch (error) {
            //setUser(undefined)
            //throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await SessionClient.get('/sanctum/csrf-cookie').then(() => {
                SessionClient.post('/login', {
                    email: email,
                    password: password,
                }).then(response => {
                    if (response && response.data) {
                        setUser(response.data)
                        return true
                    }

                    return false
                })
            })

        } catch (error) {
            console.log(error, 'error siin login')
            //throw error;
        }

        return false
    }

    const logout = async () => {
        try {
            await SessionClient.get(`/logout`)
            setUser(undefined)
        } catch (error) {
            console.log(error, 'error on logout')
        }
    }

    useEffect(() => {
        //getUser()
    }, [])

    const value = {
        user,
        login,
        logout,
    }

    return (
        // @ts-ignore
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useUser() {
    const context = useAuth()
    return context.user
}