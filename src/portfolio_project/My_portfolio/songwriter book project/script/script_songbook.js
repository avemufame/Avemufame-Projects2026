let VIDEO = null;
let CONTEXT = null;
let CANVAS = null;
let MEDIA_RECORDER = null;
let AUDIO_CHUNKS = [];
let IS_RECORDING = false;

// 🎸 Configurazione iniziale della Tablatura
const NUM_STRINGS = 6;
const NUM_COLUMNS = 40;
const STRING_NAMES = ['e', 'B', 'G', 'D', 'A', 'E'];

let tabLinesData = []; 

// Variabili di appoggio per il menu a tendina delle note
let activeLineIndex = null;
let activeStringIndex = null;
let activeColumnIndex = null;
let activeCellElement = null;

// ==========================================
// 🚀 PUNTO DI PARTENZA (onload)
// ==========================================
function main() {
    CANVAS = document.getElementById("myCanvas");
    CONTEXT = CANVAS.getContext("2d");

    ridimensionaCanvas();
    window.addEventListener('resize', ridimensionaCanvas);

    // Carichiamo la sessione se presente nel browser
    caricaSessionePrecedente();
    if (tabLinesData.length === 0) {
        creaNuovoBloccoDatiLinea();
    }
    disegnaTutteLeTab();

    // Ascolto in tempo reale per il salvataggio automatico
    document.getElementById("notepad").addEventListener("input", salvaSessione);
    document.getElementById("chordpad").addEventListener("input", salvaSessione);
    document.getElementById("song-title-input").addEventListener("input", salvaSessione);
    document.getElementById("song-bpm-input").addEventListener("input", salvaSessione);
    document.getElementById("song-time-input").addEventListener("change", salvaSessione);
    document.getElementById("song-key-input").addEventListener("input", salvaSessione);

    // Se si clicca fuori dalle corde, il menu dei numeri scompare
    document.addEventListener("click", function(e) {
        if (!e.target.classList.contains("tab-cell")) {
            document.getElementById("tab-drop-menu").style.display = "none";
        }
    });

    generaElementiDropMenu();

    // Avvio dei dispositivi multimediali
    let promise = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    promise.then(function(signal) {
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        VIDEO.play();
        VIDEO.onloadeddata = function() { updateCanvas(); }

        MEDIA_RECORDER = new MediaRecorder(signal);
        MEDIA_RECORDER.ondataavailable = function(e) { AUDIO_CHUNKS.push(e.data); };
        MEDIA_RECORDER.onstop = function() {
            let audioBlob = new Blob(AUDIO_CHUNKS, { type: 'audio/mp3' });
            document.getElementById("audio-player").src = URL.createObjectURL(audioBlob);
            AUDIO_CHUNKS = [];
            alert("Registrazione completata e caricata nel player!");
        };
    }).catch(function(err) { console.log("Camera o microfono non pronti: " + err); });
}
// ==========================================
// 🎸 LOGICA DELLA TABLATURA INTERATTIVA
// ==========================================
function creaNuovoBloccoDatiLinea() {
    let nuovaLinea = [];
    for (let s = 0; s < NUM_STRINGS; s++) {
        nuovaLinea[s] = Array(NUM_COLUMNS).fill("-");
    }
    tabLinesData.push(nuovaLinea);
}

function aggiungiNuovaLineaTab() {
    creaNuovoBloccoDatiLinea();
    disegnaTutteLeTab();
    salvaSessione();
}

function eliminaSingolaLineaTab(index) {
    if (tabLinesData.length <= 1) {
        alert("Devi mantenere almeno una linea di tablatura!");
        return;
    }
    if (confirm("Vuoi eliminare questa linea di tablatura?")) {
        tabLinesData.splice(index, 1);
        disegnaTutteLeTab();
        salvaSessione();
    }
}

function disegnaTutteLeTab() {
    let container = document.getElementById("tab-grid-container");
    container.innerHTML = "";

    tabLinesData.forEach((lineData, lineIdx) => {
        let rowWrapper = document.createElement("div");
        rowWrapper.className = "tab-row-container";

        let block = document.createElement("div");
        block.className = "tab-block";
        block.style.gridTemplateColumns = `40px repeat(${NUM_COLUMNS}, 1fr)`;

        for (let s = 0; s < NUM_STRINGS; s++) {
            let label = document.createElement("div");
            label.className = "tab-cell string-label";
            label.innerText = STRING_NAMES[s] + "|";
            block.appendChild(label);

            for (let c = 0; c < NUM_COLUMNS; c++) {
                let cell = document.createElement("div");
                cell.className = "tab-cell";
                
                if (lineData[s][c] !== "-") {
                    cell.innerText = lineData[s][c];
                    cell.classList.add("has-note");
                } else {
                    cell.innerText = "-";
                }

                cell.onclick = function(e) {
                    e.stopPropagation();
                    apriDropMenu(e, lineIdx, s, c, cell);
                };

                block.appendChild(cell);
            }
        }
        rowWrapper.appendChild(block);

        let delBtn = document.createElement("button");
        delBtn.className = "delete-row-btn";
        delBtn.innerText = "❌";
        delBtn.onclick = function() { eliminaSingolaLineaTab(lineIdx); };
        rowWrapper.appendChild(delBtn);

        container.appendChild(rowWrapper);
    });
}

// ==========================================
// ➕ COSTRUZIONE MENU A TENDINA (DROP DOWN)
// ==========================================
function generaElementiDropMenu() {
    let menu = document.getElementById("tab-drop-menu");
    menu.innerHTML = "";
    for (let i = 0; i <= 24; i++) {
        let item = document.createElement("div");
        item.className = "drop-item";
        item.innerText = i;
        item.onclick = function() { selezionaTastoNota(i.toString()); };
        menu.appendChild(item);
    }
    let clearItem = document.createElement("div");
    clearItem.className = "drop-item clear-item";
    clearItem.innerText = "CANCELLA";
    clearItem.onclick = function() { selezionaTastoNota("-"); };
    menu.appendChild(clearItem);
}
function apriDropMenu(e, lineIdx, s, c, element) {
    let menu = document.getElementById("tab-drop-menu");
    activeLineIndex = lineIdx;
    activeStringIndex = s;
    activeColumnIndex = c;
    activeCellElement = element;

    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    menu.style.display = "grid";
}

function selezionaTastoNota(valore) {
    document.getElementById("tab-drop-menu").style.display = "none";
    if (valore === "-") {
        tabLinesData[activeLineIndex][activeStringIndex][activeColumnIndex] = "-";
        activeCellElement.innerText = "-";
        activeCellElement.classList.remove("has-note");
    } else {
        tabLinesData[activeLineIndex][activeStringIndex][activeColumnIndex] = valore;
        activeCellElement.innerText = valore;
        activeCellElement.classList.add("has-note");
    }
    salvaSessione();
}

function pulisciTablatura() {
    if(confirm("Vuoi svuotare tutto?")) {
        tabLinesData = [];
        creaNuovoBloccoDatiLinea();
        disegnaTutteLeTab();
        salvaSessione();
    }
}

// ==========================================
// 💾 GESTIONE MEMORIA E SCHERMATE DI AVVIO
// ==========================================
function salvaSessione() {
    localStorage.setItem("appMusica_note", document.getElementById("notepad").value);
    localStorage.setItem("appMusica_accordi", document.getElementById("chordpad").value);
    localStorage.setItem("appMusica_title", document.getElementById("song-title-input").value);
    localStorage.setItem("appMusica_bpm", document.getElementById("song-bpm-input").value);
    localStorage.setItem("appMusica_time", document.getElementById("song-time-input").value);
    localStorage.setItem("appMusica_key", document.getElementById("song-key-input").value);
    localStorage.setItem("appMusica_linee_tab", JSON.stringify(tabLinesData));
}

function caricaSessionePrecedente() {
    if (localStorage.getItem("appMusica_note") !== null) document.getElementById("notepad").value = localStorage.getItem("appMusica_note");
    if (localStorage.getItem("appMusica_accordi") !== null) document.getElementById("chordpad").value = localStorage.getItem("appMusica_accordi");
    if (localStorage.getItem("appMusica_title") !== null) document.getElementById("song-title-input").value = localStorage.getItem("appMusica_title");
    if (localStorage.getItem("appMusica_bpm") !== null) document.getElementById("song-bpm-input").value = localStorage.getItem("appMusica_bpm");
    if (localStorage.getItem("appMusica_time") !== null) document.getElementById("song-time-input").value = localStorage.getItem("appMusica_time");
    if (localStorage.getItem("appMusica_key") !== null) document.getElementById("song-key-input").value = localStorage.getItem("appMusica_key");
    if (localStorage.getItem("appMusica_linee_tab") !== null) tabLinesData = JSON.parse(localStorage.getItem("appMusica_linee_tab"));
}

function avviaNuovaCanzone() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("app-layout").classList.remove("hidden");
    setTimeout(ridimensionaCanvas, 100);
    
    document.getElementById("notepad").value = "";
    document.getElementById("chordpad").value = "";
    document.getElementById("song-title-input").value = "";
    document.getElementById("song-bpm-input").value = "120";
    document.getElementById("song-key-input").value = "";
    
    tabLinesData = [];
    creaNuovoBloccoDatiLinea();
    disegnaTutteLeTab();
    salvaSessione();
}

function apriCanzoneEsistente() {
    let tabSalvate = localStorage.getItem("appMusica_linee_tab");
    if (tabSalvate === null || JSON.parse(tabSalvate).length === 0) {
        alert("Non ci sono canzoni in memoria! Clicca su Nuova Canzone.");
        return;
    }
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("app-layout").classList.remove("hidden");
    
    caricaSessionePrecedente();
    disegnaTutteLeTab();
    setTimeout(ridimensionaCanvas, 100);
}

// ==========================================
// 🎥 INTERFACCIA GRAFICA E MULTIMEDIALE
// ==========================================
function toggleSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) section.classList.toggle("hidden");
    setTimeout(ridimensionaCanvas, 100);
}

function toggleGuitarTabsLayout() {
    let container = document.getElementById("workspace-container");
    if (container.classList.contains("layout-standard")) {
        container.classList.remove("layout-standard");
        container.classList.add("layout-centrale");
    } else {
        container.classList.remove("layout-centrale");
        container.classList.add("layout-standard");
    }
    setTimeout(ridimensionaCanvas, 100);
}

function updateCanvas() {
    if (CANVAS.width === 0 || CANVAS.height === 0) {
        window.requestAnimationFrame(updateCanvas);
        return;
    }
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    let videoRatio = VIDEO.videoWidth / VIDEO.videoHeight;
    let canvasRatio = CANVAS.width / CANVAS.height;
    let drawWidth, drawHeight;

    if (canvasRatio > videoRatio) {
        drawHeight = CANVAS.height; drawWidth = CANVAS.height * videoRatio;
    } else {
        drawWidth = CANVAS.width; drawHeight = CANVAS.width / videoRatio;
    }
    let x = (CANVAS.width - drawWidth) / 2;
    let y = (CANVAS.height - drawHeight) / 2;
    CONTEXT.drawImage(VIDEO, x, y, drawWidth, drawHeight);
    window.requestAnimationFrame(updateCanvas);
}

function ridimensionaCanvas() {
    let container = document.getElementById("video-section");
    if (container && CANVAS) {
        CANVAS.width = container.clientWidth;
        CANVAS.height = container.clientHeight - 25;
    }
}

function gestisciRegistrazioneAudio() {
    let btn = document.getElementById("rec-audio");
    if (MEDIA_RECORDER === null) return;

    if (IS_RECORDING === false) {
        MEDIA_RECORDER.start();
        IS_RECORDING = true;
        btn.innerHTML = "⏹️ Ferma"; btn.style.backgroundColor = "#dc3545";
    } else {
        MEDIA_RECORDER.stop();
        IS_RECORDING = false;
        btn.innerHTML = "🎙️ Solo Audio"; btn.style.backgroundColor = "#2a2a2a";
    }
}

function tornaHome(){
    document.getElementById("app-layout").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
  

    
}