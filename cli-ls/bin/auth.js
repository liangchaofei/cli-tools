const fs = require('fs')
module.exports = function auth (mode){
    let authStr = ''
    // user
    const canUserRead = mode & fs.constants.S_IRUSR;
    const canUserWrite = mode & fs.constants.S_IWUSR;
    const canUserExecute = mode & fs.constants.S_IXUSR;

    // group
    const canGroupRead = mode & fs.constants.S_IRGRP;
    const canGroupWrite = mode & fs.constants.S_IWGRP;
    const canGroupExecute = mode & fs.constants.S_IXGRP;

    // other
    const canOtherRead = mode & fs.constants.S_IROTH;
    const canOtherWrite = mode & fs.constants.S_IWOTH;
    const canOtherExecute = mode & fs.constants.S_IXOTH;

    canUserRead ? authStr+= 'r' : authStr+='-'
    canUserWrite ? authStr+= 'w' : authStr+='-'
    canUserExecute ? authStr+= 'x' : authStr+='-'


    canGroupRead ? authStr+= 'r' : authStr+='-'
    canGroupWrite ? authStr+= 'w' : authStr+='-'
    canGroupExecute ? authStr+= 'x' : authStr+='-'

    canOtherRead ? authStr+= 'r' : authStr+='-'
    canOtherWrite ? authStr+= 'w' : authStr+='-'
    canOtherExecute ? authStr+= 'x' : authStr+='-'

    return authStr;
}