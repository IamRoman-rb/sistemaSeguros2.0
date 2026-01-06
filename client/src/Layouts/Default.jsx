import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {ToastContainer} from "react-toastify";
const Default = () => {
    useEffect(() => {
        document.title = "Sistema Seguros";
    }, []);

    return (
        <>
        <Outlet />
        <ToastContainer />
        </>
    );
}

export default Default;