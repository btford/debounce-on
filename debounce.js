module.exports = function debounceOn (fn, timeout, hash) {
  var timeouts = {};

  timeout = timeout || 100;

  hash = hash || defaultHash;

  return function () {
    var key = hash.apply(null, arguments);
    var args = arguments;
    if (!timeouts[key]) {
      timeouts[key] = setTimeout(function () {
        delete timeouts[key];
        fn.apply(null, args);
      }, timeout);

      return function cancel () {
        return timeouts[key] && (clearTimeout(timeouts[key]), true);
      };
    }
    return noop;
  }
}

function defaultHash () {
  return Array.prototype.join.map(arguments, '::');
}

function noop () {}
