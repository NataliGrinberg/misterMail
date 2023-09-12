import React, { useEffect, useRef, useState } from 'react'

export function EmailFilter({ filterBy, onSetFilter }) {
     const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
     const showCheckBoxes = useRef(true);

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {

          var  valueInput = document.getElementsByClassName('email-filter-search')[0].value
          let valueCheckBox = document.getElementsByClassName('email-filter-checkbox')[0].value
            valueCheckBox = valueCheckBox === 'false' ? false : (valueCheckBox === 'true' ? true : null)
            console.log("filter", valueInput, "  ", valueCheckBox)
         setFilterByToEdit((prevFilter) => ({ ...prevFilter, 'subject': valueInput , 'body': valueInput , 'isRead': valueCheckBox}))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
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

    return <form className="email-filter" onSubmit={onSubmitFilter}>
    <div>
    <input  onClick={showOptions} type="checkbox"></input>

    <div id = "options">
        <select className = 'email-filter-checkbox' onClick ={handleChange} >
                <option value={null}>All</option>
                <option value={true}>Read</option>
                <option value={false}>unRead</option>  
            </select>
        </div>
    </div>

        <div>
        <label htmlFor="type">Search</label>
        <input className = 'email-filter-search' type="text" id="subject"
            placeholder="Search"
            name="subject"
            onChange={handleChange}
            value = {filterByToEdit.body} /> 
    </div>
        <button>Filter</button>
    </form>
}
