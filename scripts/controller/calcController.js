class CalcController {

    // Constructor
    constructor() {
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = []; // Save last operation
        this._locale = 'pt-BR'; // Get user locale 
        this._displayCalcEl = document.querySelector("#display"); // Select element display
        this._dateEl = document.querySelector("#data"); // Select element date
        this._timeEl = document.querySelector("#hora"); // Select element hora

        // Methods
        this.initialize();
        this.initButtonsEvents();
    }

    // Initialize app
    initialize() {

        this.setDisplayDateTime();

        // Update timer 
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.setLastNumberToDisplay(); // Clear display
    }

    // Set AC method
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay(); // Clear display
    }

    // Set CE method
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay(); // Clear display
    }

    // Set error message
    setError() {
        this.displayCalc = 'Error';
    }

    // Gets the last operation entered by the user
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    // Array of operations for validation
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    // Assigns the last operation entered by the user to define what should be done next
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    // Performs the calculation according to array data
    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {
            this._lastNumber = this.getResult(false);
        }


        let result = this.getResult(); 

        if (last === '%') {

            result = (result/100);
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);
        }
        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length-1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    // Update display with last number entered
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        // Show numbers
        this.displayCalc = lastNumber;
    }


    // Add operations (numbers and signs) in the array _operation
    addOperation(value) {
        // Not a number
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                // Change the operator
                this.setLastOperation(value);

            } else {
                this.pushOperation(value);

                // Update display
                this.setLastNumberToDisplay();
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                // Is Number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                // Update display
                this.setLastNumberToDisplay();
            }
        }
    }

    addDot() {
        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    // Selection method for buttons
    execBtn(value) {
        switch (value) {
            // Operations
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            default:
                this.setError();
                break;

            // Numbers
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
        }
    }

    // Adding multiple events
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    // Events on keyboard
    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            })
        });
    }

    // Update Date and Time
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    // Getters and Setters
    // Get and Set to Display Time
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    // Get and Set to Display Date 
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    // Get and Set to Display Numbers
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    // Get and Set for Current Date
    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}
