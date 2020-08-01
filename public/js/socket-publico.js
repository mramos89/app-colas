//Establecer la comunicacion o la conexion con el server
var socket = io();

var tckt1 = $('#lblTicket1')
var tckt2 = $('#lblTicket2')
var tckt3 = $('#lblTicket3')
var tckt4 = $('#lblTicket4')

var desk1 = $('#lblEscritorio1')
var desk2 = $('#lblEscritorio2')
var desk3 = $('#lblEscritorio3')
var desk4 = $('#lblEscritorio4')


var lblTickets = [tckt1, tckt2, tckt3, tckt4]
var lblEscritorios = [desk1, desk2, desk3, desk4]
socket.on('estadoActual', function(data) {

    actualizaHTML(data.ultimos4);
})


socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
})



function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }
}
//los on son para escuchar 
socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});