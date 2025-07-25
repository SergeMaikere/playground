const ordered = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1]

/*===================================
=            BUBBLE SORT            =
===================================*/


/**
 * Compares adjacent elements and swaps them if order is wrong
 *
 * @param      {number[] | string[]}  arr     The arr
 * @return     {number[] | string[]}  sorted array
 */
export const bubbleSort = arr => {
	let n = arr.length, swapped

	for (let i = 0; i < n; i++) {
		swapped = false

		for (let j = 1; j < n - i; j++) {

			if ( arr[j - 1] > arr[j]) {
				[ arr[j - 1], arr[j] ] = [ arr[j], arr[j - 1] ]
				swapped = true
			}
		}
		if ( !swapped ) break // If array is already sorted break the loop
	}
	return arr
}

// console.log( bubbleSort(ordered) )

/*=====  End of BUBBLE SORT  ======*/



/*======================================
=            SELECTION SORT            =
======================================*/


/**
 * Selection Sort is a simple comparison-based algorithm. 
 * It divides the array into two parts: sorted and unsorted. 
 * In each iteration, it selects the smallest (or largest) element from the unsorted part 
 * and moves it to the sorted part.
 *
 * @param      {number[] | string[]}  arr     The arr
 * @return     {number[] | string[]}  sorted array
 */
export const selectionSort = arr => {
	let n = arr.length, min

	for (let i = 0; i < n; i++) {
		min = i

		for (let j = i + 1; j < n; j++) {
			if ( arr[min] > arr[j] ) min = j
		}
		[ arr[i], arr[min] ] = [ arr[min], arr[i] ]
	}
	return arr
}

// console.log( selectionSort(reverse) )

/*=====  End of SELECTION SORT  ======*/


/*======================================
=            INSERTION SORT            =
======================================*/



/**
 * Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. 
 * It works by iterating through the array and inserting each element 
 * into its correct position in the already sorted portion of the array.
 *
 * @param      {number[] | string[]}  arr     The arr
 * @return     {number[] | string[]}  sorted array
 */
export const insertionSort = arr => {
	let n = arr.length, val, j

	for (let i = 1; i < n; i++) {
		val = arr[i]
		j = i - 1
		while ( j >= 0 && arr[j] > val ) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = val
	}
	return arr
}

// console.log( insertionSort(reverse) )

/*=====  End of INSERTION SORT  ======*/


/*==================================
=            MERGE SORT            =
==================================*/


/**
 * Merge Sort is a divide-and-conquer algorithm. 
 * It divides the array into two halves, recursively sorts them, and merges the sorted halves.
 *
 * @param      {number[] | string[]}  arr     The arr
 * @return     {number[] | string[]}  sorted array
 */
export const mergeSort = arr => {
	if ( arr.length <= 1 ) return arr
	const mid = Math.floor( arr.length / 2 )
	const left = mergeSort(arr.slice(0, mid))
	const right = mergeSort(arr.slice(mid))
	return merge(left, right)
}

const merge = ( left, right ) => {
	let [ result, l, r ] = [ [], 0, 0 ]
	while ( l < left.length && r < right.length ) {
		if ( left[l] < right[r] ) {
			result.push(left[l])
			l++
		}

		if ( right[r] < left[l] ) {
			result.push(right[r])
			r++
		}
	}
	return result.concat( left.slice(l), right.slice(r) )
}

// console.log( mergeSort([38, 27, 43, 3, 9, 82, 10]) )

/*=====  End of MERGE SORT  ======*/


/*=========================================
=            QUICK SORT LOMUTO            =
=========================================*/



/**
 * Quick Sort is another divide-and-conquer algorithm. 
 * It works by selecting a 'pivot' element from the array 
 * and partitioning the other elements into two sub-arrays, 
 * according to whether they are less than or greater than the pivot.
 *
 * @param      {number[] | string[]}  arr     The arr
 * @return     {number[] | string[]}   sorted array
 */
export const quickSort = arr => {
	if ( arr.length <= 1 ) return arr
	let [ left, right, pivot ] = [ [], [], arr[arr.length - 1] ]
	
	for (let i = 0; i < arr.length - 1; i++) {
		if ( arr[i] < pivot ) left.push(arr[i])
		if ( arr[i] > pivot ) right.push(arr[i])
	}
	return [ ...quickSort(left), pivot, ...quickSort(right) ]
}

// console.log( quickSort([10, 2, 1, 9, 12, 5]) )

/*=====  End of QUICK SORT LOMUTO  ======*/


