import { Link } from "react-router-dom";


export function EmailPreview({email}) 
{
    const font = email.isRead ? 'normal' :  'blod' 
    return <> 
            <div  className = {font} ><Link to={`/email/${email.id}`}>{email.subject}</Link></div>
            <div className = {font}><Link to={`/email/${email.id}`}>{email.body}</Link></div>
            <div className = {font} ><Link to={`/email/${email.id}`}>{email.from}</Link></div>

            </>
           
}
 