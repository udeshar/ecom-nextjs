import { useContext, createContext, FC, useState, useEffect } from "react";
import { useAppContext } from "./appContext";

const CartContext = createContext({
    items : [],
    setItems : (items) => {},
    addItem : (item) => {},
    getCartItems : () => {},
    updatecart : (item) => {},
    removeItem : (item, qty) => {},
});

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {

    const [items, setItems] = useState([]);   
    const { showToast } = useAppContext();

    const addItem = async (item) => {
        try {
            if(!localStorage.getItem('token')){
                alert('Please login to add item in wishlist');
                return;
            }
            showToast('Adding item to cart', 'Pending');
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId : item}),
            });
            const data = await response.json();
            if(data.error){
                showToast(data.message, 'Error');
                return;
            }
            showToast('Item added to cart', 'Success');
            getCartItems();
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in adding item', 'Error');
        }
    };

    const getCartItems = async () => {
        try {
            const response = await fetch('/api/cart', {
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

    const removeItem = async (item, qty) => {
        try {
            showToast('Removing item from cart', 'Pending');
            fetch('/api/cart/'+item.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity : qty}),
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    showToast(data.error, 'Error');
                    return;
                }
                showToast('Item removed from cart', 'Success');
                getCartItems();
            })
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in removing item', 'Error');
        }
    }

    const updatecart = async (item) => {
        try {
            if(item.quantity == 0)
                showToast('Removing item from cart', 'Pending');
            fetch('/api/cart/'+item.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity : item.quantity}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(item.quantity == 0)
                    showToast('Removed item from cart', 'Success');
                getCartItems();
            })
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in removing item', 'Error');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getCartItems();
        }
    }, []);

    const values = {
        items : items,
        setItems : setItems,
        addItem : addItem,
        getCartItems : getCartItems,
        updatecart : updatecart,
        removeItem : removeItem,
    };

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
};

export default CartContext;
