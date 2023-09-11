import { Outlet } from "react-router";
import { AboutTeam } from "../cmps/AboutTeam";
import { AboutVision } from "../cmps/AboutVision";
import { Link } from "react-router-dom";

export function About() {
    return <div className="about">
        <h1>We are all about emails</h1>
        <Outlet />
        <nav>
            <Link to="/about/team">Team</Link>
            <Link to="/about/vision">Vision</Link>
        </nav>
    </div>
}
