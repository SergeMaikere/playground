import { Add, Calculator, Divide, Multiply, Substrac } from "./command";
import { Display, WeatherStation } from "./observer";

const myCalculator = new Calculator()

myCalculator
.execute(new Add(100))
.execute(new Substrac(50))
.execute(new Multiply(4))
.execute(new Add(48))
.undo()
.execute(new Divide(2))

console.log('\nCommand')
console.log(myCalculator.getCurrentValue())


const weather9 = new WeatherStation()
const device1 = new Display('Homer Tab')
const device2 = new Display('Homer Smartphone')
const device3 = new Display('Homer Tv')
const device4 = new Display('Homer Smartwatch')

console.log('\nObserver')
weather9
.addObserver(device1)
.addObserver(device2)
.addObserver(device3)
.setTemperature(13)

console.log('\n')
weather9
.removeObserver(device2)
.addObserver(device4)
.setTemperature(19)