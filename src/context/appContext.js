import { useContext, createContext, FC, useState, useEffect } from "react";

const AppContext = createContext({
    theme: "light",
    setTheme: (theme) => {},
    error: "",
    setError: (error) => {},
    type: "",
    showToast: (error, type) => {},
});

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {

    const getThemeFromLocalStorage = () => {
        if(typeof window === 'object'){
            const themee = localStorage.getItem('theme');
            if (themee) {
                return themee;
            } else {
                return 'light';
            }
        } else {
            return 'light';
        }
    }

    const [theme, setThemee] = useState('light');
    const [error, setError] = useState("");
    const [type, setType] = useState("Success");

    const showToast = (error, type) => {
        setError(error);
        setType(type);
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    const values = {
        theme,
        setTheme : (()=>{
            setThemee((prev)=> prev == "dark" ? "light" : "dark" )
            localStorage.setItem('theme', theme  == "light" ? "dark" : "light");
            document.getElementsByTagName("html")[0].classList.toggle(theme);
        }),
        error,
        setError,
        type,
        showToast
    };
    

    useEffect(() => {
      const themee = getThemeFromLocalStorage();
        setThemee(themee);
    }, [])
    
    

    useEffect(()=>{
        document.getElementsByTagName("html")[0].classList.add(theme)
    },[theme])

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;
