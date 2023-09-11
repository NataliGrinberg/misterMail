import React, { useEffect, useState } from 'react'

export function EmailFolderList({ loggedinUser, filterBy, onSetFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function filterFolder(field, value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field] : value }))
    }

   
    return <section className="email-filter-side">
        <div>
            <div> <button name="Inbok" onClick={(ev) => filterFolder('isRead' , null)}>Inbok</button></div>
            <div>   <button name="Sent" onClick={(ev) => filterFolder('from' ,loggedinUser.email)}>Sent</button></div>
            <div>   <button name="Starred" onClick={(ev) => filterFolder('isStarred' , true)}>Starred</button></div>
            <div>   <button name="Trash" onClick={(ev) => filterFolder('removedAt' , true)}>Trash</button></div>
            </div>
        </section>
}


