var debounce = require('../debounce');

describe('', function () {
  beforeEach(function () {
    jasmine.Clock.useMock();

    // ಠ_ಠ
    // see: https://github.com/mhevery/jasmine-node/issues/276
    spyOn(global, 'clearTimeout').andCallFake(function() {
      return jasmine.Clock.installed.clearTimeout.apply(this, arguments);
    });
  });

  it('should have a default timeout of 100', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy);
    debounceSpy();
    expect(spy).not.toHaveBeenCalled();
    jasmine.Clock.tick(100);
    expect(spy).toHaveBeenCalled();
  });

  it('should not debounce when called with different arguments', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy);
    debounceSpy(1);
    debounceSpy(2);
    expect(spy).not.toHaveBeenCalled();
    jasmine.Clock.tick(100);
    expect(spy.callCount).toBe(2);
  });

  it('should call a delegate just once when called more than once', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy);
    debounceSpy();
    debounceSpy();
    expect(spy).not.toHaveBeenCalled();
    jasmine.Clock.tick(100);
    expect(spy).toHaveBeenCalled();
    expect(spy.callCount).toBe(1);
  });

  it('should allow a custom timeout', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy, 10);
    debounceSpy();
    expect(spy).not.toHaveBeenCalled();
    jasmine.Clock.tick(10);
    expect(spy.callCount).toBe(1);
  });

  it('should allow a custom hash function', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy, function (a) {
      return a;
    });
    debounceSpy(1);
    debounceSpy(1, 2);
    debounceSpy(2, 2);
    jasmine.Clock.tick(100);
    expect(spy.callCount).toBe(2);
  });

  it('should allow a custom timeout and hash function', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy, 10, function (a) {
      return a;
    });
    debounceSpy(1);
    debounceSpy(1, 2);
    debounceSpy(2, 2);
    jasmine.Clock.tick(10);
    expect(spy.callCount).toBe(2);
  });

  it('should return a cancellation function', function () {
    var spy = jasmine.createSpy();
    var debounceSpy = debounce(spy);
    var cancel = debounceSpy();

    expect(cancel()).toBe(true);
    jasmine.Clock.tick(100);
    expect(spy).not.toHaveBeenCalled();
  });
});
