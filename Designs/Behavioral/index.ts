import { Add, Calculator, Divide, Multiply, Substrac } from "./command";

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