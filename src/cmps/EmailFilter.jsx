import React, { useEffect, useRef, useState } from 'react'

export function EmailFilter({ filterBy, onSetFilter, checkboxSelectedAll }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const showCheckBoxes = useRef(true);

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) 
    {
        var valueInput = document.getElementsByClassName('email-filter-search')[0].value
        let valueCheckBox = document.getElementsByClassName('email-filter-checkbox')[0].value
        valueCheckBox = valueCheckBox === 'false' ? false : (valueCheckBox === 'true' ? true : null)
        console.log("filter", valueInput, "  ", valueCheckBox)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, 'subject': valueInput, 'body': valueInput, 'isRead': valueCheckBox }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function checkboxSelectAll() {
        var checked = document.getElementsByClassName("checkboxSelectAll")[0].checked;
        var checkboxList = document.getElementsByName("checkbox-list-row");

        checkboxList.forEach(ch => ch.checked = checked)
        checkboxSelectedAll()
    }

    function showOptions() {
        var options = document.getElementById("options");

        if (showCheckBoxes.current) {
            options.style.display = "flex";
            showCheckBoxes.current = !showCheckBoxes.current;
        } else {
            options.style.display = "none";
            showCheckBoxes.current = !showCheckBoxes.current;
        }
    }


    return <form id="email-filter" className="email-filter" >

        {/* <nav class="pagination-container">
            <button class="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">
                &lt;
            </button>

            <div id="pagination-numbers">

            </div>

            <button class="pagination-button" id="next-button" aria-label="Next page" title="Next page">
                &gt;
            </button>
        </nav> */}






        <div>
            <input className="checkboxSelectAll" onClick={checkboxSelectAll} type="checkbox"></input>
        </div>
        
        <div>
            <select className='email-filter-checkbox' onClick={handleChange} >
                <option value={null}>All</option>
                <option value={true}>Read</option>
                <option value={false}>unRead</option>
            </select>

        </div>

        <div className="email-filter-search-box">
            <i className="fa fa-search email-filter-search-icon"></i>
            <input className="email-filter-search" type="text" id="subject"
                placeholder="Search in email"
                name="subject"
                onChange={handleChange}
                value={filterByToEdit.body}
            />
        </div>

    </form>
}
