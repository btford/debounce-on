# debounce-on

debounce a function based on its arguments

## Install

```shell
$ npm install debounce-on
```


## Use

For instance, you might want to rate-limit a client on a per-endpoint basis:

```javascript
var debounceOn = require('debounce-on');

var debounceHttp = debounceOn(sendHttpRequest);
debounceHttp('https://google.com');
debounceHttp('https://google.com');
debounceHttp('https://yahoo.com');

// ... wait 100ms

// one request is sent to:
// - google.com
// - yahoo.com
```

You can pass a hash function that determines what calls the debouncer should coalesce:

```javascript
var debounceOn = require('debounce-on');

var debounceHttp = debounceOn(sendHttpRequest, function (url) {
  return (url.match(/^https?:\/\/([^\/])\/?/) || {})[1];
});
debounceHttp('https://google.com/a');
debounceHttp('https://google.com/b');
debounceHttp('https://yahoo.com');

// ... wait 100ms

// one request is sent to:
// - google.com/a
// - yahoo.com
```


## API

```javascript
ver debouncedFn = debounceOn(fn, [timeout], [hash fn]);
```

### `fn`
The function to debounce.

### `timeout`
The timeout in `ms`.

### `hashFn`
Function that determines what calls the debouncer should coalesce.


## License
MIT
