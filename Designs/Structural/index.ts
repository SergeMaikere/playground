import { Calculator, CalculatorAdapter, NewCalculator } from "./adapter";

const old = new Calculator()
console.log(old.operations(2, 2,'add'))

const newC = new NewCalculator()
console.log(newC.add(2, 2))

const adapter = new CalculatorAdapter()
console.log(adapter.operations(2, 2,'add'))