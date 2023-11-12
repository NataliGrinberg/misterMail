import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList";

import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Outlet, useNavigate } from "react-router";
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSearchParams } from "react-router-dom";


export function EmailIndex() {


    const [emails, setEmails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const navigate = useNavigate()
    const [unreadCount, setUnreadCount] = useState(null)
    const [sortBy, setSortBy] = useState(emailService.getSortFromParams(searchParams))
  


    useEffect(() => {
        setSearchParams(filterBy)
        loadEmails() 
    }, [filterBy])

    // useEffect(() => {
    //     setSearchParams(sortBy)
    //     loadEmails() 
    // }, [sortBy])


    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }


    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
            setUnreadCount(emailService.getUnreadCount)
            debugger
           
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

 
    async function onRemoveEmail(emailToRemove) {
        try {

            if (emailToRemove.removedAt) {
                await emailService.remove(emailToRemove.id)
                setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailToRemove.id))
            }
            else {


                emailToRemove.removedAt = new Date();
                await emailService.save(emailToRemove)
                // setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailToRemove.id))

                setEmails(emails.map(email => {
                    if (email.id === emailToRemove.id) {
                        return { ...email, removedAt: emailToRemove.removedAt };
                    }
                    return email;
                }))
                showSuccessMsg('Successfully removed')
                loadEmails()
            }

        } catch (err) {
            showErrorMsg('can not remove!')
            console.log('Had issues update removedAt in emails', err);
        }
    }


    async function onSaveDraftEmail(email) {
        try {
            const addedEmail = await emailService.save(email)
            if (email.id) {
                setEmails((prevEmails) => prevEmails.map(email => email.id === addedEmail.id ? addedEmail : email))


            }
            else {
                setEmails((prevEmails) => prevEmails.map(email => email.id === addedEmail.id ? addedEmail : email))


            }
            loadEmails()
            navigate('/email')
        } catch (err) {
            console.log('Had issues adding email', err);
        }
    }

    async function onAddEmail(email) {
        try {
            const addedEmail = await emailService.save(email)
            showSuccessMsg('Successfully added Email')
            // return addedEmail
            //setEmails((prevEmails) => prevEmails.map(email => email.id === addedEmail.id ? addedEmail : email))

            setEmails((prevEmails) => [addedEmail, ...prevEmails])
            // loadEmails() 
            navigate('/email')
        } catch (err) {
            showErrorMsg('Failed to save email')
            console.log('Had issues adding email', err);
        }
    }

    async function onUpdateEmail(emailUpdate) {
        try {
            const addedEmail = await emailService.save(emailUpdate)
            setEmails((prevEmails) => prevEmails.map(email => email.id === addedEmail.id ? addedEmail : email))
            showSuccessMsg('Successfully update Email')
            loadEmails()
            navigate('/email')
        } catch (err) {
            showErrorMsg('Failed to update email')
            console.log('Had issues adding email', err);
        }
    }



    async function onUpdateStar(emailToSave) {
        try {
            emailToSave.isStarred = emailToSave.isStarred ? false : true
            await emailService.save(emailToSave)

            setEmails(emails.map(email => {
                if (email.id === emailToSave.id) {
                    return { ...email, isStarred: emailToSave.isStarred };
                }
                return email;
            }))
            showSuccessMsg('Successfully update Star')
        } catch (err) {
            showErrorMsg('Failed to update Star')
            console.log('Had issues update isStarred in emails', err);
        }
    }


    async function checkboxSelectedAll() {

    }

    async function onUpdateIsRead(emailToSave) {
        try {
            let updateUnreadCount
            if(emailToSave.isRead == false)
            {
                emailToSave.isRead = true;

                updateUnreadCount =-1 
            }
            else{
                emailToSave.isRead = false;
                updateUnreadCount = 1
            }
            
            await emailService.save(emailToSave)
            setUnreadCount(unreadCount+updateUnreadCount) 
            
            setEmails(emails.map(email => {
                if (email.id === emailToSave.id) {
                    return { ...email, isRead: emailToSave.isRead};
                }
                return email;
            }))
            showSuccessMsg('Successfully update un/Read')
        } catch (err) {
            showErrorMsg('Failed to update Read')
            console.log('Had issues update isRead in emails', err);
        }
    }

    if (!emails) return <div>Loading..</div>

    const {folder, subject, body, isStarred, isRead, sentAt, removedAt, from} = filterBy
    return <section>
        <div className="email-grid-container">
            <div className="emailFilter"><EmailFilter loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={{ subject, body, isRead}} checkboxSelectedAll={checkboxSelectedAll}/></div>
            <div className="emailFolderList"><EmailFolderList loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={{ folder, sentAt, removedAt, isStarred, from, isRead }} unreadCount= {unreadCount} /></div>
            <div className="emailList"><EmailList emails={emails} onRemove={onRemoveEmail} onUpdateStar={onUpdateStar} onUpdateIsRead={onUpdateIsRead} /></div>
        </div>
        <Outlet context={{ onAddEmail, onUpdateEmail, onSaveDraftEmail }} />
    </section>





}
