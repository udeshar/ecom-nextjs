import { useContext, createContext, FC, useState, useEffect } from "react";

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

    const addItem = async (item) => {
        try {
            if(!localStorage.getItem('token')){
                alert('Please login to add item in wishlist');
                return;
            }
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId : item}),
            });
            const data = await response.json();
            console.log(data);
            // setItems(data);
            getCartItems();
        } catch (error) {
            console.error('Error:', error);
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
            setItems(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removeItem = async (item, qty) => {
        try {
            fetch('/api/cart/'+item.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({quantity : qty}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getCartItems();
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updatecart = async (item) => {
        try {
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
                getCartItems();
            })
        } catch (error) {
            console.error('Error:', error);
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
