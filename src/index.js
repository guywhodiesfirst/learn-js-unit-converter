class Unit {
    constructor(metric, imperial, factor, htmlEl) {
        this.metric = metric
        this.imperial = imperial
        this.factor = factor
        this.htmlEl = htmlEl
    }

    stringConstructor(value) {
        return `
        ${value} ${this.metric} = ${(value*this.factor).toFixed(3)} ${this.imperial} |
         ${value} ${this.imperial} = ${(value/this.factor).toFixed(3)} ${this.metric}
         `
    }
}

let units = [
    new Unit("meters", "feet", 3.28084, document.getElementById("res-1")),
    new Unit("liters", "gallons", 0.264172, document.getElementById("res-2")),
    new Unit("kilograms", "pounds", 2.2046, document.getElementById("res-3"))
]

let convertBtn = document.getElementById("convert-btn")
let numberInput = document.getElementById("number-input")

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('number-input');

    function adjustWidth() {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'pre';
        span.style.fontSize = getComputedStyle(input).fontSize;
        span.style.fontFamily = getComputedStyle(input).fontFamily;
        span.style.fontWeight = getComputedStyle(input).fontWeight;
        span.textContent = input.value || input.placeholder;
        document.body.appendChild(span);
        
        input.style.width = (span.offsetWidth + 50) + 'px';
        document.body.removeChild(span);
    }

    numberInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    input.addEventListener('input', adjustWidth);
    adjustWidth();
});

convertBtn.addEventListener("click", () => {
    let value = numberInput.value
    for(let i = 0; i < units.length; i++) {
        units[i].htmlEl.textContent = units[i].stringConstructor(value)
    }
})