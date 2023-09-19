import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    loggedinUser
}


const STORAGE_KEY = 'emails'

_createEmails()


async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    console.log("filterBy", filterBy)
    if (filterBy) {
        let { subject = '', body = '', isStarred = null, isRead = null, removedAt = null, from = '' } = filterBy
        console.log(filterBy)
        emails = emails.filter(email => {
            return (isStarred !== null ? email.isStarred === isStarred : true)
                && (isRead !== null ? email.isRead === isRead : true)
                && (from !== '' ? email.from === from : true)
                && (email.subject.toLowerCase().includes(subject.toLowerCase())
                    || email.body.toLowerCase().includes(body.toLowerCase()))
                && (removedAt !== null && email.removedAt !== null ? email.removedAt === removedAt : true)
        })

    }
    console.log(emails)
    return emails
}



function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}


function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}


function createEmail() {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        star
    }
}

function getDefaultFilter() {
    return {
        subject: '',
        body: '',
        isStarred: null,
        isRead: null,
        removedAt: false,
        from: ''
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e101', subject: 'Email 1 A', body: 'Would love to catch up sometimes 1', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: loggedinUser.email, to: 'gr@gmail.com' },
            { id: 'e102', subject: 'Email 2 AB', body: 'Would love to catch up sometimes 2', isRead: true, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e103', subject: 'Email 3 ABC', body: 'Would love to catch up sometimes 3', isRead: true, isStarred: true, sentAt: 1551133930594, removedAt: null, from: loggedinUser.email, to: 'gr@gmail.com' },
            { id: 'e104', subject: 'Email 4!', body: 'Would love to catch up sometimes 4', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e105', subject: 'Email 5', body: 'Would love to catch up sometimes 5', isRead: false, isStarred: true, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e106', subject: 'Email 6', body: 'Would love to catch up sometimes 6', isRead: true, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e107', subject: 'Email 7', body: 'Would love to catch up sometimes 7', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e108', subject: 'Email 11 A', body: 'Would love to catch up sometimes 1', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: loggedinUser.email, to: 'gr@gmail.com' },
            { id: 'e109', subject: 'Email 12 AB', body: 'Would love to catch up sometimes 2', isRead: true, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e110', subject: 'Email 13 ABC', body: 'Would love to catch up sometimes 3', isRead: true, isStarred: true, sentAt: 1551133930594, removedAt: null, from: loggedinUser.email, to: 'gr@gmail.com' },
            { id: 'e111', subject: 'Email 14!', body: 'Would love to catch up sometimes 4', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e112', subject: 'Email 15', body: 'Would love to catch up sometimes 5', isRead: false, isStarred: true, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e113', subject: 'Email 16', body: 'Would love to catch up sometimes 6', isRead: true, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },
            { id: 'e114', subject: 'Email 17', body: 'Would love to catch up sometimes 7', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'natali@gmail.com', to: 'gr@gmail.com' },

        ]
        emails.map((email) => {
            email.sentAt = new Date(email.sentAt)
            return email
        }
        );
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}


