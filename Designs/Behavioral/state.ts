import { timeout } from "../helper"

class Light {
	trafficLight: TrafficLight

	constructor (tLight: TrafficLight) {
		this.trafficLight = tLight
	}

	go = async () => await timeout(3000) 
}

export class TrafficLight {
	private count: number
	private currentState: Light

	constructor () {
		this.count = 0
		this.currentState = new RedLight(this)
	}

	change = async ( newState: Light ) => {
		if ( this.count++ >= 10 ) return
		
		this.currentState = newState
		await this.currentState.go()
	}

	start = async () => await this.currentState.go()
}

class RedLight extends Light {

	constructor (tLight: TrafficLight) {
		super(tLight)
	}

	go = async () => {
		await timeout(5000)
		console.log("Red --> for 30 secondes")
		this.trafficLight.change( new GreenLight(this.trafficLight) )
	}
}


class GreenLight extends Light {

	constructor (tLight: TrafficLight) {
		super(tLight)
	}

	go = async () => {
		await timeout(5000)
		console.log("green --> for 30 secondes")
		this.trafficLight.change( new YellowLight(this.trafficLight) )
	}
}


class YellowLight extends Light {

	constructor (tLight: TrafficLight) {
		super(tLight)
	}

	go = async () => {
		await timeout(5000)
		console.log("Yellow --> for 30 secondes")
		this.trafficLight.change( new RedLight(this.trafficLight) )
	}
}


