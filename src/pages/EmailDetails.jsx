import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service";
import { Form, Link } from "react-router-dom";

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])


    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (err) {
            navigate('/email')
            console.log('Had issues loading email', err);
        }
    }

    if (!email) return <div>Loading..</div>

    return (<>
        <table className="email-details">
            <td>
                <tr className="email-subject">Subject: {email.subject}</tr>
                <tr>
                    <td className="email-from">From: {email.from}</td>
                    <td>              </td>
                    <td className="email-sentAt">{email.sentAt}</td>
                    <td>isStarred : {email.isStarred}</td>
                </tr>
                <tr className="email-to"> to : {email.to}</tr>
                <tr className="article-table"><article>{email.body}</article></tr>
            </td>
        </table>
        <Link to="/email">Go back</Link>
    </>
    )
}
