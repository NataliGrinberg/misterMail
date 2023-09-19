import { Link, NavLink } from "react-router-dom";
import imgUrl from '../assets/imgs/emailLogo.jpg'

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="container-app-header">

                <img src={imgUrl} alt="" />
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/email">emails</NavLink>
                </nav>
            </section>
        </header>
    )
}
