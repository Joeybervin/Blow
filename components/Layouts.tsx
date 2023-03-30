import React, { Component } from "react";

import Footer from './Footer';

type LayoutProps = {
    children : React.ReactNode;
}


export default function Layouts({children} : LayoutProps) {
    return (
        <>
            <main>{children}</main>
            < Footer />
        </>
    )
}
