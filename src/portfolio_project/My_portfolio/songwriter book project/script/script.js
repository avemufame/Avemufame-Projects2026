/* let promise = navigator.mediaDevices.getUserMedia({video:true}); */
/* using audio only 
let promise = navigator.mediaDevices.getUserMedia({video:false, audio:true}); 
let promise = navigator.mediaDevices.getUserMedia({audio:true});

promise.then(function(signal){
    // 1. Crei un lettore audio invisibile invece di un video
    let AUDIO = document.createElement("audio"); 
    
    // 2. Gli passi il segnale del microfono
    AUDIO.srcObject = signal; 
    
    // 3. Fai partire il suono (sentirai la tua voce nelle casse)
    AUDIO.play(); 
    
    // NOTA: Non serve più chiamare updateCanvas()! 
    // Non essendoci immagini, la lavagna non serve più.

}).catch(function(err){
    alert("Microphone error: " + err);
});
function updateCanvas(){
    // 1. Puliamo la lavagna (cancella il disegno precedente per evitare scie)
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

    // 2. Troviamo le proporzioni del video (es. 4:3 o 16:9)
    let videoRatio = VIDEO.videoWidth / VIDEO.videoHeight;
    let canvasRatio = CANVAS.width / CANVAS.height;

    let drawWidth, drawHeight;

    // 3. Calcoliamo la scala corretta
    if (canvasRatio > videoRatio) {
        // Lo schermo è più largo del video (es. monitor PC molto largo)
        drawHeight = CANVAS.height;
        drawWidth = CANVAS.height * videoRatio;
    } else {
        // Lo schermo è più stretto del video (es. uno smartphone in verticale)
        drawWidth = CANVAS.width;
        drawHeight = CANVAS.width / videoRatio;
    }

    // 4. Calcoliamo la posizione per metterlo perfettamente al centro
    let x = (CANVAS.width - drawWidth) / 2;
    let y = (CANVAS.height - drawHeight) / 2;

    // 5. Disegniamo il video centrato e in scala!
    CONTEXT.drawImage(VIDEO, x, y, drawWidth, drawHeight);
    
    // Ricomincia il ciclo per il prossimo fotogramma
    window.requestAnimationFrame(updateCanvas);
}
