const assert = require('assert');
const parseArgs = require('../bin/parseArgs')
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal([1,2,3].indexOf(4), -1)
        })
    })
})

describe('cf-ls', function(){
    describe('parseArgs', function(){
        it('args test', function(){
            const { args, isAll, isList } = parseArgs;
            console.log(args, isAll, isList)
            assert.equal(isAll,false)
            assert.equal(isList,false)
            assert.equal(args.length,0)
        })
    })
})