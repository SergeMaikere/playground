import { describe, it } from 'mocha'
import { assert } from 'chai'
import { faker } from '@faker-js/faker'
import { MenuGroup, MenuItem, MenuMaker } from '../../Structural/composite'

interface O {
	menuName: string,
	subMenuName: string,
	itemName1: string,
	itemUrl1: string,
	itemName2: string,
	itemUrl2: string
}

/*----------  Helpers  ----------*/


const makeItem = ( name: string = faker.lorem.word(), active: boolean =  false ) => new MenuItem(name, `www.${name}.com`, active)
const makeGroup = ( name: string = faker.lorem.word(), isExpanded: boolean = true ) => new MenuGroup(name, isExpanded)
const makeItemConfig = ( name: string ) => ( {name: name, url: `www.${name}.com`, active: false } )

const makeFilledItem = ( name: string, active: boolean = false ) => {
	return `<li class="menu-item${active ? ' active' : ''}">`
		+ `<a href="www.${name}.com">${name}</a>`
	+ `</li>`
}

const makeFilledGroup = (): [ string, MenuGroup, O ] => {
	
	const [ menuName, subMenuName, itemName1, itemUrl1, itemName2, itemUrl2 ] = [ 
		faker.lorem.word(), 
		faker.lorem.word(), 
		faker.lorem.word(), 
		faker.internet.url(),
		faker.lorem.word(),
		faker.internet.url()
	]

	const menuGroup = makeGroup(menuName, false)
	.add(
		makeGroup(subMenuName)
		.add(makeItem(itemName1))
	).add(makeItem(itemName2))

	const rendered = `<li class="menu-group collapse">`
		+ `<span>${menuName}</span>`
		+ `<ul>`
			+ `<li class="menu-group expanded">`
				+ `<span>${subMenuName}</span>`
				+ `<ul>`
					+ makeFilledItem(itemName1)
				+ `</ul>`
			+ `</li>`
			+ makeFilledItem(itemName2)
		+ `</ul>`
	+ `</li>`
	return [ rendered, menuGroup, {menuName, subMenuName, itemName1, itemUrl1, itemName2, itemUrl2} ]
}


const CONFIG = {
	name: 'AudioTek9000',
	isExpanded: true,
	children: [
		makeItemConfig('HipHop'),
		makeItemConfig('Pop'),
		makeItemConfig('World'),
		{
			name: 'K-pop',
			isExpanded: true,
			children: [
				makeItemConfig('bts'),
				makeItemConfig('stray-kids'),
				makeItemConfig('itzy')
			]
		}
	]
}



/*---------- Test Functions  ----------*/

const makesMenuItem = () => assert.instanceOf(makeItem(), MenuItem)
const makesMenuGroup = () => assert.instanceOf(makeGroup(), MenuGroup)

const rendersMenuItem = () => {
	const name = faker.lorem.word()
	const menuItem = makeItem(name, true)
	const rendered = makeFilledItem(name, true)

	assert.equal(menuItem.render(), rendered.trim())
}

const rendersMenuGroup = () => {
	const name = 'Categories'
	const menuGroup = makeGroup(name)
	const rendered = `<li class="menu-group expanded">`
	+ `<span>${name}</span>`
	+ `<ul>${ menuGroup.children.map(child => child.render()).join('') }</ul>`
	+ `</li>`

	assert.equal(menuGroup.render(), rendered )
}

const addsItem = () => {
	const [ groupName, itemName ] = [ faker.lorem.word(), faker.lorem.word() ]
	const menuGroup = makeGroup(groupName).add(makeItem(itemName, true))

	const rendered = `<li class="menu-group expanded">`
		+ `<span>${groupName}</span>`
		+ `<ul>`
			+ makeFilledItem(itemName, true)
		+ `</ul>`
	+ `</li>`

	assert.equal(rendered, menuGroup.render())
}

const addsgroup = () => {
	const [ rendered, menuGroup ] = makeFilledGroup()
	assert.equal(rendered, menuGroup.render())
}

const findsChild = () => {
	const [ _r, menuGroup, names ] = makeFilledGroup()
	const child = makeItem('Prodigal')
	const found = menuGroup.add(child).get('Prodigal')
	assert.deepEqual(child, found)
}

const removesItem = () => {
	const [ _r, menuGroup, names ] = makeFilledGroup()

	const rendered = `<li class="menu-group collapse">`
		+ `<span>${names.menuName}</span>`
		+ `<ul>`
			+ `<li class="menu-group expanded">`
				+ `<span>${names.subMenuName}</span>`
				+ `<ul>`
					+ makeFilledItem(names.itemName1)
				+ `</ul>`
			+ `</li>`
		+ `</ul>`
	+ `</li>`
	assert.equal(rendered, menuGroup.remove(names.itemName2).render())
}

const removesGroup = () => {
	const [ _r, menuGroup, names ] = makeFilledGroup()
	const rendered = `<li class="menu-group collapse">`
		+ `<span>${names.menuName}</span>`
		+ `<ul>`
			+ makeFilledItem(names.itemName2)
		+ `</ul>`
	+ `</li>`
	assert.equal(rendered, menuGroup.remove(names.subMenuName).render())
}

const createsMenu = () => {
	const menu = MenuMaker.createGroup(CONFIG)
	const rendered = `<li class="menu-group expanded">`
		+ `<span>AudioTek9000</span>`
		+ `<ul>`
				+ makeFilledItem('HipHop')
				+ makeFilledItem('Pop')
				+ makeFilledItem('World')
				+ `<li class="menu-group expanded">`
					+ `<span>K-pop</span>`
					+ `<ul>`
						+ makeFilledItem('bts')
						+ makeFilledItem('stray-kids')
						+ makeFilledItem('itzy')
					+ `</ul>`
				+ `</li>`
		+ `</ul>`
	+ `</li>`

	assert.equal(rendered, menu.render())
}



/*----------  Main  ----------*/

describe('Composite Pattern',
	() => {
		describe('Menu Item',
			() => {
				it( 'Makes MenuItem', makesMenuItem )
				it( 'Renders menuItem', rendersMenuItem )
			}
		)

		describe('Menu Group',
			() => {
				it( 'Makes MenuGroup', makesMenuGroup )
				it( 'Renders MenuGroup', rendersMenuGroup )
				it( 'Adds Menu Items', addsItem )
				it( 'Adds Menu Groups', addsgroup )
				it( 'Removes Menu Items', removesItem )
				it( 'Removes Menu Groups', removesGroup )
				it( 'Finds child component', findsChild )
			}
		)

		describe('Menu',
			() => {
				it( 'Creates a menu with config', createsMenu )
			}
		)
	}
)