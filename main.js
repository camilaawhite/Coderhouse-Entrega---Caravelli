// Inicio de sesión
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Variable para el mensaje de error
    let errorMessage = document.getElementById('errorMessage');

    // Verificación de usuario y contraseña
    let validUsername = 'usuario'; 
    let validPassword = '1234';  

    if (username === validUsername && password === validPassword) {
        window.location.href = 'profile.html'; 
    } else {
        errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
    }
}

// Array para guardar data de formularios
let submittedForms = [];

// Función para abrir el formulario
function openForm() {
    document.getElementById('formModal').style.display = 'block';
}

// Función para cerrar el formulario
function closeForm() {
    document.getElementById('formModal').style.display = 'none';
}

// Función para enviar el formulario
function submitForm(event) {
    event.preventDefault(); 

    // Confirmar envío
    const confirmSubmission = confirm("¿Estás seguro de que querés enviar el formulario?");
    
    if (confirmSubmission) {
        // Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const animal = document.getElementById('animal').value;
        const tamaño = document.getElementById('tamaño').value;
        const especificaciones = document.getElementById('especificaciones').value;
        const contacto = document.getElementById('contacto').value;

        // Crear objeto con la información del animal
        const animalData = {
            nombre,
            animal,
            tamaño,
            especificaciones,
            contacto
        };

        // Guardar en localStorage
        let animals = JSON.parse(localStorage.getItem('animals')) || [];
        animals.push(animalData);
        localStorage.setItem('animals', JSON.stringify(animals));

        // Enviar evento al dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'form_submitted',
            eventName: 'form_submitted',
            eventParams: {
                animal: animal,
                tamaño: tamaño,
                edad: especificaciones  // assuming "especificaciones" is "edad"
            }
        });

        // Cerrar formulario y resetearlo
        closeForm();
        document.getElementById('cuestionario-ficha').reset();
    } else {
        console.log("Formulario no enviado.");
    }
}

// Añadir event listener para el formulario
document.getElementById('cuestionario-ficha').addEventListener('submit', submitForm);

// Función para ver la lista de animales
function viewAnimals() {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const listContainer = document.getElementById('animalsListContainer');
    
    // Limpiar la lista existente
    listContainer.innerHTML = '';

    // Crear y añadir cada elemento de la lista
    animals.forEach(animal => {
        const listItem = document.createElement('li');
        listItem.textContent = `${animal.nombre} (${animal.animal}), Tamaño: ${animal.tamaño}, Contacto: ${animal.contacto}`;
        listContainer.appendChild(listItem);
    });

    // Mostrar la lista de animales
    document.getElementById('animalsList').style.display = 'block';
}

// Función para cerrar la lista de animales
function closeAnimalsList() {
    document.getElementById('animalsList').style.display = 'none';
}
