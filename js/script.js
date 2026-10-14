let currentScene = "lobby";
let cameraClicks = 0;

function has(name) {
  return localStorage.getItem(name) === "yes";
}

function clueText(name) {
  if (name === "case") {
    return "The display case was unlocked with a key. Nothing is broken.";
  } else if (name === "forest") {
    return "Fresh sneaker prints lead away from the forest case.";
  } else if (name === "ocean") {
    return "Strands of magenta wool are snagged on the ocean case latch.";
  } else if (name === "desert") {
    return "A used lab glove that smells like sedative lies behind the desert case.";
  } else if (name === "archive") {
    return "Keycard log: case 17 was opened at 2:10 AM with the master keycard.";
  } else if (name === "camera") {
    return "Camera 3 shows a figure in a long magenta coat carrying a covered crate.";
  } else {
    return "Sign-out sheet: the biologist left at 9 PM. The trainer was on the gym camera all night. The curator never signed out.";
  }
}

function countClues() {
  let n = 0;
  if (has("case")) { n = n + 1; }
  if (has("forest")) { n = n + 1; }
  if (has("ocean")) { n = n + 1; }
  if (has("desert")) { n = n + 1; }
  if (has("archive")) { n = n + 1; }
  if (has("camera")) { n = n + 1; }
  if (has("log")) { n = n + 1; }
  return n;
}

function setLine(name) {
  let line = document.getElementById("note-" + name);
  if (has(name)) {
    line.innerHTML = clueText(name);
  } else {
    line.innerHTML = "???";
  }
}

function updateNotebook() {
  setLine("case");
  setLine("forest");
  setLine("ocean");
  setLine("desert");
  setLine("archive");
  setLine("camera");
  setLine("log");

  let n = countClues();
  document.getElementById("count").innerHTML = n;
  document.getElementById("notebookCount").innerHTML = n;

  if (has("archive")) {
    document.getElementById("btnOffice").innerHTML = "Security Office";
  } else {
    document.getElementById("btnOffice").innerHTML = "Security Office (locked)";
  }

  if (n >= 3) {
    document.getElementById("btnAccuse").innerHTML = "Accuse";
  } else {
    document.getElementById("btnAccuse").innerHTML = "Accuse (need 3 clues)";
  }
}

function addClue(name) {
  localStorage.setItem(name, "yes");
  updateNotebook();
}

function toggleNotebook() {
  let box = document.getElementById("notebook");
  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}

function sizeOcean() {
  let box = document.getElementById("oceanBox");
  box.style.height = (box.offsetWidth * 0.666) + "px";
}

function showScene(name) {
  document.getElementById("lobby").style.display = "none";
  document.getElementById("habitats").style.display = "none";
  document.getElementById("archive").style.display = "none";
  document.getElementById("office").style.display = "none";
  document.getElementById("accuse").style.display = "none";
  document.getElementById("archivePopup").style.display = "none";

  document.getElementById(name).style.display = "block";
  currentScene = name;
  localStorage.setItem("scene", name);

  if (name === "habitats") {
    sizeOcean();
  }
  window.scrollTo(0, 0);
}

function goScene(name) {
  if (name === "office" && !has("archive")) {
    alert("The security office is locked. Look for a keycard record in the archive.");
  } else if (name === "accuse" && countClues() < 3) {
    alert("Find at least 3 clues before you accuse anyone.");
  } else {
    showScene(name);
  }
}

function inspectCase() {
  addClue("case");
  document.getElementById("caseText").innerHTML = clueText("case");
}

function observe(place) {
  let button = document.getElementById(place + "Btn");
  if (has(place)) {
    return;
  }
  button.disabled = true;
  countdown(place, 4);
}

function countdown(place, n) {
  let text = document.getElementById(place + "Text");
  let button = document.getElementById(place + "Btn");
  if (n > 0) {
    text.innerHTML = "Observing... " + n;
    setTimeout(function () {
      countdown(place, n - 1);
    }, 1000);
  } else {
    addClue(place);
    text.innerHTML = "Clue found! " + clueText(place);
    button.innerHTML = "Examined";
  }
}

function moveLight(event) {
  let box = document.getElementById("oceanBox");
  let light = document.getElementById("oceanLight");
  let spot = document.getElementById("oceanSpot");

  let x = event.offsetX;
  let y = event.offsetY;

  light.style.display = "block";
  light.style.left = (x - 60) + "px";
  light.style.top = (y - 60) + "px";
  light.style.backgroundSize = box.offsetWidth + "px " + box.offsetHeight + "px";
  light.style.backgroundPosition = (60 - x) + "px " + (60 - y) + "px";

  let spotX = box.offsetWidth * 0.72;
  let spotY = box.offsetHeight * 0.78;
  let dx = x - spotX;
  let dy = y - spotY;

  if (dx > -50 && dx < 50 && dy > -50 && dy < 50 && !has("ocean")) {
    spot.style.display = "block";
    spot.style.left = (spotX - 12) + "px";
    spot.style.top = (spotY - 12) + "px";
  } else {
    spot.style.display = "none";
  }
}

function clickOcean(event) {
  moveLight(event);
  let box = document.getElementById("oceanBox");
  let dx = event.offsetX - box.offsetWidth * 0.72;
  let dy = event.offsetY - box.offsetHeight * 0.78;

  if (dx > -30 && dx < 30 && dy > -30 && dy < 30 && !has("ocean")) {
    addClue("ocean");
    showOcean();
    document.getElementById("oceanSpot").style.display = "none";
  }
}

function showOcean() {
  document.getElementById("oceanText").innerHTML = "Clue found! " + clueText("ocean");
  document.getElementById("sharkCard").style.display = "block";
}

function hideLight() {
  document.getElementById("oceanLight").style.display = "none";
  document.getElementById("oceanSpot").style.display = "none";
}

function showArchiveFound() {
  document.getElementById("archiveFound").innerHTML = "Clue found! " + clueText("archive") + " The security office is now unlocked.";
}

function collectArchive() {
  addClue("archive");
  document.getElementById("archivePopup").style.display = "none";
  showArchiveFound();
  window.scrollTo(0, 0);
}

function clickCamera() {
  if (has("camera")) {
    return;
  }
  cameraClicks = cameraClicks + 1;
  if (cameraClicks === 1) {
    document.getElementById("monitorText").innerHTML = "Static... click again to rewind.";
  } else if (cameraClicks === 2) {
    document.getElementById("monitorText").innerHTML = "Rewinding to 2:05 AM... click once more.";
  } else {
    addClue("camera");
    document.getElementById("monitorText").innerHTML = "2:10 AM. Something moves in the dark.";
    document.getElementById("cameraText").innerHTML = "Clue found! " + clueText("camera");
  }
}

function openLog() {
  addClue("log");
  document.getElementById("logText").innerHTML = "Clue found! " + clueText("log");
}

function accuse(name) {
  let answer = confirm("Accuse this person? You only get one chance.");
  if (answer === true) {
    showEnding(name);
  }
}

function showEnding(name) {
  let title = "";
  let text = "";
  let n = countClues();
  document.getElementById("endingImage").style.display = "none";

  if (name === "curator" && n >= 5) {
    title = "Case closed";
    text = "Edmund Vale goes quiet when you lay out the keycard log, the magenta wool and the camera tape. He admits he took Specimen 17 home because he could not stand to let the biologist cut it open. Police find the crate in his private office, and the creature is unharmed.";
    document.getElementById("endingImage").style.display = "block";
  } else if (name === "curator") {
    title = "Not enough proof";
    text = "You pointed at the right person, but you had too little evidence. Edmund Vale smiles, shows you his empty hands and walks out of the museum. Specimen 17 is never seen again. Go back and collect more clues.";
  } else if (name === "trainer" && has("log")) {
    title = "You ignored the alibi";
    text = "The sign-out sheet clearly showed Marcus Reed on the gym camera all night, but you accused him anyway. He is cleared within the hour, and by then the real thief has slipped away with the creature.";
  } else if (name === "trainer") {
    title = "Wrong person";
    text = "The sneaker prints led you to Marcus Reed, but he was nowhere near the lobby. You get fired for the false accusation and the real thief walks away. Maybe the sign-out sheet would have helped.";
  } else if (name === "researcher" && has("log")) {
    title = "You ignored the alibi";
    text = "Dr. Lena Ortiz left at 9 PM, and the sign-out sheet proved it. You accused her anyway. She resigns in anger, and the thief keeps Specimen 17.";
  } else {
    title = "Wrong person";
    text = "The glove pointed you to Dr. Lena Ortiz, but she had already gone home. She resigns after your accusation and the real thief walks away. Maybe the sign-out sheet would have helped.";
  }

  document.getElementById("endingTitle").innerHTML = title;
  document.getElementById("endingText").innerHTML = text;
  document.getElementById("suspects").style.display = "none";
  document.getElementById("ending").style.display = "block";
  window.scrollTo(0, 0);
}

function resetGame() {
  let answer = confirm("Start over? All of your clues will be lost.");
  if (answer === true) {
    localStorage.clear();
    window.location.reload();
  }
}

function restoreObserve(place) {
  if (has(place)) {
    document.getElementById(place + "Text").innerHTML = "Clue found! " + clueText(place);
    document.getElementById(place + "Btn").innerHTML = "Examined";
    document.getElementById(place + "Btn").disabled = true;
  }
}

function restoreGame() {
  updateNotebook();
  restoreObserve("forest");
  restoreObserve("desert");

  if (has("case")) {
    document.getElementById("caseText").innerHTML = clueText("case");
  }
  if (has("ocean")) {
    showOcean();
  }
  if (has("archive")) {
    showArchiveFound();
  }
  if (has("camera")) {
    document.getElementById("monitorText").innerHTML = "2:10 AM. Something moves in the dark.";
    document.getElementById("cameraText").innerHTML = "Clue found! " + clueText("camera");
  }
  if (has("log")) {
    document.getElementById("logText").innerHTML = "Clue found! " + clueText("log");
  }

  let saved = localStorage.getItem("scene");
  if (saved === null) {
    saved = "lobby";
  }
  if (saved === "office" && !has("archive")) {
    saved = "lobby";
  }
  if (saved === "accuse" && countClues() < 3) {
    saved = "lobby";
  }
  showScene(saved);
}

let oceanBox = document.getElementById("oceanBox");
oceanBox.addEventListener("mousemove", moveLight);
oceanBox.addEventListener("click", clickOcean);
oceanBox.addEventListener("mouseleave", hideLight);

window.addEventListener("resize", sizeOcean);

window.addEventListener("scroll", function () {
  if (currentScene === "archive" && window.scrollY > 600 && !has("archive")) {
    document.getElementById("archivePopup").style.display = "block";
  }
});

restoreGame();
