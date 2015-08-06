'use strict';

// MODULES //

var gamma = require( 'gamma' );


// FUNCTIONS //

var exp = Math.exp;


// MGF //

/**
* FUNCTION: mgf( x, mu, beta )
*	Evaluates the moment-generating function (MGF) for a Gumbel distribution with location parameter `mu` and scale parameter `beta` at a value `t`.
*
* @param {Number} t - input value
* @param {Number} mu - location parameter
* @param {Number} beta - scale parameter
* @returns {Number} evaluated MGF
*/
function mgf( t, mu, beta ) {
	var lnv = gamma.log( 1 + beta * t ) + mu * t;
	return exp( lnv );
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
