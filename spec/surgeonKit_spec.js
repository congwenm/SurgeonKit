/*eslint-env node, jasmine */
/*eslint no-console: false*/


import tools from '../src/surgeonKit';

let {expand} = tools;

describe('.expand', function () {
  it('should turn 6 into [0,1,2,3,4,5]', function () {
    expect(expand(6)).toEqual([0,1,2,3,4,5])
  })
})

describe('.dissect', function () {
  let {dissect} = tools;

  it('if index is valid, should dissect array into two array (with second array starting at index)', function () {
    var org = [0,1,2,3,4,5]
    expect(dissect(org, 3)).toEqual([[0,1,2], [3,4,5]]);
  })

  it('actual vertical board' , function () {
    var org = [0,1,2,3,4,5,6,7,8,9];
    expect(dissect(org, 5, 6)).toEqual([[0,1,2,3,4],[5],[6,7,8,9]])
  })

  it('if indices are all valid, should dissect array into (indices + 1) arrays', function () {
    var org = [0,1,2,3,4,5,6,7,8,9,10];
    expect(dissect(org, 3,5,7)).toEqual([[0,1,2],[3,4],[5,6],[7,8,9,10]]);

    // demo in natural numbers
    var org = [1,2,3,4,5,6,7,8,9,10,11];
    expect(dissect(org, 3,5,7)).toEqual([[1,2,3],[4,5],[6,7],[8,9,10,11]]);
  })

  it('if any index out of bound, return original array', function () {
    var org = [0,1,2,3,4];

    // without wrapper, this spec wont catch and error will be caught in the spec.
    expect(function() {
      dissect(org, 10)
    }).toThrow();
  })
})


describe('.every', function () {
  let {every} = tools;
  var arr = [1,2,3,4,5,6,7,8];

  describe('happy path', function () {
    it('performs the function for every 2 adjacent elements', function () {
      expect(every(2) (arr, function (a, b) {
        return a + b;
      })).toEqual([3,5,7,9,11,13,15]);
    })

    it('performs the function for every 3 adjacent elements', function () {
      expect(every(3) (arr, function (a, b, c) {
        return a + b + c;
      })).toEqual([6,9,12,15,18,21]);
    })

    it('performs the function for every 4 adjacent elements', function () {
      expect(every(4) (arr, function (a, b, c, d) {
        return a + b + c + d;
      })).toEqual([10, 14, 18, 22, 26]);
    })
  })
})

let {acceptUntil} = tools;
describe('.acceptUntil', function () {
  var arr = tools.expand(8);

  it('should have values 0 to 4', function () {
    expect(acceptUntil(arr, val => val > 4)).toEqual([0,1,2,3,4])
  })
});


let {defineState} = tools;
describe('.defineState', function () {
  beforeEach(function () {
    this.spy = jasmine.createSpy();

    this.Robot = class Robot {
      constructor() {
        this.weight = '2 kilotons';
      }
    }
    this.robot = new this.Robot;

    defineState(this.Robot, ['broken', 'fixed', 'inTransit'], this.spy);
  })

  it('expect robot.state to be first of states passed in', function () {
    expect(this.robot.isBroken()).toBe(true);
  })

  it('expect setter methods to work', function () {
    this.robot.fixed()
    expect(this.robot.isFixed()).toBe(true);
  })

  it('expect setter methods to kick in spy', function () {
    this.robot.inTransit();
    expect(this.spy).toHaveBeenCalledWith('inTransit');
    expect(this.spy.calls.all()).toEqual([{
      object: this.robot,
      args: ['inTransit'],
      returnValue: undefined, // this is needed
    }])
  })

  describe('with inheritance', function () {
    beforeEach(function () {
      class Spudnik extends this.Robot {}
      this.spudnik = new Spudnik;
    })

    it('should propagate to children', function () {
      expect(this.spudnik.isBroken()).toBe(true)
    })

    it('expect setter methods to kick in spy', function () {
      this.spudnik.fixed();
      expect(this.spy).toHaveBeenCalledWith('fixed');
      expect(this.spy.calls.all()).toEqual([{
        object: this.spudnik,
        args: ['fixed'],
        returnValue: undefined, // this is needed
      }])
    })

    it('can optionally send a callback in setter', function () {
      var callback = jasmine.createSpy();
      this.spudnik.broken(callback);
      expect(this.spudnik.isBroken()).toBe(true);
      expect(callback).toHaveBeenCalledWith('broken')
    })
  })
})


let {cx} = tools;
describe('.cx', function () {
  var car = {
    usage: ['travel', 'pickup'],
    getUsage: function () {
      return this.usage;
    }
  }

  it('should get class name values if defined', function () {
    expect(cx({
      header: car.getUsage().indexOf('travel') !== -1,
      bordered: true
    })).toBe('header bordered')

    car.usage = ['work'];
    expect(cx({
      header: car.getUsage().indexOf('travel') !== -1,
      bordered: true
    })).toBe('bordered');
  })

  it('should allow dynamic key as of es2015 and babel', function () {
    let str = 'blah-everywhere'
    expect(cx({
      [`hi-${str}`]: true,
      [`howru-${str}`]: true,
      [`bye-${str}`]: false
    })).toBe('hi-blah-everywhere howru-blah-everywhere')
  })
})

let { debounce } = tools;
describe('.debounce', function() {
  let spy, debouncedFunc;
  beforeEach(()=> {
    spy = jasmine.createSpy()
    debouncedFunc = debounce(spy, 2000);
    jasmine.clock().install();
  });

  afterEach(()=> jasmine.clock().uninstall())

  it('should debounce calls when invoke more than once', function() {
    debouncedFunc()
    debouncedFunc()
    debouncedFunc()
    debouncedFunc()
    jasmine.clock().tick(2000);
    expect(spy.calls.count()).toBe(1);
  })

  it('should debounce calls made under the time (1s) frame apart', function() {
    setTimeout(debouncedFunc, 0)
    setTimeout(debouncedFunc, 1000)
    setTimeout(debouncedFunc, 2000)
    setTimeout(debouncedFunc, 3000)
    jasmine.clock().tick(3000);
    expect(spy.calls.count()).toBe(0);
    jasmine.clock().tick(2000);
    expect(spy.calls.count()).toBe(1);
  })

  it('should call as many times as it takes if calls are made longer apart', function() {
    setTimeout(debouncedFunc, 0)
    setTimeout(debouncedFunc, 2000)
    setTimeout(debouncedFunc, 4000)
    setTimeout(debouncedFunc, 6000)
    jasmine.clock().tick(6000);
    expect(spy.calls.count()).toBe(3);
    jasmine.clock().tick(1000);
    expect(spy.calls.count()).toBe(3);
    jasmine.clock().tick(1000);
    expect(spy.calls.count()).toBe(4);
  })

  it('composite should match expectation', function() {
    setTimeout(debouncedFunc, 1)
    setTimeout(debouncedFunc, 4)

    jasmine.clock().tick(2000);
    expect(spy.calls.count()).toBe(0)

    jasmine.clock().tick(1);
    expect(spy.calls.count()).toBe(0)

    jasmine.clock().tick(3);
    expect(spy.calls.count()).toBe(1)
  })
});
