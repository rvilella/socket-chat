var socket = io();

// sentencia para capturar parametros en el url
var params = new URLSearchParams(window.location.search);

// si no viene el parametro nombre
if (!params.has('nombre') || !params.has('sala')) {
    // se redirecciona a index
    window.location = 'index.html';
    // y se dispara un error
    throw new Error('El nombre y sala son necesarios');
}

// se crea el objeto usuario en donde la propiedad nombre es extraida de params
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuarios
// Cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);

});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje privado:', mensaje);

});