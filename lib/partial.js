'use strict';

// FUNCTIONS //


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

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
