class CalcController {
    
    // Constructor
    constructor() {
        this._locale = 'pt-BR'; // Get user locale 

        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
    }

    // Initialize app
    initialize() {
        
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    // Events on keyboard
    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e => {
                console.log(btn.className.baseVal.replace("btn-", ""));
            });
        });
    }

    // Update Date and Time
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

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