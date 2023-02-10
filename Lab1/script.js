const form  = document.querySelector("#calc-form");
const maxValue = document.querySelector("#max-value");
const minValue = document.querySelector("#min-value");
const avgValue = document.querySelector("#avg-value");
const sumValue = document.querySelector("#sum-value");

const calc = ()=> {
    const inputs = [];
    for (let i = 0; i < form.children.length; i++) {
            inputs.push(form.children[i].querySelector("input").value * 1);
    }

    calcMax(inputs);
    calcMin(inputs);
    calcAvg(inputs);
    calcSum(inputs);
}

calcMax  = (valuesArr) => {
    maxValue.textContent = Math.max(...valuesArr).toString();
}

calcMin = (valuesArr) => {
    minValue.textContent = Math.min(...valuesArr).toString()
}

calcAvg = (valuesArr) => {
    const average = (valuesArr.reduce((a, b) => a + b) / valuesArr.length).toFixed(2);
    avgValue.textContent = average.toString();
}

calcSum = (valuesArr) => {
    sumValue.textContent = valuesArr.reduce((partialSum, a) => partialSum + a);
}

form.addEventListener("change", () => calc());
