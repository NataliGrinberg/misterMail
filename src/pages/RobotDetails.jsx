import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { robotService } from "../services/robot.service";
import { Link } from "react-router-dom";

export function RobotDetails() {
    const [robot, setRobot] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadRobot()
    }, [params.robotId])

    async function loadRobot() {
        try {
            const robot = await robotService.getById(params.robotId)
            setRobot(robot)
        } catch (err) {
            navigate('/robot')
            console.log('Had issues loading robot', err);
        }
    }

    if (!robot) return <div>Loading..</div>
    return (
        <section className="robot-details">
            <img src={`https://robohash.org/${robot.type}`} />
            <h3>Type : {robot.type}</h3>
            <h3>Model : {robot.model}</h3>
            <h3>Battery : {robot.batteryStatus}</h3>
            <Link to="/robot">Go back</Link>
            <Link to="/robot/r1">Next robot</Link>

        </section>
    )
}
