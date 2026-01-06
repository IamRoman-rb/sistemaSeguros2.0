import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Path from "../Path";
import MenuSection from "./MenuSection";
import { IconUserFilled } from '@tabler/icons-react';
import Style from "../Styles/Components/Header.module.css";
const Header = () => {
    const user = {
        id: 1,
        name: "Juan Perez",
        role: "admin"
    };

    const userRouter = user?.role === "admin" ? Path.admin : [];
return (
        <header className={Style.header}>
            <Link className={Style.iconUser}>{user.name[0]}</Link>
            <nav className={Style.nav}>
                {userRouter.map((moduleObj, index) => {
                    const categoryName = Object.keys(moduleObj)[0];
                    const rawRoutes = moduleObj[categoryName];
                    const validRoutes = rawRoutes.filter(route =>
                        (!route.method || route.method === 'get') && !route.path.includes("/:")
                    );

                    if (validRoutes.length === 0) return null;

                    return (
                        <MenuSection 
                            key={index} 
                            categoryName={categoryName} 
                            routes={validRoutes} 
                        />
                    );
                })}
            </nav>
        </header>
    )
};

export default Header;