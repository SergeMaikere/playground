
/*=============================
=            STACK            =
=============================*/


/*----------  Stack with array implementation  ----------*/

class Stack {
	constructor () {
		this.items = []
	}

	pop = () => this.isEmpty() ? 'Stack is empty' : this.items.pop()

	push = element => this.items.push(element)

	isEmpty = () => this.items.length === 0

	peek = () => this.items[ this.items.length - 1 ]

	size = () => this.items.length

	print = () => console.log(this.items.toString())
}

// let stack = new Stack()
// stack.push(10);
// stack.push(20); 
// stack.push(30); 
// console.log(stack.peek());
// console.log(stack.pop());  
// console.log(stack.size()); 
// console.log(stack.isEmpty());
// stack.print();


/*----------  Stack with Linked list implementation  ----------*/


class Node {
	constructor (value) {
		this.value = value
		this.next = null
	}
}

class StackLink {
	constructor () {
		this.head = null
		this.size = 0
	}

	push = value => {
		let newbie = new Node(value)
		newbie.next = this.head
		this.head = newbie
		this.size++
	}

	pop = () => {
		if ( this.isEmpty() ) return null
		const value = this.head.value
		this.head = this.head.next
		this.size--
		return value
	}

	peek = () => this.isEmpty() ? null : this.head.value

	isEmpty = () => this.size === 0

	print = () => {
		let [ values, curr ] = [ [], this.head ] 

		while ( curr ) {
			values.push(curr.value)
			curr = curr.next
		}
		console.log( values.join(' | ') )
	}
}

// const stack = new StackLink();
// stack.push(10);
// stack.push(20);
// stack.push(30);
// stack.print();
// console.log("Top Element:", stack.peek()); 
// console.log("Popped Element:", stack.pop()); 
// stack.print(); 


/*=====  End of STACK  ======*/


/*=============================
=            QUEUE            =
=============================*/


/*----------  Queue with Array implementation  ----------*/

class Queue {
	constructor () {
		this.items = []
	}

	enqueue = element => this.items.push(element)

	dequeue = () => this.isEmpty() ? null : this.items.shift()

	peek = () => this.isEmpty() ? null : this.items[0]

	isEmpty = () => this.items.length === 0

	size = () => this.items.length

	print = () => console.log( this.items.join(' -> ') )
}


// Example usage:
// const queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.print();
// console.log(queue.dequeue());
// console.log(queue.peek()); 
// console.log(queue.size()); 



/*----------  Queue with Linked List implementation  ----------*/


class QueueLink {

	constructor () {
		this.head = null
		this.tail = null
		this._size = 0
	}

	get size () { return this._size }

	enqueue = value => {
		let newbie = new Node(value)
		if ( this.isEmpty() ) {
			this.head = newbie
			this.rear = newbie
		}
		
		if ( !this.isEmpty() ) {
			this.rear.next = newbie
			this.rear = newbie
		}
		this._size++
	}

	dequeue = () => {
		if ( this.isEmpty() ) return null
		const first = this.head 
		
		this.head = this.head.next
		if ( !this.head ) this.rear = null		
		this._size--
		
		return first.value
	}

	peek = () => this.isEmpty() ? null : this.head.value

	isEmpty = () => this._size === 0

	print = () => {
		let [ values, curr ] = [ [], this.head ] 

		while ( curr ) {
			values.push(curr.value)
			curr = curr.next
		}
		console.log( values.join(' -> ') )
	}
}



// Example Usage:
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.print(); 

console.log(queue.dequeue());
queue.print();

console.log(queue.peek()); 
console.log(queue.size());
console.log(queue.isEmpty())



/*=====  End of QUEUE  ======*/
