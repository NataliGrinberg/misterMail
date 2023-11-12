import React, { useEffect, useState } from 'react'
import { emailService } from "../services/email.service";
import { Form, Link } from "react-router-dom";

export function EmailFolderList({ loggedinUser, filterBy, onSetFilter, unreadCount }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const listFolder = { inbox: 'Inbox', sent: 'Sent', starred: 'Starred', trash: 'Trash', draft: 'Draft' }


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function filterFolder(ev, field, value, btnFolder) {
        debugger
        var folderActive = document.getElementsByClassName("flexRowFolder active")[0]
        folderActive.classList.remove("active")
        ev.currentTarget.classList.add("active")

        setFilterByToEdit(() => ({ ...emailService.getDefaultFilter(), [field]: value, folder: btnFolder }))
    }

    function myFunction(ev) {

        //change side bar to x - sidebar close
        if (ev.currentTarget.classList.contains("fa-bars")) {
            ev.currentTarget.classList.remove("fa-bars");
            ev.currentTarget.classList.add("fa-xmark");
        }
        else { //open
            ev.currentTarget.classList.remove("fa-xmark");
            ev.currentTarget.classList.add("fa-bars");
        }


        //change width size container folders
        var emailFilterSide = document.getElementsByClassName("email-filter-side")[0]
        emailFilterSide.classList.toggle("email-filter-width")

        //change width size main grid container
        var emailGridContainer = document.getElementsByClassName("email-grid-container")[0]
        emailGridContainer.classList.toggle("email-grid-container-change")

        //change display button with the name of the folder
        var folders = document.getElementsByClassName("display")
        Array.from(folders).forEach(x => {
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }

        })

    }

    return <section className="email-filter-side">

        <div className="flexRowFolderbars">
            <img className="display" src={'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png'} alt="" />
            <i onClick={(ev) => myFunction(ev)} className="fa-solid fa-bars"></i>
        </div>

        <div className="compose-flex">
            <div className="copmpose-flex-2">
                <i className="fa-solid fa-pen"></i>
                <Link to="/email/compose"> <div className="display">  Compose</div></Link>
            </div>
        </div>

        <div className='folders-flex'>
            <div className="flexRowFolder active" onClick={(ev) => filterFolder(ev, 'isRead', null, listFolder.inbox)}>
                <i className="fa-solid fa-inbox"></i>
                <div className="display Inbok folder">  {listFolder.inbox} </div>
                <div className="display Inbokcount" > {unreadCount} </div>
            </div>
            <div className="flexRowFolder" onClick={(ev) => filterFolder(ev, 'from', loggedinUser.email, listFolder.sent)}>
                <i className="fa-regular fa-paper-plane"></i>
                <div className="display Sent folder" > {listFolder.sent}</div>
            </div>
            <div className="flexRowFolder" onClick={(ev) => filterFolder(ev, 'isStarred', true, listFolder.starred)}>
                <i className="fa-regular fa-star"></i>
                <div className="display Starred folder" > {listFolder.starred}</div>
            </div>
            <div className="flexRowFolder" onClick={(ev) => filterFolder(ev, 'removedAt', true, listFolder.trash)}>
                <i className="fa-solid fa-trash"></i>
                <div className="display Trash folder" > {listFolder.trash}</div>
            </div>
            <div className="flexRowFolder" onClick={(ev) => filterFolder(ev, 'sentAt', true, listFolder.draft)}>
                <i className="fa-regular fa-clock"></i>
                <div className="display Draft folder" > {listFolder.draft}</div>
            </div>
        </div>

    </section>
}


