const detect = require('detect-port');
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
            console.log(`端口号 ${defaultPort} 被占用，建议使用新端口号：${newPort}`)
        }
    }catch(e){
        console.error(e)
    }
})()