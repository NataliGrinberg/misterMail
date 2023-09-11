import React, { useEffect, useState } from 'react'

export function RobotFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleTypeChange(ev) {
        const { value } = ev.target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, type: value }))
    }
    function handleMinBatteryChange(ev) {
        const { value } = ev.target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, minBatteryStatus: value }))
    }

    console.log(filterByToEdit);
    return <form className="robot-filter" onSubmit={onSubmitFilter}>
        <label htmlFor="type">Type</label>
        <input type="text" id="type"
            placeholder="Search by type"
            name="type"
            onChange={handleChange}
            value={filterByToEdit.type} />

        <label htmlFor="status">Battery</label>
        <input type="number" id="status"
            name="minBatteryStatus"
            placeholder="Search by battery"
            value={filterByToEdit.minBatteryStatus}
            onChange={handleChange}
        />

        <button>Filter</button>
    </form>
}
