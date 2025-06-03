import { describe, it } from 'mocha'
import { assert } from 'chai'
import { faker } from '@faker-js/faker'
import { MenuGroup, MenuItem } from '../../Structural/composite'

const getName = (): string => faker.lorem.word()
const getUrl = (): string => faker.internet.url()
const makeItem = ( name: string = getName(), url: string = getUrl(), active: boolean =  false ) => new MenuItem(name, url, active)
const makeGroup = ( name: string = getName(), isExpanded: boolean = true ) => new MenuGroup(name, isExpanded)

const makesMenuItem = () => assert.instanceOf(makeItem(), MenuItem)
const makesMenuGroup = () => assert.instanceOf(makeGroup(), MenuGroup)

const rendersMenuItem = () => {
	const [ name, url ] = [ 'Facebook', 'www.facebook.com' ]
	const menuItem = makeItem(name, url, true)
	const rendered = `<li class="menu-item active"><a href="${url}">${name}</a></li>`

	assert.equal(menuItem.render(), rendered.trim())
}

const rendersMenuGroup = () => {
	const name = 'Categories'
	const menuGroup = makeGroup(name)
	const rendered = `<li class="menu-group expanded">`
	+ `<span>${name}</span>`
	+ `<ul>${ menuGroup.children.map(child => child.render()).join('') }</ul>`
	+ `</li>`

	assert.equal(menuGroup.render(), rendered.trim() )
}

const addsItem = () => {
	const [ groupName, itemName, url ] = [ 'Products', 'Bio Products', 'www.bioproducts.com' ]
	const menuGroup = makeGroup('Products')
	menuGroup.add(makeItem(itemName, url, true))

	const rendered = `<li class="menu-group expanded">`
		+ `<span>${groupName}</span>`
		+ `<ul>`
			+ `<li class="menu-item active">`
				+ `<a href="${url}">${itemName}</a>`
			+ `</li>`
		+ `</ul>`
	+ `</li>`

	assert.equal(rendered, menuGroup.render())
}

const addsgroup = () => {
	const menuName = 'Music'
	const subMenuName = 'Hard Rock'
	const [ itemName, itemUrl ] = [ 'Metallica', 'www.black-album.com' ]

	const menuGroup = makeGroup(menuName, false)
	menuGroup.add(makeGroup(subMenuName).add(makeItem(itemName, itemUrl)))

	const rendered = `<li class="menu-group collapse">`
		+ `<span>${menuName}</span>`
		+ `<ul>`
			+ `<li class="menu-group expanded">`
				+ `<span>${subMenuName}</span>`
				+ `<ul>`
					+ `<li class="menu-item">`
						+ `<a href="${itemUrl}">${itemName}</a>`
					+ `</li>`
				+ `</ul>`
			+ `</li>`
		+ `</ul>`
	+ `</li>`

	assert.equal(rendered, menuGroup.render())
}

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
			}
		)
	}
)