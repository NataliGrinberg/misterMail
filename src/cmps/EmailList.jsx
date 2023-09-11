import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove }) {
    return ( <table className="email-list">
        
        
        {emails.map((email) => {
            return (
                   <tr className="email-tr" key={email.id}>
                    
                       <td>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                        </td>
                    <td>
                        <div className="star"  onClick={(ev) => {
                            console.log(ev.target)
                            }}></div>
                    </td>
                    <EmailPreview email={email}/>
                    <td className="email-actions">
                        <button onClick={() => onRemove(email.id)}>X</button>
                    </td> 
                </tr>
            )
        })}
    
    </table>
    )
}


