import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service";
import { Form, Link } from "react-router-dom";

export function EmailCompose(onCreateNewEmail) {
    const [email, sendEmail] = useState(null)
    //const params = useParams()
    //const navigate = useNavigate()

    // useEffect(() => {
    //     // loadEmail()
    // }, [params.emailId])


    // async function loadEmail() {
    //     try {
    //         const email = await emailService.getById(params.emailId)
    //         setEmail(email)
    //     } catch (err) {
    //         navigate('/email')
    //         console.log('Had issues loading email', err);
    //     }
    // }

    // if (!email) return <div>Loading..</div>


    async function sendEmailToSave(ev) {
        //sendEmail()
    }

    return <>

        <form id="email-compose" className="email-compose" onSubmit={sendEmailToSave}>

            <div>New Message </div>

            {/* 
       <div>
       <label htmlFor="type">Search</label>
       <input className = 'email-filter-search' type="text" id="subject"
         /> 
   </div> */}
            <button>send</button>
        </form>

    </>



}
