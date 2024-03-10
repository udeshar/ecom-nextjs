import { API_URL } from "@/helpers/constants";

export const getAllCategories = async () => {
    const res = await fetch(`${API_URL}/api/category`);
    const data = await res.json();
    return data;
}

export const getCategoryByName = async (name : string) => {
    const res = await fetch(`${API_URL}/api/category/${name}`);
    const data = await res.json();
    return data;

}

export const getAllProducts = async (query? : string) => {
    const res = await fetch(`${API_URL}/api/product` + (query ? `?${query}` : ''));
    const data = await res.json();
    return data;
}

export const getProductByCategoryName = async (name : string) => {
    const res = await fetch(`${API_URL}/api/product/category/${name}`);
    const data = await res.json();
    return data;
}

export const getProductByProductName = async (name : string) => {
    const res = await fetch(`${API_URL}/api/product/name/${name}`);
    const data = await res.json();
    return data;
}

export const getReviewsByProductId = async (id : string) => {
    const res = await fetch(`${API_URL}/api/review/${id}`);
    const data = await res.json();
    return data;
}