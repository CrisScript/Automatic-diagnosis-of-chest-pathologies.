// Forzar a ml5.js (TensorFlow.js) a usar el backend CPU en lugar de WebGL
ml5.tf.setBackend('cpu');

// Variables globales
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/QhuGt5BiP/'; // URL del modelo
let canvas;
let label = "Loading model...";

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json', modelReady);
}

function setup() {
  // Crear el canvas donde se mostrará la imagen
  canvas = createCanvas();
  // Ocultar el canvas al inicio hasta que se cargue una imagen
  canvas.hide();
  
  // Añadir evento para la carga de archivo
  document.getElementById('fileInput').addEventListener('change', handleFileUpload);

  document.getElementById('customFileButton').addEventListener('click', function() {
  document.getElementById('fileInput').click();
  });

  
}

function modelReady() {
  label = "Model loaded. Please, upload an image";
  document.getElementById('result').textContent = label;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Usa p5.js loadImage para cargar la imagen
      loadImage(e.target.result, function(img) {
        // Mostrar el canvas y dibujar la imagen
        //canvas.show();
        //.size(400, 400);
        //image(img, 0, 0, width, height);
        // Clasificar la imagen dibujada en el canvas
        classifier.classify(img, gotResults);
      }, function() {
        console.error("Error al cargar la imagen.");
        label = "Error al cargar la imagen.";
        document.getElementById('result').textContent = label;
      });
    }
    reader.readAsDataURL(file);
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.style.display = 'block';
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    label = "Error en la clasificación.";
  } else {
    // Muestra la etiqueta obtenida
    label = results[0].label;
  }
  document.getElementById('result').textContent = `Resultado: ${label}`;
}

function draw() {
  // No se requiere dibujo continuo, solo dibujamos la imagen cargada
  
}