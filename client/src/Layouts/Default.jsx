import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import {ToastContainer} from "react-toastify";
const Default = () => {
    useEffect(() => {
        document.title = "Sistema Seguros";
    }, []);

    return (
        <>
        <Header />
        <Outlet />
        <ToastContainer />
        </>
    );
}

export default Default;