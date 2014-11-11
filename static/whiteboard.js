$(document).ready(function() {
    var socket = io.connect('http://'+document.domain+':8080');
    
    // Etablie la connection en signalant sa présence
    socket.on('connect', function() {
        socket.emit('hey', 'hey');
    });
       
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');	

    var cursorX, cursorY;

    canvas.width = 800;
    canvas.height = 600;

    canvas.addEventListener('mousedown', function(e){
        socket.emit('mouseDown', cursorX.toString()+' '+cursorY.toString());
        canvas.addEventListener('mousemove', sendDraw, false);
    }, false);

    canvas.addEventListener('mouseup', function(e){
        canvas.removeEventListener('mousemove', sendDraw, false);
    }, false);

    canvas.addEventListener('mousemove', function(e){
        cursorX = e.pageX - this.offsetLeft;
        cursorY = e.pageY - this.offsetTop;
    }, false);

    socket.on('draw', function(pos){
        var posSplit = pos.split(" ");
        var xPos = posSplit[0],
            yPos = posSplit[1];

        context.lineTo(xPos, yPos);
        context.stroke();

    });

    socket.on('mouseDown', function(pos){
        var posSplit = pos.split(" ");
        var xPos = posSplit[0],
            yPos = posSplit[1];

        context.beginPath();
        context.moveTo(xPos, yPos);
    });

    function sendDraw() {
        socket.emit('draw', cursorX.toString()+' '+cursorY.toString());
    }
})
