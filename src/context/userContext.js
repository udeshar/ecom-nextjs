import { useContext, createContext, FC, useState, useEffect } from "react";

const UserContext = createContext({
    user: null,
    setUser: (user) => {},
    login: (email, password, callback, onError) => {},
    logout: (callback) => {},
    getUser: () => {},
    getAllAddresses: (callback, onError) => {},
    addAddress: (address, callback, onError) => {},
    updateAddress: (address, callback, onError) => {},
    deleteAddress: (addressId, callback, onError) => {},
    placeOrder: (order, callback, onError) => {},
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
                    setUser(data.user);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function getAllAddresses(callback, onError){
        try {
            fetch('/api/user/address', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    callback(data);
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async function addAddress(address, callback, onError){
        try {
            fetch('/api/user/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    getAllAddresses((data)=> callback(data), (err)=> onError(err));
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteAddress(addressId, callback, onError){
        try {
            fetch('/api/user/address', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id : addressId}),
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    getAllAddresses((data)=> callback(data), (err)=> onError(err));
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function updateAddress(address, callback, onError){
        try {
            fetch('/api/user/address', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    getAllAddresses((data)=> callback(data), (err)=> onError(err));
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function placeOrder(order, callback, onError){
        try {
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })
            .then(response => response.json())
            .then(data => {
                if(data?.error){
                    onError(data?.message)
                } else{
                    callback(data);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getUser();
        }
    }, []);

    const values = {
        user,
        setUser : getUser,
        login,
        logout,
        getUser,
        getAllAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        placeOrder
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;
