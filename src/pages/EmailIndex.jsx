import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList";

import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailCompose } from "./EmailCompose";
import { Outlet, useNavigate } from "react-router";
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service";


export function EmailIndex() {


    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const navigate = useNavigate()


    useEffect(() => {
        loadEmails()
    }, [filterBy])


    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }


    // function onClearFilter() {
    //     setFilterBy(robotService.getDefaultFilter())
    // }

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    // async function onRemoveEmail(emailId) {
    //     try {
    //         console.log('emailId', emailId);
    //         await emailService.remove(emailId)
    //         setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
    //     } catch (err) {
    //         console.log('Had issues loading emails', err);
    //     }
    // }
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
            debugger
            emailToSave.isRead = !emailToSave.isRead
            await emailService.save(emailToSave)

            setEmails(emails.map(email => {
                if (email.id === emailToSave.id) {
                    return { ...email, isRead: emailToSave.isRead };
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


    return <section>
        <div className="email-grid-container">
            <div className="emailFilter"><EmailFilter loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} checkboxSelectedAll={checkboxSelectedAll} /></div>
            <div className="emailFolderList"><EmailFolderList loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} /></div>
            <div className="emailList"><EmailList emails={emails} onRemove={onRemoveEmail} onUpdateStar={onUpdateStar} onUpdateIsRead={onUpdateIsRead} /></div>
            {/* <Outlet context={{onSendEmail, name: 'Natali'}}/> */}
        </div>
        <Outlet context={{ onAddEmail, onUpdateEmail, onSaveDraftEmail }} />
    </section>





}
