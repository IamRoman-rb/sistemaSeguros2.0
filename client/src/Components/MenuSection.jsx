import { useState } from "react";
import { Link } from "react-router-dom";
import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react';
import Style from "../Styles/Components/MenuSection.module.css";
const MenuSection = ({ categoryName, routes }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={Style.menuSection}>
            <h3 className={Style.menuSectionTitle}
                onClick={() => setIsOpen(!isOpen)}>
                {categoryName.toUpperCase()}
                <span>
                    {isOpen ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
                </span>
            </h3>

            {isOpen && (
                <ul className={Style.menuSectionLinks}>
                    {routes.map((route, i) => (
                        <li key={i} className={Style.menuSectionLink}>
                            <Link to={route.path} className={Style.link}>
                                {route.alias}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MenuSection;