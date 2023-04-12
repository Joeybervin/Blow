import { useState } from "react";
import Image from "next/image";
import { getCookie, CookieValueTypes, setCookie } from "cookies-next";
export interface NavbarProps {
    visibility: string;
    theme: CookieValueTypes;
    onChangeTheme: (newTheme: CookieValueTypes) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ visibility, onChangeTheme, theme }: NavbarProps) => {

    const [themeIcon, setThemeIcon] = useState<string>(theme === "dark" ? "dark" : theme === "wireframe" ? "light" : "default")

    const changeTheme = (themeChoose: CookieValueTypes, saveCookie: boolean) => {
        const themeUpdated = themeChoose;
        onChangeTheme(themeUpdated)
        setThemeIcon(themeUpdated === "dark" ? "dark" : themeUpdated === "wireframe" ? "light" : "default")

        if (saveCookie && getCookie("savedTheme") === true) {
            setCookie("theme", themeUpdated, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        }
    }

    return (
        <nav className={`flex items-center navbar p-0 ${visibility}`} >

            <div className="navbar-start">
                <Image priority src="/images/logo.png" style={{width: "auto", height:"auto"}} width={120} height={120} alt='blow' />
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end my-auto">
                    <label tabIndex={0} className="btn btn-circle  btn-sm btn-outline  mr-2">
                        <Image src={`/images/theme/${theme}-${themeIcon}.png`} width={24} height={24} alt={`Theme ${theme}`} />
                    </label>
                    <div className="dropdown-content glass flex flex-col rounded space-y-2.5 py-3 px-2 mt-5">
                        <button data-set-theme="cupcake" onClick={() => { changeTheme("cupcake", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/images/theme/cupcake-default.png`} width={24} height={24} alt="default theme" />
                        </button>

                        <button data-set-theme="wireframe" onClick={() => { changeTheme("wireframe", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/images/theme/${theme}-light.png`} width={24} height={24} alt="light theme" />
                        </button>

                        <button data-set-theme="dark" onClick={() => { changeTheme("dark", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/images/theme/${theme}-dark.png`} width={24} height={24}  alt="dark theme" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
};

