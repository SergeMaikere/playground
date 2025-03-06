
/*==================================
=            HASH TABLE            =
==================================*/


class HashTable {
	constructor () {
		this.table = new Array(10)
		this.size = 0
	}

	#setKey = n => n % 10

	insert = value => {
		this.table[ this.#setKey(value) ] = value
		this.size++
	}

	delete = key => {
		const i = this.#setKey(key)
		if ( !this.table[i] ) return false
		this.table[i] = []
		this.size--
		return true
	}

	get = key => this.table[ this.#setKey(key) ]

	indexOf = value => {
		const i = this.#setKey(value)
		return this.table[i] === value ? i : -1 
	}
}

const hashExample = new HashTable();
// insert
hashExample.insert(100);
hashExample.insert(87);
hashExample.insert(86);
hashExample.insert(12);
hashExample.insert(9);
 
 
console.log(hashExample.table); // -> shows the hash table
 
// search
console.log('Has 87', hashExample.indexOf(87)); // found
console.log('Has 10', hashExample.indexOf(10)); // not found
 
// delete
hashExample.delete(12);
 
// showing table after deletion
console.log(hashExample.table);

/*=====  End of HASH TABLE  ======*/

