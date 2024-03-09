import { useContext, createContext, FC, useState, useEffect } from "react";
import { useAppContext } from "./appContext";
import { API_URL } from "@/helpers/constants";

const ProductContext = createContext({
    singleProduct : {},
    products : [],
    featured : [],
    bestSeller : [],
    offered : [],
    getProducts : () => {},
    getProductByQuery : (query) => {},
    categoryProducts : [],
    getProductByName : (name) => {},
    getProductById : (id, callback) => {}
});

export const useProductsContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]); 
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [offered, setOffered] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const { showToast } = useAppContext();

    async function getProducts() {
        try {
            const response = await fetch(API_URL + '/api/product', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if(!data.error)
                setProducts(data);
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in getting categories', 'Error');
        }
    }

    async function getProductByQuery(query, featured = false, bestSeller = false, offered = false) {
        try {
            // setCategoryProducts([]);
            const response = await fetch(API_URL + '/api/product?'+query, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if(!data.error){
                if(featured)
                    setFeatured(data);
                else if(bestSeller)
                    setBestSeller(data);
                else if(offered)
                    setOffered(data);
                else{
                    console.log(data);
                    setCategoryProducts(data);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in getting products', 'Error');
        }
    
    }

    async function getProductByName(name) {
        try {
            const response = await fetch(API_URL + '/api/product?' + name, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if(!data.error)
                setSingleProduct(data);
            else {
                showToast(data?.message, 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in getting product', 'Error');
        }
    }

    async function getProductById(id, callback) {
        setSingleProduct({});
        try {
            const response = await fetch(API_URL + '/api/product/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if(!data.error)
                callback(data);
            else {
                showToast(data?.message, 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error in getting product', 'Error');
        }
    }

    // useEffect(() => {
        // const token = localStorage.getItem('token');
        // if(token){
            // getCartItems();
            // getProducts();
        // }
    // }, []);

    const values = {
        getProducts,
        getProductByQuery,
        products,
        categoryProducts,
        featured,
        bestSeller,
        offered,
        getProductByName,
        singleProduct,
        getProductById
    };

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    )
};

export default ProductContext;
