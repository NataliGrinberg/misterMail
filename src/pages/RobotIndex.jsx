import { useEffect, useState } from "react"

import { RobotList } from "../cmps/RobotList";

import { robotService } from "../services/robot.service";
import { RobotFilter } from './../cmps/RobotFilter';

export function RobotIndex() {

    const [robots, setRobots] = useState(null)
    const [filterBy, setFilterBy] = useState(robotService.getDefaultFilter())

    useEffect(() => {
        loadRobots()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    function onClearFilter() {
        setFilterBy(robotService.getDefaultFilter())
    }

    async function loadRobots() {
        try {
            const robots = await robotService.query(filterBy)
            setRobots(robots)
        } catch (err) {
            console.log('Had issues loading robots', err);
        }
    }

    async function onRemoveRobot(robotId) {
        try {
            console.log('robotId', robotId);
            await robotService.remove(robotId)
            setRobots((prevRobots) => prevRobots.filter(robot => robot.id !== robotId))
        } catch (err) {
            console.log('Had issues loading robots', err);
        }
    }

    console.log('filterBy from index', filterBy);
    if (!robots) return <div>Loading..</div>
    return <section className="robot-index">
        <h1>Welcome! this is our robots</h1>
        {/* <button onClick={onClearFilter}>Clear filter</button> */}
        <RobotFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <RobotList robots={robots} onRemove={onRemoveRobot} />
    </section>

}
