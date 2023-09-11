import { Link } from "react-router-dom";


export function EmailPreview({ email}) 
{
    return <> <td><Link to={`/email/${email.id}`}>{email.subject}</Link></td>
            <td><Link to={`/email/${email.id}`}>{email.body}</Link></td>
            <td><Link to={`/email/${email.id}`}>{email.from}</Link></td>
            </>
           
}
 