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
		if ( !node ) return null
		
		if ( data > node.data ) node.right = this.remove(data, node.right)
		if ( data < node.data ) node.left = this.remove(data, node.left)
		if ( data === node.data ) node = this.#handleSuccession(node)
		return node
	}

	inOrder = ( node = this.root ) => {
		if ( !node ) return null

		this.inOrder(node.left)
		console.log(node.data + ' ')
		this.inOrder(node.right)
	}

	preOrder = ( node = this.root ) => {
		if ( !node ) return null

		console.log(node.data + ' ')
		this.preOrder(node.left)
		this.preOrder(node.right)
	}

	postOrder = ( node = this.root ) => {
		if ( !node ) return null

		this.inOrder(node.left)
		this.inOrder(node.right)
		console.log(node.data + ' ')
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
		if ( this.#isLeafy(node) ) node = null
		if ( this.#isRighty(node) ) node = node.right 
		if ( this.#isLefty(node) ) node = node.left 
		if ( this.#hasTwoChildren(node) ) node = this.#handleWill(node)
		return node
	}

	#handleWill = node => {
		const succ = this.#getSuccessor(node)
		node.data = succ.data
		node.right = this.remove(succ.data, node.right)
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
bts.insert(100)
bts.insert(20)
bts.insert(200)
bts.insert(10)
bts.insert(30)
bts.insert(150)

bts.inOrder()
bts.preOrder()
bts.postOrder()
