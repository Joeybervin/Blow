import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { hasCookie, getCookie, CookieValueTypes, setCookie, getCookies } from "cookies-next";
interface NavbarProps {
    navbarProps?: string; // Remplacez any par le type approprié de pageProps
}

const Navbar: React.FC<NavbarProps> = ({ navbarProps }) => {

    const [theme, setTheme] = useState<CookieValueTypes>(getCookie("theme") || "cupcake")
    const [themeIcon, setThemeIcon] = useState<string>(theme === "black" ? "dark" : theme === "wireframe" ? "light" : "default")


    useEffect(() => {
        const themeSavedInCookie = hasCookie('theme')
        if (themeSavedInCookie) setTheme(getCookie('theme'))
        console.log("navbar theme : ",getCookie("theme"))
    }, []);



    const changeTheme = (theme: SetStateAction<CookieValueTypes>, saveCookie : boolean) => {
        setTheme(theme)
        setThemeIcon(theme === "black" ? "dark" : theme === "wireframe" ? "light" : "default")

        if (saveCookie) getThemeInCookie(theme)
    }

    const getThemeInCookie = (theme: SetStateAction<CookieValueTypes>) => {
        if (getCookie("savedTheme") === true) {
            console.log("je suis autorisé à enregistrer les cookies de theme")
            setCookie("theme", theme , {maxAge: 30 * 24 * 60 * 60 * 1000 })
        }
    }    

    
    return (
        <nav className={`navbar p-0 ${navbarProps} `} >

            <div className="navbar-start">
                <p className="text-3xl font-black italic tracking-wide text-sky-100 max-h-fit" >Blow</p>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle  btn-sm btn-outline mb-7">
                        <Image src={`/icons/theme/${theme}-${themeIcon}.png`} width={24} height={24} alt="" />
                    </label>


                    <div className="dropdown-content flex flex-col space-y-2.5">
                        <button onClick={() => changeTheme("cupcake", true)} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/cupcake-default.png`} width={24} height={24} alt="" />
                        </button>

                        <button onClick={() => changeTheme("wireframe", true)} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-light.png`} width={24} height={24} alt="" />
                        </button>

                        <button onClick={() => changeTheme("black", true)} className="btn btn-circle btn-sm btn-outline">
                            <Image src={`/icons/theme/${theme}-dark.png`} width={24} height={24} alt="" />
                        </button>
                    </div>
                </div>



            </div>







        </nav>
    )
}

export default Navbar;