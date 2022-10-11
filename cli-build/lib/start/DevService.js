const detect = require('detect-port');
const inquirer = require('inquirer');
// const Service = require('../service/Service')

(async function(){
    const DEFAULT_PORT = 8000;
    const params = process.argv.slice(2);
    const paramObj = {};
    params.forEach(param => {
        const paramsArr = param.split(' ')
        paramObj[paramsArr[0].replace('--','')] = paramsArr[1]
    })

    let defaultPort = paramObj['port'] || DEFAULT_PORT;
    defaultPort = parseInt(defaultPort,10)

    try{
        const newPort = await detect(defaultPort)
        if(newPort === defaultPort){
            console.log(`端口号 ${defaultPort} 可以使用`)
        }else{
            // 命令行交互
            const questions = {
                type: 'list',
                name: 'answer',
                message:`${defaultPort}端口号已被占用，是否启用新端口号 ${newPort}?`,
            };
            const { answer } = await inquirer.prompt(questions)
            if(!answer){
                process.exit(1)
            }
            process.env.NODE_ENV = 'development'
            const args = {
                port: newPort
            }
            // const service = new Service(args)
            // service.start()
        }
    }catch(e){
        console.error(e)
    }
})()