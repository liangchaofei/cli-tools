const semver = require('semver')
module.exports = function checkNode(minNodeVersion){
    // 获取当前node版本
    const nodeVersion = semver.valid(semver.coerce(process.version))
    return semver.satisfies(nodeVersion, '>='+minNodeVersion)
}