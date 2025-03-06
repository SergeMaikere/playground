/*=====================================
=            BINARY SEARCH            =
=====================================*/

/*----------  Iterative Binary Search  ----------*/

const binarySearch = ( arr, x ) => {
	let low = 0, high = arr.length - 1, mid

	while ( high >= low ) {
		mid = low + Math.floor( (high - low) / 2 )

		if ( arr[mid] === x ) return mid

		arr[mid] > x ? high = mid - 1 : low = mid + 1
	}
	return -1
}

// console.log( binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8) )



/*----------  Recursive Binary Search  ----------*/

const binarySearchR = ( arr, x, low, high ) => {
	if ( high < low ) return -1

	let mid = low + Math.floor( (high - low) / 2 )

	if ( arr[mid] === x ) return mid

	if ( arr[mid] > x ) return binarySearchR(arr, x, low, mid - 1)
	if ( arr[mid] < x ) return binarySearchR(arr, x, mid + 1, high) 
}

// console.log( binarySearchR([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 0, 9) )


/*=====  End of BINARY SEARCH  ======*/


/*=============================================
=            TWO-POINTER TECHNIQUE            =
=============================================*/


/**
 * Verifies if the 2 elements in a sorted array can equal the specified number when additionned
 *
 * @param      {number[]}   arr     The arr
 * @param      {number}   x       The Target
 * @return     {boolean} 
 */
const twoPointer = (arr, x) => {
	let low = 0, high = arr.length - 1, sum

	while ( low < high ) {
		sum = arr[low] + arr[high]

		if ( sum === x ) return true

		sum > x ? high-- : low++
	}
	return false
}

console.log( twoPointer([1, 2, 3, 4, 5 , 6], 10) )

/*=====  End of TWO-POINTER TECHNIQUE  ======*/
