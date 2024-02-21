import { useContext, createContext, FC, useState, useEffect } from "react";

const AppContext = createContext({
    theme: "light",
    setTheme: (theme) => {},
});

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {

    const [theme, setThemee] = useState("light");

    const values = {
        theme,
        setTheme : (()=>{
            setThemee((prev)=> prev == "dark" ? "light" : "dark" )
            document.getElementsByTagName("html")[0].classList.toggle(theme);
        })
    };
    

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
