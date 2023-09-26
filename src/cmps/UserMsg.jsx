import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service";
export function UserMsg() {
    const [msg, setMsg] = useState(null)
    // { txt: 'Im a user msg', type: 'error' }
    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                onCloseMsg()
            }, 3000);
        })
        return unsubscribe
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return <></>
    return (
        <div className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onCloseMsg}>X</button>
        </div>
    )
}