import { Link, NavLink } from "react-router-dom";
//import imgUrl from '../assets/imgs/emailLogo.jpg'

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="container-app-header">
                 <img src={'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png'} alt="" /> 
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/email">emails</NavLink>
                </nav>
            </section>
        </header>
    )
}
