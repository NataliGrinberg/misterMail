import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove ,onUpdateStar, onUpdateIsRead}) {

    function starChangefiled(email) {
        onUpdateStar(email)
    }
    
    function isReadChange(email) {
        onUpdateIsRead(email)
    }
    

    return ( <section>
        <div >
        {emails.map((email) => {
            return (
                   <div className="grid-container" key={email.id}>
                    
                       <div className="email-div2">
                        <input type="checkbox" id="checkbox-list" name="checkbox-list"></input>
                        </div>
                        <div className="email-div3">
                        <div  onClick={(ev) => starChangefiled(email)}>  
                         {email.isStarred  ?
                            <img src={'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png'} />
                         : 
                            <img src={'https://www.gstatic.com/images/icons/material/system_gm/1x/star_border_black_20dp.png'} />
                         }
                            </div>
                    </div>
                    <div className="email-div4" onClick={() => isReadChange(email)}><EmailPreview email={email} /></div>
                    
                    <div className="email-actions">
                        <button onClick={() => onRemove(email.id)}>X</button>
                    </div> 
                </div>
            )
        })}
    
    </div>

    </section>
    )
}


