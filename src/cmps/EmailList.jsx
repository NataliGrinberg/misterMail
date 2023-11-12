import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove ,onUpdateStar, onUpdateIsRead}) {

    function starChangefield(email) {
        onUpdateStar(email)
    }
    
    function isReadChange(email) {
        onUpdateIsRead(email)
    }
    

    return ( <section className="email-list-class">
        <div>
            
        {emails.map((email) => {
            const font = email.isRead ? 'normal' :  'blod' 
            return (
                   <div className= {"list-grid-container  " + font} key={email.id}>
                    
                       <div className="email-checkbox-list">
                        <input type="checkbox" id={"checkbox-list-row  "+ email.id} name="checkbox-list-row"></input>
                        </div>
                        <div className="email-isStarred-list">
                        <div  onClick={(ev) => starChangefield(email)}>  
                         {email.isStarred  ?
                            <img src={'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png'} />
                         : 
                            <img src={'https://www.gstatic.com/images/icons/material/system_gm/1x/star_border_black_20dp.png'} />
                         }
                            </div>
                    </div>
                    <div className="email-preview" onClick={() => {if(email.isRead === false) isReadChange(email)}} ><EmailPreview email={email} font={font}/></div>
                    
                    <div className="email-actions">
                        <button onClick={() => onRemove(email)}><i className="fa fa-trash"></i></button>
                    </div> 
                    
                    <div className="email-action-read">
                    {email.isRead  ?
                            <button onClick={() => isReadChange(email)}><i className="fa-regular fa-envelope"></i> </button>
                            : 
                            <button onClick={() => isReadChange(email)}> <i className="fa-regular fa-envelope-open"></i>    </button> }
                    </div> 
                   
                    
                </div>
            )
        })}
    
    </div>
    </section>
    )
}


