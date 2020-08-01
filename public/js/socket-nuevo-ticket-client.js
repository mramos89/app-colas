//Establecer la comunicacion o la conexion con el server
var socket = io();
var label = $('#lblNuevoTicket');

//los on son para escuchar 
socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

//Escuchar al cliente sobre mi estado actual 

socket.on('estadoActual', function(resp) {
    console.log(resp.actual);
    label.text(resp.actual);
});

// al presionar boton click en la pantalla generar nuevo ticket
$('button').on('click', function() {
    //Enviare la informacion que necesito al server
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log('respuesta server nuevo ticket:', siguienteTicket);
        label.text(siguienteTicket);
    });
});