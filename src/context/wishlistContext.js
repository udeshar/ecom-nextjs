import { useContext, createContext, FC, useState, useEffect } from "react";

const WishlistContext = createContext({
    items : [],
    setItems : (items) => {},
    addIteminwish : (item) => {},
    getWishlistItems : () => {},
    deletewishlist : (item) => {},
});

export const useWishlistContext = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {

    const [items, setItems] = useState([]);   

    const addItem = async (item) => {
        try {
            if(!localStorage.getItem('token')){
                alert('Please login to add item in wishlist');
                return;
            }
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId : item}),
            });
            const data = await response.json();
            console.log(data);
            // setItems(data);
            getWishlistItems();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getWishlistItems = async () => {
        try {
            const response = await fetch('/api/wishlist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            setItems(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deletewishlist = async (item) => {
        try {
            fetch('/api/wishlist/'+item.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getWishlistItems();
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getWishlistItems();
        }
    }, []);

    const values = {
        items : items,
        setItems : setItems,
        addIteminwish : addItem,
        getWishlistItems : getWishlistItems,
        deletewishlist : deletewishlist,
    };

    return (
        <WishlistContext.Provider value={values}>
            {children}
        </WishlistContext.Provider>
    )
};

export default WishlistContext;
