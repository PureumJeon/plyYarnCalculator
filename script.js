let yarns = [];

function addYarn() {
  const yarnLengthInput = document.getElementById("yarn-length");

  const yarnLengthPer100g = parseFloat(yarnLengthInput.value);

  if (isNaN(yarnLengthPer100g) || yarnLengthPer100g <= 0) {
    alert("합사 할 실이 100g당 몇미터인지 입력해주세요!");
    return;
  }

  yarns.push({ lengthPer100g: yarnLengthPer100g });

  calculateResult();
  displayYarns();

  // 입력된 값 초기화
  yarnLengthInput.value = "";
}

function displayYarns() {
  const yarnListDiv = document.getElementById("yarn-list");
  yarnListDiv.innerHTML = "";

  yarns.forEach((yarn, index) => {
    const yarnDiv = document.createElement("div");
    yarnDiv.innerHTML = `<label>실 ${index + 1} :</label>
                             <span>${yarn.lengthPer100g}m/100g</span>
                             <button onclick="editYarn(${index})">수정</button>
                             <button onclick="deleteYarn(${index})">삭제</button>`;
    yarnListDiv.appendChild(yarnDiv);
  });
}

function editYarn(index) {
  const newYarnLength = prompt(
    "합사 할 실이 100g당 몇미터인지 입력해주세요!",
    yarns[index].lengthPer100g
  );

  const parsedLength = parseFloat(newYarnLength);

  if (!isNaN(parsedLength) && parsedLength > 0) {
    yarns[index].lengthPer100g = parsedLength;
    calculateResult();
    displayYarns();
  } else {
    alert("합사 할 실이 100g당 몇미터인지 입력해주세요!");
  }
}

function deleteYarn(index) {
  yarns.splice(index, 1);
  calculateResult();
  displayYarns();
}

function calculateResult() {
  const gramsPerMeterArray = yarns.map((yarn) => 100 / yarn.lengthPer100g);

  const totalGramsPerMeter = gramsPerMeterArray.reduce(
    (sum, gramsPerMeter) => sum + gramsPerMeter,
    0
  );

  const metersPer100g = 100 / totalGramsPerMeter;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `합사 후 100g에 약 ${metersPer100g.toFixed(
    0
  )} m 입니다.`;
}
