/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Check whether an element is a finite number
	isFiniteNumber = require( 'validate.io-finite' ),

	// Module to be tested:
	mgf = require( './../lib/matrix.js' );

// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix mgf', function tests() {

	var validationData = require( './fixtures/matrix.json' ),
		mu = validationData.mu,
		beta = validationData.beta,
		out,
		mat,
		d1,
		d2;

	d1 = new Float64Array( validationData.data );
	d2 = new Float64Array( validationData.expected.map( function( d ) {
		return d === 'Inf' ? Infinity : d;
	}) );

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( mgf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			mgf( matrix( [10,10] ), mat, mu, beta );
		}
	});

	it( 'should evaluate the  moment-generating function for each matrix element', function test() {
		var actual, i;

		actual = matrix( [5,5], 'float64' );
		actual = mgf( actual, mat, mu, beta );


		for ( i = 0; i < actual.length; i++ ) {
			if ( isFiniteNumber( actual.data[ i ] ) && isFiniteNumber( out.data[ i ] ) ) {
				assert.closeTo( actual.data[ i ], out.data[ i ], 1e-14 );
			}
		}
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( mgf( out, mat, mu, beta ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( mgf( out, mat, mu, beta ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( mgf( out, mat, mu, beta ).data, expected );
	});

});
