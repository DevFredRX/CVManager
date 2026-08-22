import { Outlet } from "react-router";

import Footer from "@components/Footer";
import Header from "@components/Header";

export default function MainLayout({ variant }) {

    return (

        <>

            <div className="layout">
                <Header variant={variant} />
                <main>
                    <Outlet />
                </main>
                <Footer variant={variant} />
            </div>

        </>

    )

}