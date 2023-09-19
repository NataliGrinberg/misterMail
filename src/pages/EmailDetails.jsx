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
        <article className="email-details">
           
                {/* <div  onClick={() => starChangefield(email)}>
                    {email.isStarred ?
                        <img src={'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png'} />
                        :
                        <img src={'https://www.gstatic.com/images/icons/material/system_gm/1x/star_border_black_20dp.png'} />
                    }
                </div> */}
                <div className="email-subject">Subject: {email.subject}</div>

                <div className="email-from">From: {email.from}</div>
                <div className="email-to"> to : {email.to}</div>

                <div className="email-sentAt">{email.sentAt}</div>
                <div className="article-body"><article>{email.body}</article></div>
           
            {/* <div className="email-actions">
                <button onClick={() => onRemove(email.id)}>X</button>
            </div> */}
              <Link className="email-details-go-back" to="/email">Go back</Link>
        </article>
    
    </>
    )
}
