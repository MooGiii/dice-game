// Тоглогчийн ээлжийг хадгалах хувьсагч, 1-р тоглогчийг 0, хоёр дугаар тоглогчийг 1 гэж тэмдэглэнэ.
var activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч.
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч.
var roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

var diceNumber = Math.floor(Math.random() * 6) + 1;
// Програм эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";
// Шоог шидэх эвент листнэр
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 дотор санамсаргүй нэг тоог гаргаж авна.
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  // Шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.style.display = "block";
  // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";
  // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    // 1-с ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг  энэ хэсэгт сольж өгнө.
    switchToNextPlayer();
  }
});

// HOLD товчны эвент листнер

document.querySelector(".btn-hold").addEventListener("click", function () {
  //Уг тоглогч нь цуглуулсан ээлжийн оноог глобал оноонд нэмж өгнө.
  /*if (activePlayer === 0) {
    scores[0] = scores[0] + roundScore;
  } else {
    scores[1] = scores[10] + roundScore;
  }*/

  scores[activePlayer] = scores[activePlayer] + roundScore;
  //Дэлгэц дээр оноог нь өөрчилнө.
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  //Уг тоглогч хожсон эсэхийг (оноо нь 100-с их эсэх) шалгах
  if (scores[activePlayer] >= 100) {
    // ялагч гэсэн текстийг нэрний оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    switchToNextPlayer();
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  roundScore = 0;
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 00 болгоно.
  document.getElementById("current-" + activePlayer).textContent = 0;
  // Тоглогчийн ээлжийг нөгөө тоглогчруу шилжүүлнэ.
  // Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго.
  //Үгүй бол идэвхтэй тоглогчийг 0 болго.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //Шоог түр алга болгох.
  diceDom.style.display = "none";
  // Тоглогчийн ээлжийг солино.
}
