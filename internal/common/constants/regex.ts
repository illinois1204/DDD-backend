export const REGEX = {
    bigTextLatin: new RegExp(/^[0-9a-zA-Z~.,;:\n!@#$%^&*()_+=\-\[\]\\`|{}<>?"'№]+$/),
    bigTextCyrillic: new RegExp(/^[0-9a-zA-Zа-яА-ЯёЁ~.,;:\n!@#$%^&*()_+=\-\[\]\\`|{}<>?"'№]+$/),
    objectId: new RegExp(/^[0-9a-fA-F]{24}$/)
};
