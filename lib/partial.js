'use strict';

// MODULES //

var gamma = require( 'gamma' );


// FUNCTIONS //

var exp = Math.exp;


// PARTIAL //

/**
* FUNCTION: partial( mu, beta )
*	Partially applies location parameter `mu` and scale parameter `beta` and returns a function for evaluating the moment-generating function (MGF) for a Gumbel distribution.
*
* @param {Number} mu - location parameter
* @param {Number} beta - scale parameter
* @returns {Function} MGF
*/
function partial( mu, beta ) {

	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment-generating function (MGF) for a Gumbel distribution.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
		var lnv = gamma.log( 1 + beta * t ) + mu * t;
		return exp( lnv );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
