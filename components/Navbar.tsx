

const Navbar: React.FC = () => {

    return (
        <nav className="navbar glass" >

            <div className="navbar-start">
                <p className="text-3xl font-black italic tracking-wide text-sky-100 pl-10" >Blow</p>
            </div>


            <div className="navbar-end">

            <div className="flex space-x-2">
                <button className="btn btn-circle  btn-sm btn-outline">
                <input type="radio" name="theme" value="" className="hidden" />
                <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                </button>

                <button className="btn btn-circle btn-sm btn-outline">
                <input type="radio" name="theme" value="" className="hidden" />
                <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                </button>

                <button className="btn btn-circle btn-sm btn-outline">
                <input type="radio" name="theme" value="" className="hidden" />
                <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M12,180v-8a116,116,0,0,1,232,0v8" fill="none" stroke="#FF1D1D" strokeLinecap="round" stroke-linejoin="round" stroke-width="24" id="mainIconPathAttribute"></path><path d="M152,180v-4a24,24,0,0,0-48,0v4" fill="none" stroke="#0077FF" strokeLinecap="round" stroke-linejoin="round" stroke-width="24" id="mainIconPathAttribute"></path><path d="M200,180v-4a72,72,0,0,0-144,0v4" fill="none" stroke="#ffd000" strokeLinecap="round" stroke-linejoin="round" stroke-width="24" id="mainIconPathAttribute"></path></svg>
                </button>


            </div>
            </div>

            

        </nav>
    )
}

export default Navbar;