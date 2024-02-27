import { useContext, createContext, FC, useState, useEffect } from "react";
import { useAppContext } from "./appContext";

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
    const { showToast } = useAppContext();

    const addItem = async (item) => {
        try {
            if(!localStorage.getItem('token')){
                alert('Please login to add item in wishlist');
                return;
            }
            showToast('Adding item to wishlist', 'Pending');
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId : item}),
            });
            const data = await response.json();
            if(data.error){
                showToast(data.error, 'Error');
                return;
            }
            showToast('Item added to wishlist', 'Success');
            getWishlistItems();
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in adding item', 'Error');
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
            if(!data.error)
                setItems(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deletewishlist = async (item) => {
        try {
            showToast('Removing item from wishlist', 'Pending');
            fetch('/api/wishlist/'+item.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    showToast(data.error, 'Error');
                    return;
                }
                showToast('Item removed from wishlist', 'Success');
                getWishlistItems();
            })
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in adding item', 'Error');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            console.log('token', token);
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
