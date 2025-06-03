/*=================================
=            COMPOSITE            =
=================================*/

interface Item { type: string, name: string, url: string, active: boolean }

interface Group {
	type: string
	name: string
	isExpanded: boolean
	children: ( Item | Group )[]
}

class MenuComponent {

	public name: string

	constructor (name: string) {
		this.name = name
	}

	render = (): string => `<span>${this.name}</span>`

	isComposite = (): boolean => false
}


export class MenuItem extends MenuComponent {

	public url: string
	public active: boolean

	constructor (name: string, url: string, active: boolean = false) {
		super(name)
		this.url = url
		this.active = active
	}

	render = (): string => {
		return (
			`<li class="menu-item${this.active ? ' active' : ''}"><a href="${this.url}">${this.name}</a></li>`
		)
	}
}


export class MenuGroup extends MenuComponent {

	public children: (MenuGroup | MenuItem)[]
	public isExpanded: boolean

	constructor (name: string, isExpanded: boolean = true) {
		super(name)
		this.children = []
		this.isExpanded = isExpanded
	}

	isComposite = ():boolean => true

	add = ( component: MenuGroup | MenuItem ): MenuGroup => {
		this.children.push(component)
		return this
	}

	remove = ( component: MenuGroup | MenuItem ): MenuGroup => {
		const index = this.children.indexOf(component)
		if ( index !== -1 ) this.children.splice(index, 1)
		return this
	}

	render = (): string => {
		return (
			`<li class="menu-group ${this.isExpanded ? 'expanded' : 'collapse'}">`
				+ `<span>${this.name}</span>`
				+ `<ul>`
					+ this.children.map(child => child.render()).join('') 
				+ `</ul>`
			+ `</li>`
		)
	};

	*[Symbol.iterator] (): Generator<MenuGroup | MenuItem> {
		yield this

		for ( let child of this.children ) {
			if ( child instanceof MenuGroup ) yield* child
			if ( child instanceof MenuItem ) yield child
		}
	}
}


export class MenuMaker {

	static create = ( config: Group | Item ): MenuGroup | MenuItem => 'active' in config ? this.createItem(config) : this.createGroup(config)

	private static createItem = ( config: Item ): MenuItem => {
		return new MenuItem(config.name, config.url, config.active)
	}

	private static createGroup = ( config: Group ): MenuGroup => {
		let menu = new MenuGroup(config.name, config.isExpanded)
		if ( config.children ) {
			config.children.forEach( childConfig => menu.children.push(this.create(childConfig)) )
		}
		return menu
	}
}