import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { hasCookie, getCookie, CookieValueTypes, setCookie, getCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";


interface NavbarProps {
    visibility: string; 
    theme: CookieValueTypes ;
    onChangeTheme: (newTheme: CookieValueTypes) => void;
}

const Navbar: React.FC<NavbarProps> = ({ visibility, onChangeTheme, theme  } : NavbarProps) => {

    const [themeIcon, setThemeIcon] = useState<string>(theme === "black" ? "dark" : theme === "wireframe" ? "light" : "default")


    const changeTheme = (themeChoose: CookieValueTypes, saveCookie: boolean) => {
        const themeUpdated = themeChoose;
        onChangeTheme(themeUpdated)
        setThemeIcon(themeUpdated === "black" ? "dark" : themeUpdated === "wireframe" ? "light" : "default")

        if (saveCookie && getCookie("savedTheme") === true) {
            setCookie("theme", themeUpdated, { maxAge: 30 * 24 * 60 * 60 * 1000 })
        }
    }


    
    return (
        <nav className={`navbar p-0 ${visibility} `} >

            <div className="navbar-start">
                <p className="text-3xl font-black italic tracking-wide text-sky-100 max-h-fit" >Blow</p>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle  btn-sm btn-outline mb-7">
                        <Image src={`/icons/theme/${theme}-${themeIcon}.png`} width={24} height={24} alt="" />
                    </label>


                    <div className="dropdown-content flex flex-col space-y-2.5">
                        <button data-set-theme="cupcake"  onClick={() => {changeTheme("cupcake", true)}} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/cupcake-default.png`} width={24} height={24} alt="" />
                        </button>

                        <button data-set-theme="wireframe"  onClick={() => {changeTheme("wireframe", true)}} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-light.png`} width={24} height={24} alt="" />
                        </button>

                        <button data-set-theme="black"  onClick={() =>{ changeTheme("black", true)}} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-dark.png`} width={24} height={24} alt="" />
                        </button>
                    </div>
                </div>



            </div>


        </nav>
    )
}


export default Navbar;