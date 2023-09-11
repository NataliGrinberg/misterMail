import React, { useEffect, useState } from 'react'

export function EmailFilter({ loggedinUser, filterBy, onSetFilter }) {
     const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        // let { value, name: field, type } = ev.target
        // value = type === 'number' ? +value : value
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <form className="robot-filter" onSubmit={onSubmitFilter}>
        <label htmlFor="type">Subject</label>
        <input type="text" id="subject"
            placeholder="Search by subject"
            name="subject"
            onChange={handleChange}
            value={filterByToEdit.subject} />

        <label htmlFor="type">Body</label>
        <input type="text" id="body"
            placeholder="Search by body"
            name="body"
            onChange={handleChange}
            value={filterByToEdit.body} />

        <button>Filter</button>
    </form>
}
