const chokidar = require('chokidar')
const path = require('path')
function runServer(){
    // 启动webpack服务

}

function runWatcher(){
    // 启动配置监听服务
    const configPath = path.resolve('./config.json')
    chokidar.watch(path.resolve(process.cwd(),'lib/start')).on('all',(eventName, path) => {
        console.log(eventName, path)
    })

}

module.exports = function(arg, opts, cmd){
    // 1. 通过子进程启动webpack-dev-server服务
    // 1.1 子进程启动可以避免主进程受到影响
    // 1.2 子进程启动可以方便重启，解决webpack-dev-server配置修改后无法重启
    runServer()


    // 2. 监听配置修改
    runWatcher()


}