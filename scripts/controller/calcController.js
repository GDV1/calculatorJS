class CalcController {

    // Constructor
    constructor() {
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
    }


    clearAll() {
        this._operation = [];
    }


    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = 'Error';
    }

    addOperation(value) {
        this._operation.push(value);
        console.log(this._operation);
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
                break;

            case 'multiplicacao':
                break;

            case 'subtracao':
                break;

            case 'divisao':
                break;

            case 'porcento':
                break;

            case 'igual':
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
