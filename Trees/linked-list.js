
class Node {
	constructor (data) {
		this.data = data
		this.next = null
	}
}

class LinkedList {
	constructor () {
		this.head = null
		this.size = 0
	}

    /**
     * Adds the specified data.
     *
     * @param      {any}  data    The data
     */
    add = data => {
    	!this.head ? this.setHead(data) : this.toQueu(data)
    	this.size++
    } 


    
	/**
	 * Insert data at specified index
	 *
	 * @param      {any}  data    The data
	 * @param      {number}  index   The index
	 */
	insertAt = ( data, index ) => {
		if (index < 0 || index > this.size) return console.log('Please enter a valid index')
		index === 0 ? this.insertHead(data) : this.toIndex(data, index)
		this.size++
	}


    
    /**
     * Removes data at given index
     *
     * @param      {number}  index   The index
     * @return     {any}  { deleted data }
     */
    removeFrom = index => {
		if (index < 0 || index > this.size) return console.log('Please enter a valid index')
		const data = index === 0 ? this.deleteHead() : this.deleteToIndex(index)
		this.size--
		return data
    }

    /**
     * Removes specified data.
     *
     * @param      {any}  data    The data
     * @return     {any | -1}  deleted data or -1 if not in the list
     */
    removeData = data => {
    	if ( this.head && data === this.head.data ) return this.deleteHead()

    	let leftNode = this.head, rightNode = this.head.next
    	while ( rightNode ) {
    		if ( rightNode.data === data ) {
    			leftNode.next = rightNode.next
    			this.size--
    			return rightNode.data
    		}
    		leftNode = rightNode
    		rightNode = rightNode.next
    	}
    	return -1
    }

    /**
     * Returns index of specified data
     *
     * @param      {any}  data    The data
     * @return     {number}  index of the data or -1 if not in the list
     */
    indexOf = data => {
    	let curr = this.head, i = 0
    	while ( curr ) {
    		if ( curr.data == data ) return i
    		curr = curr.next
    		i++
    	}
    	return -1
    }


    /**
     * Determines if empty.
     *
     * @return     {boolean}  True if empty, False otherwise.
     */
    isEmpty = () => this.size === 0

    /**
     * Prints a list.
     */
    printList = () => {
    	let curr = this.head, str = ''
    	while ( curr ) {
    		str += `| ${curr.data} `
    		curr = curr.next
    	}
    	console.log('\nList', str + '\n')
    }


	/**
	 * Sets the head.
	 *
	 * @param      {any}  data    The data
	 */
	setHead = data => this.head = new Node(data)

	/**
	 * Insert specified data at the top of the list
	 *
	 * @param      {any}  data    The data
	 */		
	insertHead = (data) => {
		this.head.next = this.head
		this.setHead(data)
	}

	/**
	 * Goes through list to insert data at index
	 *
	 * @param      {any}  data    The data
	 * @param      {number}  index   The index
	 */
	toIndex = ( data, index ) => {
		const node = new Node(data)
		let rightNode = this.head, i = 0, leftNode
		while ( i < index ) {
			leftNode = rightNode
			rightNode = rightNode.next
			i++
		}
		node.next = rightNode
		leftNode.next = node
	}


	/**
	 * Goes through list to add specified data at queue
	 *
	 * @param      {any}  data    The data
	 */
	toQueu = data => {
		let curr = this.head
		while ( curr.next ) curr = curr.next
		curr.next = new Node(data)
	}


    /**
     * Deletes head.
     *
     * @return     {any}  data of the removed head (...gruesome)
     */
    deleteHead = () => {
    	this.head = this.head.next
    	return this.head.data
    }


    /**
     * Goes through list to remove data at specified index
     *
     * @param      {number}  index   The index
     * @return     {any}  removed data
     */
    deleteToIndex = index => {
    	let rightNode = this.head, i = 0, leftNode
    	while ( i < index ) {
    		leftNode = rightNode
    		rightNode = rightNode.next
    		i++
    	}
    	leftNode.next = rightNode.next
    	return rightNode.data
    }
}



/*=================================
=            EXERCICES            =
=================================*/

// creating an object for the
// Linkedlist class
let ll = new LinkedList();

// testing isEmpty on an empty list
// returns true
console.log(ll.isEmpty());

// adding element to the list
ll.add(10);

// prints 10
ll.printList();

// adding more elements to the list
ll.add(20);
ll.add(30);
ll.add(40);
ll.add(50);

// returns 10 20 30 40 50
ll.printList();

// prints 50 from the list
console.log("is element removed ? " + ll.removeData(50));

// prints 10 20 30 40
ll.printList();

// returns 3
console.log("Index of 40 " + ll.indexOf(40));

// insert 60 at second position
// ll contains 10 20 60 30 40
ll.insertAt(60, 2);

ll.printList();

// returns false
console.log("is List Empty ? " + ll.isEmpty());

// remove 3rd element from the list
console.log(ll.removeFrom(3));

// prints 10 20 60 40
ll.printList();

/*=====  End of EXERCICES  ======*/

