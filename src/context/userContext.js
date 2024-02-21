import { useContext, createContext, FC, useState, useEffect } from "react";

const UserContext = createContext({
    user: null,
    setUser: (user) => {},
    login: (email, password, callback, onError) => {},
    logout: (callback) => {},
    getUser: () => {},
});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    async function login(email, password, callback, onError){
        try {
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    setUser(data);
                    localStorage.setItem('token', JSON.stringify(data?.token));
                    callback(data);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function logout(callback){
        setUser(null);
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
            },
            body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
            if(data?.error){
                console.log(data?.message)
            } else{
            }
        })
        localStorage.removeItem('token');
        callback();
    }

    async function getUser(){
        try {
            fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    logout(()=>{});
                } else{
                    setUser(data);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        // if(token){
            getUser();
        // }
    }, []);

    const values = {
        user,
        setUser : getUser,
        login,
        logout,
        getUser
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;
