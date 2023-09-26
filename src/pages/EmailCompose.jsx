import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router"
import { emailService } from "../services/email.service";
import { Form, Link } from "react-router-dom";


export function EmailCompose(props) {
    const [email, setEmail] = useState(emailService.createEmail())
    const { onAddEmail, onUpdateEmail ,onSaveDraftEmail} = useOutletContext()
    const { emailId } = useParams()
    // const useRefEmail = useRef(email);
   
   

    useEffect(() => {
         loadEmail()
    }, [])



    

useEffect(() => {

  const interval = setInterval(setEmail((prevEmail) => ({ ...prevEmail,...email })), 5000);
  return () => {
    clearInterval(interval);
  };
}, []);



    async function loadEmail() {
        
        if(emailId)
        {
            try {
                const email = await emailService.getById(emailId)
                setEmail(email)
            } catch (err) {
                navigate('/email')
                console.log('Had issues loading email', err);
            }
        }
        
    }


    async function onSubmitEmail(ev) {
        debugger
        ev.preventDefault()
        email.sentAt = new Date();
        try {
            if (!emailId) onAddEmail(email)
            else onUpdateEmail(email)
        } catch (err) {
            console.log('Had issues adding email', err);
        }
    }
 function onSaveDraftEmailSent(ev)
 {ev.preventDefault()
    debugger
    console.log("email:    "+ email)
    try {
        
       var addedEmail = onSaveDraftEmail(email)
       debugger
       console.log("email:    "+ addedEmail.id)
    } catch (err) {
        console.log('Had issues adding email', err);
    }
 }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }

    const { subject, body, to } = email
    return(
       <section className="email-edit">
            <Link to="/email"><button className="close-btn" onClick={onSaveDraftEmailSent}>X</button></Link>
            <h1>{emailId ? 'Edit' : 'Add'} Email</h1>
        
        <form id="email-compose" className="email-compose" onSubmit={onSubmitEmail}>

            <label htmlFor="to">To</label>
            <input id="to" name ="to" type="text" value={to} onChange={handleChange}></input>
            
            <label htmlFor="subject">Subject</label>
           <input id="subject" name="subject" type="text" value={subject} onChange={handleChange} ></input>
            
           <label htmlFor="body">body</label>
            <input id="body" name ="body" type="text" value={body} onChange={handleChange} ></input>

            <button>send</button>

        </form>
        </section>

   )



}
