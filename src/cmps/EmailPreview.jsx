import { Link } from "react-router-dom";


export function EmailPreview({email, font}) 
{
    const to = email.sentAt !== null  ? `/email/${email.id}` : `/email/compose/${email.id}`
    return <>
                <Link to={to}><div className = {font}>{email.from}</div></Link>
                <Link to={to}><div className = {font}>{email.subject}</div></Link>
                <Link to={to}><div className = {font}>{email.body}</div></Link>
            </>
         
           
}
