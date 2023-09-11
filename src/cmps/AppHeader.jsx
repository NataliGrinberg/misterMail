import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="container">
                <h1>Gmail</h1>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    {/* <NavLink to="/robot">robot</NavLink> */}
                    <NavLink to="/email">emails</NavLink>
                </nav>
            </section>
        </header>
    )
}
