#!/usr/bin/env node

const fs = require('fs')
const parse = require('./parseArgs')
const auth = require('./auth')
const  getFileType = require('./getFileType')
const  getFileUser = require('./getFileUser')
const  getFileSizeAndDate = require('./getFileSizeAndDate')

const dir = process.cwd();

const { isAll, isList, args} = parse()

let files = fs.readdirSync(dir);
let output = '';
if(!isAll){
// 过滤 以 . 开头的文件
files = files.filter(file => file.indexOf('.') !== 0)
}
if(!isList){
    // 格式化
    files.forEach(file => output+=file + '\t')
}else{
    // ls -l
    files.forEach((file, index) => {
        const stat= fs.statSync(file)
        const isDir = stat.isDirectory();
        let size = 1;
        if(isDir){
            // 下级文件
            const subDir = fs.readdirSync(file)
            size = subDir.length;
        }
        const mode = stat.mode;
        const authStr = auth(mode)
        const fileType = getFileType(mode)
        const fileUser = getFileUser(stat)
        const fileSizeDate  = getFileSizeAndDate(stat);

        if(index === files.length - 1){
            output+= fileType + authStr + ' ' + size  + '\t' + fileUser + '  '+ fileSizeDate + '  ' + file
        }else{
            output+= fileType + authStr  + ' ' + size+ '\t' + fileUser + '  ' + fileSizeDate + '  ' + file + '\n'
        }
    })
}
// 打印
console.log(output)