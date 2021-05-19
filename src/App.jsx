import { useState } from "react";

function App() {
	const [ prevValue, setPrevValue ] = useState("")
	const [ result, setResult ] = useState("0");
	const [ formula, setFormula ] = useState("");
	const [ lastKey, setLastKey ] = useState("");
	const [consecutive, setConsecutive] = useState(false);

	const handleMaxDigits = () => {
		setResult("LIMITED DIGITS")
		setTimeout(() => {
			setResult(prevValue)
		}, 1000)
	}

	const handleClear = () => {
		setResult("0");
		setFormula("");
		setPrevValue("");
		setLastKey("");
		setConsecutive(false);
	}

	const handleDecimal = (e) => {
		const decimal = e.target.value;
		if (prevValue.indexOf(".") > -1)
			return;
		if (prevValue !== "" && prevValue.length > 18) {
			handleMaxDigits();
			return;
		}
		let newVal = (prevValue === "") ? "0" + decimal : prevValue + decimal;
		setLastKey(decimal);
		setPrevValue(newVal);
		setResult(newVal);
		setFormula(formula + decimal);
		setConsecutive(false);
	}

	const handleDigit = (e) => {
		const value = e.target.value;
		if (prevValue !== "" && prevValue.length > 18) {
			handleMaxDigits();
			return;
		}
		if (prevValue === "0" && value === "0")
			return;

		let newVal = prevValue + value;
		if (prevValue === "0")
			newVal = newVal.slice(1, newVal.length);
		setLastKey(value);
		setPrevValue(newVal);
		setResult(newVal);
		setFormula(formula + value);
		setConsecutive(false);
	}

	const handleOperator = (e) => {
		const operator = (e.target.value === "x") ? "*" : e.target.value;
		let prevFormula = formula;

		if (lastKey === "*" || lastKey === "/")
			if (operator === "*" || operator === "/")
				return;
			else if (operator === "+")
				prevFormula = prevFormula.slice(0, formula.length - 1);

		if (lastKey === "+" || lastKey === "-") {
			if (operator === "*" || operator === "/")
				prevFormula = prevFormula.slice(0, formula.length - 1);
			if (/(\*-)|(\/-)$/.test(formula))
				prevFormula = prevFormula.slice(0, formula.length - 2);
			if (consecutive === 2)
				return;
		}

		setLastKey(operator);
		setResult(operator)
		setFormula(prevFormula + operator)
		setPrevValue("");
		if (lastKey === operator)
			setConsecutive(true)
	}

	const handleCalculateResult = () => {
		let expression = formula;
		expression = expression
					.replace(/(\+\+)|(\-\-)/g, "+")
					.replace(/(\+\-)|(\-\+)/g, "-")
					.replace(/(\*\+)|(\/\+)/g, "+")
					.replace(/^\./, "0.")

		if (/[x+‑/]$/.test(expression))
			expression = expression.slice(0, -1);

		const resultVal = eval(expression);
		setResult(resultVal);
		setPrevValue(resultVal);
		setFormula(resultVal);
		setLastKey("");
		setConsecutive(false);
	}

	return (
		<div className="App">
			<div className="calculator">
				<div className="display__container">
					<div className="formula">{formula}</div>
					<div className="result" id="display">{result}</div>
				</div>

				<div class="buttons__container">
					<button id="clear" onClick={handleClear}>AC</button>
					<button id="decimal" onClick={handleDecimal} value=".">.</button>
					<button id="add" onClick={handleOperator} value="+">+</button>
					<button id="subtract" onClick={handleOperator} value="-">-</button>
					<button id="multiply" onClick={handleOperator} value="x">x</button>
					<button id="divide" onClick={handleOperator} value="/">/</button>
					<button id="one" onClick={handleDigit} value="1">1</button>
					<button id="two" onClick={handleDigit} value="2">2</button>
					<button id="three" onClick={handleDigit} value="3">3</button>
					<button id="four" onClick={handleDigit} value="4">4</button>
					<button id="five" onClick={handleDigit} value="5">5</button>
					<button id="six" onClick={handleDigit} value="6">6</button>
					<button id="seven" onClick={handleDigit} value="7">7</button>
					<button id="eight" onClick={handleDigit} value="8">8</button>
					<button id="nine" onClick={handleDigit} value="9">9</button>
					<button id="zero" onClick={handleDigit} value="0">0</button>
					<button id="equals" onClick={handleCalculateResult}>=</button>
				</div>
			</div>
			<h1>Created by <a href="https://github.com/huyleminh" target="_blank" rel="noopener noreferrer">Huy Le Minh</a></h1>
		</div>
	);
}

export default App;
