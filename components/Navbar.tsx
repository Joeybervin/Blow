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

    console.log("THEME : ",theme)
    return (
        <nav className={`navbar p-0 ${visibility} `} >

            <div className="navbar-start">
                <p className="text-3xl font-black font-inherit italic max-h-fit" >Blow</p>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle  btn-sm btn-outline mb-7 mr-2">
                        <Image src={`/icons/theme/${theme}-${themeIcon}.png`} width={24} height={24} alt="" />
                    </label>


                    <div className="dropdown-content glass flex flex-col rounded space-y-2.5 py-3 px-2">
                        <button data-set-theme="cupcake" onClick={() => { changeTheme("cupcake", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/cupcake-default.png`} width={24} height={24} alt="" />
                        </button>

                        <button data-set-theme="wireframe" onClick={() => { changeTheme("wireframe", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-light.png`} width={24} height={24} alt="" />
                        </button>

                        <button data-set-theme="dark" onClick={() => { changeTheme("dark", true) }} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-dark.png`} width={24} height={24} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
};

