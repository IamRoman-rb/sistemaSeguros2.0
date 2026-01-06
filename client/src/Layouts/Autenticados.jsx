import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import {ToastContainer} from "react-toastify";
const Autenticados = () => {
    useEffect(() => {
        document.title = "Autenticado";
    }, []);

    return (
        <>
        <Header />
        <Outlet />
        <ToastContainer />
        </>
    );
}

export default Autenticados;