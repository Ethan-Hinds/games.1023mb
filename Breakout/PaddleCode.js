class PaddleCode {
    constructor(textInput) {
        this.textInput = textInput;
        this.operators = ["&&", "||", ",", "+", "-", "*", "/", "^", "<=", ">=", ">", "<", "=="];

        this.lines = [];
        this.onLine = 0;

        this.variables = {};

        this.lines = this.textInput.split("\n");
        for (let i = 0; i < this.lines.length; i += 1) {
            this.lines[i] = this.lines[i].replace(/\s+/g, "");
        }
    }

    runCode(variables) {
        this.onLine = 0;
        this.variables = variables;
        
        while (this.onLine < this.lines.length) {
            this.evaluateLine();
            this.onLine += 1;
        }

        paddle.x = parseFloat(this.variables["paddle.x"]);
    }

    evaluateCondition(expression) {
        if (!isNaN(expression)) {
            return parseFloat(expression);
        }
        if (this.variables.hasOwnProperty(expression)) {
            return this.variables[expression];
        }
        if (expression == "true" || expression == "(true)") {
            return true;
        }
        if (expression == "false" || expression == "(false)") {
            return false;
        }
    
        let deepestLevel = 0;
        let level = 0;
        for (let char of expression) {
            if (char == "(") {
                level += 1;
                deepestLevel = Math.max(deepestLevel, level);
            } else if (char == ")") {
                level -= 1;
            }
        }
    
        if (deepestLevel == 0) {
    
            // Find the index of the last operator
            let index = expression.length;
            let operator = "";
            for (let _operator of this.operators) {
                let opIndex = expression.indexOf(_operator);
                if (opIndex > 0 && opIndex < index) {
                    index = opIndex;
                    operator = _operator;
                }
            }
    
            let left = expression.slice(0, index);
            let right = expression.slice(index + operator.length);
    
            if (operator == "&&") {
                return this.evaluateCondition(left) && this.evaluateCondition(right);
            } else if (operator == "||") {
                return (this.evaluateCondition(left) || this.evaluateCondition(right));
            } else if (operator == "<=") {
                return this.evaluateCondition(left) <= this.evaluateCondition(right);
            } else if (operator == ">=") {
                return this.evaluateCondition(left) >= this.evaluateCondition(right);
            } else if (operator == "<") {
                return this.evaluateCondition(left) < this.evaluateCondition(right);
            } else if (operator == ">") {
                return this.evaluateCondition(left) > this.evaluateCondition(right);
            } else if (operator == "+") {
                return parseFloat(this.evaluateCondition(left)) + parseFloat(this.evaluateCondition(right));
            } else if (operator == "-") {
                return parseFloat(this.evaluateCondition(left)) - parseFloat(this.evaluateCondition(right));
            } else if (operator == "*") {
                return parseFloat(this.evaluateCondition(left)) * parseFloat(this.evaluateCondition(right));
            } else if (operator == "/") {
                return parseFloat(this.evaluateCondition(left)) / parseFloat(this.evaluateCondition(right));
            }  else if (operator == "^") {
                return parseFloat(this.evaluateCondition(left)) ** parseFloat(this.evaluateCondition(right));
            } else if (operator == ",") {
                return this.evaluateCondition(left).toString().concat(this.evaluateCondition(right));
            } else if (operator == "==") {
                return this.evaluateCondition(left) == this.evaluateCondition(right);
            }
        } else {
            let level = 0;
    
            let indices = [];
            for (let i = 0; i < expression.length; i += 1) {
                if (expression[i] == "(") {
                    level += 1;
                    if (level == deepestLevel) {
                        indices.push(i + 1);
                    }
                } else if (expression[i] == ")") {
                    if (level == deepestLevel) {
                        indices.push(i);
                        break;
                    }
                    level -= 1;
                }
            }
    
            let section = expression.slice(indices[0], indices[1]);
            let before = expression.slice(0, indices[0] - 1);
            let after = expression.slice(indices[1] + 1);
    
            expression = before + this.evaluateCondition(section) + after;
            return this.evaluateCondition(expression);
        }
    }

    evaluateLine() {
        let line = this.lines[this.onLine];

        if (line.slice(0, 2) == "//") {
            return;
        }
        if (line.slice(0, 2) == "if") {
            let endLine = this.findBlockEnd();

            let statement = line.slice("if".length);


            if (!this.evaluateCondition(statement)) {
                this.onLine = endLine - 1;
            }
        } else if (line.indexOf("=") >= 0) {
            let opIndex = line.indexOf("=")
            let left = line.slice(0, opIndex);
            let right = line.slice(opIndex + "=".length);
            this.variables[left] = this.evaluateCondition(right).toString();
        }
    }

    findBlockEnd() {
        for (let i = this.onLine; i < this.lines.length; i += 1) {
            if (this.lines[i] == "end") {
                return i;
            }
        }
    }
}