import { useContext, createContext, FC, useState, useEffect } from "react";
import { useAppContext } from "./appContext";
import { API_URL } from "@/helpers/constants";

const CategoryContext = createContext({
    categories : [],
    setCategories : (categories) => {},
    getCategories : () => {},
});

export const useCategoriesContext = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);   
    const { showToast } = useAppContext();

    async function getCategories() {
        try {
            const response = await fetch(API_URL + '/api/category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if(!data.error)
                setCategories(data);
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in getting categories', 'Error');
        }
    }

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if(token){
            // getCartItems();
            getCategories();
        // }
    }, []);

    const values = {
        categories,
        setCategories,
        getCategories
    };

    return (
        <CategoryContext.Provider value={values}>
            {children}
        </CategoryContext.Provider>
    )
};

export default CategoryContext;
