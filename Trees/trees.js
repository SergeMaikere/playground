/*===================================
=            BINARY TREE            =
===================================*/


class Node {
	constructor ( data ) {
		this.data = data
		this.left = null
		this.right = null
	}
}

class BinaryTree {
	constructor () {
		this.root = null
	}

	insert = data => this.#isEmpty() ? this.#setRoot(data) : this.#addNode(data, this.root)

	remove = ( data, node = this.root ) => {
		const badNode = this.find(data, node)
		return badNode ? this.#handleSuccession(badNode) : console.log(`Data ${data} is not in this Tree`)
	}

	find = ( data, node = this.root ) => {
		if ( !node ) return null
		if ( node.data === data ) return node
		
		if ( data > node.data ) return this.find(data, node.right)
		if ( data < node.data ) return this.find(data, node.left)
	}

	#addNode = ( data, node ) => {
		if ( data === node.data ) return console.log(`Data ${data} is already in this Tree`)
		if ( data > node.data ) return node.right ? this.#addNode(data, node.right) : this.#setNodeChild(data, node, 'right')
		if ( data < node.data ) return node.left ? this.#addNode(data, node.left) : this.#setNodeChild(data, node, 'left')
	}

	#setRoot = data => {
		this.root = new Node(data)
		return this.root
	}

	#setNodeChild = ( data, node, direction ) => {
		node[direction] = new Node(data)
		return node
	}

	#handleSuccession = node => {
		if ( this.#isLeafy(node) ) return null
		if ( this.#isRighty(node) ) return node.right 
		if ( this.#isLefty(node) ) return node.left 
		if ( this.#hasTwoChildren(node) ) return this.#handleWill(node)
	}

	#handleWill = node => {
		const succ = this.#getSuccessor(node)
		node.data = succ.data
		this.remove(succ.data, node.right)
		return node
	}

	#getSuccessor = node => {
		let curr = node.right 
		while ( curr && curr.left ) curr = curr.left
		return curr
	}

	#isEmpty = () => this.root === null
	#isLeafy = node => !node?.left && !node?.right
	#isLefty = node => node?.left && !node?.right
	#isRighty = node => !node?.left && node?.right
	#hasTwoChildren = node => node?.left && node?.right
}

const bts = new BinaryTree()
bts.insert(15)
bts.insert(7)
bts.insert(7)
bts.insert(19)
bts.insert(18)
bts.insert(24)
bts.insert(24)
bts.insert(6)
bts.remove(19)
bts.remove(39)
console.log(bts)
