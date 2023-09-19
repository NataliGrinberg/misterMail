import { Link } from "react-router-dom";


export function EmailPreview({email, font}) 
{
    return <>
                <Link to={`/email/${email.id}`}><div className = {font}>{email.from}</div></Link>
                <Link to={`/email/${email.id}`}><div className = {font}>{email.subject}</div></Link>
                <Link to={`/email/${email.id}`}><div className = {font}>{email.body}</div></Link>
            </>
         
           
}
