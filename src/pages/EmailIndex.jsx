import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList";

import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailCompose } from "./EmailCompose";


export function EmailIndex() {


    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
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

    async function onRemoveEmail(emailId) {
        try {
            console.log('emailId', emailId);
            await emailService.remove(emailId)
            setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    async function onCreateNewEmail(emailToSave) {
        try {
            await emailService.save(emailToSave)

            emails.add(emailToSave)
            setEmails(emails)

        } catch (err) {
            console.log('Had issues update isStarred in emails', err);
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
        } catch (err) {
            console.log('Had issues update isStarred in emails', err);
        }
    }


    async function checkboxSelectedAll() {

    }

    async function onUpdateIsRead(emailToSave) {
        try {
            emailToSave.isRead = true
            await emailService.save(emailToSave)

            setEmails(emails.map(email => {
                if (email.id === emailToSave.id) {
                    return { ...email, isRead: true };
                }
                return email;
            }))

        } catch (err) {
            console.log('Had issues update isRead in emails', err);
        }
    }

    if (!emails) return <div>Loading..</div>


    return <section>
        <div className="email-grid-container">
            <div className="emailFilter"><EmailFilter loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} checkboxSelectedAll={checkboxSelectedAll} /></div>
            <div className="emailFolderList"><EmailFolderList loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} /></div>
            <div className="emailList"><EmailList emails={emails} onRemove={onRemoveEmail} onUpdateStar={onUpdateStar} onUpdateIsRead={onUpdateIsRead} /></div>


            {/* <div className="item5"><EmailCompose onCreateNewEmail={onCreateNewEmail}/> </div> */}
        </div>
    </section>





}
