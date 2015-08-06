Moment-Generating Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Gumbel](https://en.wikipedia.org/wiki/Gumbel_distribution) distribution moment-generating function (MGF).

The [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) for a [Gumbel](https://en.wikipedia.org/wiki/Gumbel_distribution) random variable is

<div class="equation" align="center" data-raw-text="
	M_X(t) := \mathbb{E}\!\left[e^{tX}\right] =  	\Gamma(1+\beta\,t)\, e^{\mu\,t}" data-equation="eq:mgf_function">
	<img src="https://cdn.rawgit.com/distributions-io/gumbel-mgf/617fdbe59b24b33c08b9a8cc6507576941d05869/docs/img/eqn.svg" alt="Moment-generating function (MGF) for a Gumbel distribution.">
	<br>
</div>

where `mu` is the location parameter and `beta` is the scale parameter.

## Installation

``` bash
$ npm install distributions-gumbel-mgf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mgf = require( 'distributions-gumbel-mgf' );
```

#### mgf( t[, options] )

Evaluates the [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) (MGF) for the [Gumbel](https://en.wikipedia.org/wiki/Gumbel_distribution) distribution. `t` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	t,
	i;

out = mgf( 1 );
// returns ~1

out = mgf( -1 );
// returns +Infinity

t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];
out = mgf( t );
// returns [ ~1, ~0.886, ~1, ~1.329, ~2, ~3.323 ]

t = new Int8Array( t );
out = mgf( t );
// returns Float64Array( [~1,~1,~1,~1,~2,~2] )

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat );
/*
	[ ~1 ~0.886
	  ~1 ~1.329
	  ~2 ~3.323]
*/
```

The function accepts the following `options`:

*	__mu__: location parameter. Default: `0`.
*	__beta__: scale parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Gumbel](https://en.wikipedia.org/wiki/Gumbel_distribution) distribution is a function of 2 parameter(s): `mu`(location parameter) and `beta`(scale parameter). By default, `mu` is equal to `0` and `beta` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = mgf( t, {
	'mu': 0.5,
	'beta': 0.9
});
// returns [ ~1, ~1.137, ~1.586, ~2.547, ~4.557, ~8.898 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.5],
	[2,1],
	[3,1.5],
	[4,2],
	[5,2.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mgf( data, {
	'accessor': getValue
});
// returns [ ~1, ~0.886, ~1, ~1.329, ~2, ~3.323 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.5]},
	{'x':[2,1]},
	{'x':[3,1.5]},
	{'x':[4,2]},
	{'x':[5,2.5]}
];

var out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,~1]},
		{'x':[1,~0.886]},
		{'x':[2,~1]},
		{'x':[3,~1.329]},
		{'x':[4,~2]},
		{'x':[5,~3.323]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var t, out;

t = new Float32Array( [0,0.5,1.5,2,2.5] );

out = mgf( t, {
	'dtype': 'int32'
});
// returns Int32Array( [1,0,1,1,2,3] )

// Works for plain arrays, as well...
out = mgf( [0,0.5,1,1.5,2,2.5], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,0,1,1,2,3] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
	mat,
	out,
	t,
var bool,
	i;

t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

out = mgf( t, {
	'copy': false
});
// returns [ ~1, ~0.886, ~1, ~1.329, ~2, ~3.323 ]

bool = ( t === out );
// returns true

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.5;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = mgf( mat, {
	'copy': false
});
/*
	[ ~1 ~0.886
	  ~1 ~1.329
	  ~2 ~3.323]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [MGF](https://en.wikipedia.org/wiki/Gumbel_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = mgf( null );
	// returns NaN

	out = mgf( true );
	// returns NaN

	out = mgf( {'a':'b'} );
	// returns NaN

	out = mgf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mgf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = mgf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mgf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var mgf = require( 'distributions-gumbel-mgf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = mgf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = mgf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = mgf( mat );

// Matrices (custom output data type)...
out = mgf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-gumbel-mgf.svg
[npm-url]: https://npmjs.org/package/distributions-gumbel-mgf

[travis-image]: http://img.shields.io/travis/distributions-io/gumbel-mgf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/gumbel-mgf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/gumbel-mgf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/gumbel-mgf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/gumbel-mgf.svg
[dependencies-url]: https://david-dm.org/distributions-io/gumbel-mgf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/gumbel-mgf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/gumbel-mgf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/gumbel-mgf.svg
[github-issues-url]: https://github.com/distributions-io/gumbel-mgf/issues
