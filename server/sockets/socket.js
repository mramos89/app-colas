const { io } = require('../server');
const { TicketControl } = require('../Classes/ticket-control.js')

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');
    // Escuchar el cliente solicitando el siguiente ticket
    //emitir un evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('siguienteTicket', (data, callback) => {
        console.log('Recibiendo peticion del generacion del siguiente ticket');
        //Enviar el # de ticket al cliente 
        let siguienteTckt = ticketControl.siguiente();
        callback(siguienteTckt);
        //client.broadcast.emit('siguienteTicket', siguienteTckt);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicker = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicker);

        //actualizr o notificar cambios en los ultimos 4....
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });


    });




});