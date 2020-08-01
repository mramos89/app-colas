//Establecer la comunicacion o la conexion con el server
var socket = io();
//para obtener los parametros desde la url javascript
var searchParams = new URLSearchParams(window.location.search);


var label = $('small')
if (!searchParams.has('escritorio')) {
    window.location = 'index.hmtl';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio')
$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log('esta es la respusta ' + resp);
        if (resp === 'No hay tickets') {
            return label.text(resp)
        }
        label.text('Ticket ' + resp.numero)
    })
})

//los on son para escuchar 
socket.on('connect', function() {
    console.log('conectado al servidor socket escritorio');
});

socket.on('disconnect', function() {
    console.log('desconectado al servidor socket escritorio');
});