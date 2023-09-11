import { RobotPreview } from "./RobotPreview";


export function RobotList({ robots, onRemove }) {

    return (
        <ul className="robot-list">
            {
                robots.map(robot => <li key={robot.id}>
                    <RobotPreview robot={robot} />
                    <div className="robot-actions">
                        <button onClick={() => onRemove(robot.id)}>X</button>
                    </div>
                </li>)
            }
        </ul>
    )
}
