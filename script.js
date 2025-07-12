const units = {
  Length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701
  },
  Weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274
  },
  Temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K"
  },
  Area: {
    "square meter": 1,
    "square kilometer": 0.000001,
    "square foot": 10.7639,
    "square yard": 1.19599,
    acre: 0.000247105,
    hectare: 0.0001
  },
  Volume: {
    liter: 1,
    milliliter: 1000,
    cubic_meter: 0.001,
    gallon: 0.264172,
    pint: 2.11338
  },
  Speed: {
    "m/s": 1,
    "km/h": 3.6,
    "mph": 2.23694,
    "knot": 1.94384
  },
  Time: {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600,
    day: 1 / 86400
  }
};

const categorySelect = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

function populateCategories() {
  for (let cat in units) {
    let opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  }
  populateUnits(); // trigger initial unit list
}

function populateUnits() {
  const selected = categorySelect.value;
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  for (let unit in units[selected]) {
    const option1 = document.createElement("option");
    option1.value = unit;
    option1.textContent = unit;
    const option2 = option1.cloneNode(true);
    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  }

  convertUnits(); // update on change
}

function convertUnits() {
  const category = categorySelect.value;
  const inputVal = parseFloat(document.getElementById("input").value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(inputVal)) {
    document.getElementById("output").value = "";
    updateSummary("", "", "", "");
    return;
  }

  if (category === "Temperature") {
    const result = convertTemperature(inputVal, from, to);
    document.getElementById("output").value = result.toFixed(2);
    updateSummary(inputVal, from, to, result.toFixed(2));
    return;
  }

  const base = inputVal / units[category][from];
  const converted = base * units[category][to];
  document.getElementById("output").value = converted.toFixed(4);
  updateSummary(inputVal, from, to, converted.toFixed(4));
}

function convertTemperature(value, from, to) {
  if (from === to) return value;

  if (from === "Celsius") {
    if (to === "Fahrenheit") return value * 9 / 5 + 32;
    if (to === "Kelvin") return value + 273.15;
  } else if (from === "Fahrenheit") {
    if (to === "Celsius") return (value - 32) * 5 / 9;
    if (to === "Kelvin") return (value - 32) * 5 / 9 + 273.15;
  } else if (from === "Kelvin") {
    if (to === "Celsius") return value - 273.15;
    if (to === "Fahrenheit") return (value - 273.15) * 9 / 5 + 32;
  }
}

function swapUnits() {
  let temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  convertUnits();
}

function copyResult() {
  const output = document.getElementById("output");
  if (output.value) {
    navigator.clipboard.writeText(output.value);
    alert("Copied: " + output.value);
  }
}

function updateSummary(inputVal, from, to, result) {
  const summary = document.getElementById("summary");
  if (inputVal && !isNaN(result)) {
    summary.textContent = `${inputVal} ${from} = ${result} ${to}`;
  } else {
    summary.textContent = "";
  }
}

populateCategories();
