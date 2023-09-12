import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList";

import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailFilter } from "../cmps/EmailFilter";


export function EmailIndex() {


    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    useEffect(() => {
        loadEmails()
    }, [filterBy]) 


    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    // function onSetFilterStar(fieldsToUpdate) {
    //     setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    // }


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

    async function onUpdateStar(emailToSave) {

        try {
         
        emailToSave.isStarred = emailToSave.isStarred ? false : true
        await emailService.save(emailToSave)

        setEmails( emails.map(email => {
            if (email.id === emailToSave.id) {
              return {...email, isStarred: emailToSave.isStarred};
            }
            return email;
          }))
      

        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }


    async function onUpdateIsRead(emailToSave) {
        
        try {
         
        emailToSave.isRead = true
        await emailService.save(emailToSave)

        setEmails( emails.map(email => {
            if (email.id === emailToSave.id) {
              return {...email, isRead: true};
            }
            return email;
          }))
      

        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    if (!emails) return <div>Loading..</div>


return <section>
    <div className="grid-container">
    <div className="item1"><button onClick={()=>{console.log('press button')}}>Compose</button></div>
    <div className="item2"><EmailFolderList loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} /></div>
    <div className="item3"><EmailList emails={emails} onRemove={onRemoveEmail} onUpdateStar={onUpdateStar} onUpdateIsRead={onUpdateIsRead}/></div>  
    <div className="item4">Right</div>
    <div className="item5"><EmailFilter loggedinUser={emailService.loggedinUser} onSetFilter={onSetFilter} filterBy={filterBy} /></div>
    </div>
</section>


{/* <button onClick={onClearFilter}>Clear filter</button> */}




}
