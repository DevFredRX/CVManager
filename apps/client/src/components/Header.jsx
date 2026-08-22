import { useLocation } from "react-router"

import logo from '@public/logo.png'

const titles = {
    '/register': 'Créez votre compte'
}

export default function Header({ variant }) {

    const location = useLocation()
    const title = titles[location.pathname] || 'Bienvenue'

    if (variant === 'none') return null

    return (

        <>

            {variant === 'auth' ? (
                <header className="form-header">
                    <img src={logo} alt="CV Manager Logo" />
                    <h1>{title}</h1>
                </header>
            ) : (
                <header className="default-header"></header>
            )}
            
        </>

    )

}