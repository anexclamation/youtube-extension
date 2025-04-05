const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let rotationAngle = 0;

document.getElementById("image-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
};

document.getElementById("resizeImage").addEventListener('click', function() {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
    } else {
        alert("유효한 크기를 입력하세요!");
    }
})

document.getElementById('updateBrightness').addEventListener('click', function() {
    adjustBrightness(parseInt(document.getElementById("brightness-slider").value));
})

document.getElementById('adjustBrightness').addEventListener('click', function(value) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] += value;
        data[i + 1] += value;
        data[i + 2] += value;
    }
    
    ctx.putImageData(imageData, 0, 0);
})

document.getElementById('updateContrase').addEventListener('click', function() {
    adjustContrast(parseFloat(document.getElementById("contrast-slider").value));
})

document.getElementById('adjustContrast').addEventListener('click', function(factor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * factor;
        data[i + 1] = data[i + 1] * factor;
        data[i + 2] = data[i + 2] * factor;
    }
    
    ctx.putImageData(imageData, 0, 0);
})

document.getElementById('rotateImage').addEventListener('click', function() {
    rotationAngle += 90;
    canvas.width = img.height;
    canvas.height = img.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
})