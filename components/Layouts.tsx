import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
    children : React.ReactNode;
}


export default function Layouts({children} : LayoutProps) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
