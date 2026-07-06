import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { importMenuData, exportMenuData, supplierMenuData, logisticPartnerMenuData } from "../../../data/menu-items/index.js";
import NavItem from "../nav-menu/index.js";
import Logo from "../../shared/logo/index.js";

interface User {
    name: string;
    email: string;
    role: "import" | "export" | "supplier" | "logistic";
}

interface MenuItem {
    href?: string;
    icon?: React.ElementType;
    label: string;
    submenu?: Array<{ label: string; href: string; icon?: React.ElementType }>;
}

interface MenuSection {
    menu: MenuItem[];
}

interface SidebarProps {
    navOpened: boolean;
    setNavOpened: Dispatch<SetStateAction<boolean>>;
}

const user: User = {
    name: "Sushil Hemrom",
    email: "sushil@gmail.com",
    role: "supplier",
};

export default function Sidebar({ navOpened, setNavOpened }: SidebarProps) {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    // const { logoutUser } = useAuthService();

    const location = useLocation();
    const pathname = location.pathname;

    const menuLinks: MenuSection[] =
        user?.role === "import"
            ? importMenuData?.linkData
            : user?.role === "export"
                ? exportMenuData?.linkData
                : user?.role === "supplier"
                    ? supplierMenuData?.linkData
                    : user?.role === "logistic"
                        ? logisticPartnerMenuData?.linkData
                        : [];

    const closeAllSubmenus = (): void => {
        setOpenSubmenu(null);
    };

    const handleSubmenuToggle = (label: string): void => {
        setOpenSubmenu((prev) => (prev === label ? null : label));
    };

    const activeClass = "bg-primary text-white";
    const inactiveClass = "text-[#43464A] hover:text-primary hover:bg-primary/10";

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${navOpened ? "opacity-100 block" : "opacity-0 hidden"
                    }`}
                onClick={() => setNavOpened(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-30 h-screen w-[288px] overflow-y-auto transition-transform duration-300 border-e border-e-[#E5E7EB] bg-white
                    ${navOpened ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0  
                `}
            >
                <div className="flex flex-col gap-5 pt-28 lg:pt-0">
                    <div className="px-2 flex items-center justify-center hidden lg:block">
                        <Logo />
                    </div>
                    <div>
                        <nav>
                            {menuLinks?.map((section, sIndex) => (
                                <div key={sIndex} className="space-y-4">
                                    {section?.menu?.map((item, index) => (
                                        <NavItem
                                            key={index}
                                            href={item?.href || "#"}
                                            icon={item?.icon}
                                            label={item?.label}
                                            submenu={item?.submenu}
                                            openSubmenu={openSubmenu}
                                            handleSubmenuToggle={handleSubmenuToggle}
                                            setNavOpened={setNavOpened}
                                            closeAllSubmenus={closeAllSubmenus}
                                        />
                                    ))}

                                    {user?.role === "supplier" && (
                                        <Link to="/dashboard/supplier/upgrade-plan">
                                            <button
                                                className={`text-xl font-medium w-full flex items-center gap-3 px-5 py-2 ${pathname === "/dashboard/supplier/membership-plan"
                                                    ? activeClass
                                                    : inactiveClass
                                                    } transition-all duration-300 cursor-pointer`}
                                            >
                                                <FaHandHoldingDollar size={20} />
                                                Upgrade subscription
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <button
                                // onClick={logoutUser}
                                className="text-xl font-medium flex items-center gap-3 my-4 px-6 py-3 text-[#43464A] cursor-pointer text-red-600 hover:text-red-600/90 transition"
                            >
                                <MdLogout size={20} />
                                Log Out
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}