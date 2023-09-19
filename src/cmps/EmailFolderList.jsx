import React, { useEffect, useState } from 'react'
import { emailService } from "../services/email.service";
import { Form, Link } from "react-router-dom";

export function EmailFolderList({ loggedinUser, filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function filterFolder(field, value) {
        setFilterByToEdit(() => ({ ...emailService.getDefaultFilter(), [field]: value }))
    }


    return <section className="email-filter-side">
        <div>
            <a className="email-compose-in-folder-filter" href="#/email/compose">
                <button>NEW Email</button>
            </a>
        </div>

        <div>   <button className="Inbok folder" onClick={(ev) => filterFolder('isRead', null)}>Inbok</button></div>
        <div>   <button className="Sent folder" onClick={(ev) => filterFolder('from', loggedinUser.email)}>Sent</button></div>
        <div>   <button className="Starred folder" onClick={(ev) => filterFolder('isStarred', true)}>Starred</button></div>
        <div>   <button className="Trash folder" onClick={(ev) => filterFolder('removedAt', true)}>Trash</button></div>

    </section>
}


