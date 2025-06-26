import { describe, it } from 'mocha'
import { assert } from 'chai'
import BlogDataFinder, { BlogData, InfoType } from '../../Structural/facade'


const getsData = ( type: InfoType, id: number, expected: BlogData ) => {
	return async () => {
		const finder = new BlogDataFinder()
		const result = await finder.get(type, id)
		assert.deepEqual( result, expected )
	}
}

const expectedPost = {
	userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

const expectedComment = {
	postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
}

const expectedPhotos = {
	albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
}

const expectedUser = {
	id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
}

describe( 'Facade Pattern', 
	() => {
		it( 'Gets posts', getsData('posts', 1, expectedPost) )
		it( 'Gets comments', getsData('comments', 1, expectedComment) )
		it( 'Gets photos', getsData('photos', 1, expectedPhotos) )
		it( 'Gets user', getsData('users', 1, expectedUser) )
	}
)