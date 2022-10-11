const chokidar = require('chokidar');
const path = require('path');
const cp = require('child_process')

let child;
function runServer() {
  // 启动子进程
  const scriptPath = path.resolve(__dirname,'./DevService.js')
  child = cp.fork(scriptPath, ['--port 8080'])

   // 主进程退出
  child.on('exit', code => {
    if(code){
      process.exit(code)
    }
  })
}

function onChange() {
  // 关闭子进程
  child.kill()

  // 重新启动子进程
  runServer()
}

function runWatcher() {
  // 启动配置监听服务
  const configPath = path.resolve(__dirname, './config.json');
  const watcher = chokidar
    .watch(configPath)
    .on('change', onChange)
    .on('error', (error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = function (arg, opts, cmd) {
  // 1. 通过子进程启动webpack-dev-server服务
  // 1.1 子进程启动可以避免主进程受到影响
  // 1.2 子进程启动可以方便重启，解决webpack-dev-server配置修改后无法重启
  runServer();

  // 2. 监听配置修改
  runWatcher();
};
