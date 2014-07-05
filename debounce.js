module.exports = function debounceOn (fn, timeout, hash) {
  var timeouts = {};

  timeout = typeof timeout === 'number' ? timeout : (hash = timeout, 100);
  hash = typeof hash === 'function' ? hash : defaultHash;

  return function () {
    var key = hash.apply(null, arguments);
    var args = arguments;
    if (typeof timeouts[key] === 'undefined') {
      timeouts[key] = setTimeout(function () {
        delete timeouts[key];
        fn.apply(null, args);
      }, timeout);
    }
    return function cancel () {
      if (timeouts[key]) {
        clearTimeout(timeouts[key]);
        delete timeouts[key];
        return true;
      }
      return false;
    };
  };
};

function defaultHash () {
  return Array.prototype.join.call(arguments, '::');
}
