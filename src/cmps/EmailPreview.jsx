import { Link } from "react-router-dom";


export function EmailPreview({email, font}) 
{
    const to = email.sentAt !== null  ? `/email/${email.id}` : `/email/compose/${email.id}`
    return <>
                <Link className="flexEmailPreview" to={to}><div className = {font}>{email.from}</div></Link>
                <Link className="flexEmailPreview" to={to}><div className = {font}>{email.subject}</div></Link>
                <Link className="flexEmailPreview" to={to}><div className = {font}>{email.body}</div></Link>
                <Link className="flexEmailPreview" to={to}><div className = {font}>{email.sentAt}</div></Link>
            </>
         
           
}
