$(document).ready(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');	

    var cursorX, cursorY;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('mousedown', function(e){
        context.beginPath();
        context.moveTo(cursorX, cursorY);

        canvas.addEventListener('mousemove', draw, false);
    }, false);

    canvas.addEventListener('mouseup', function(e){
        canvas.removeEventListener('mousemove', draw, false);
    }, false);

    canvas.addEventListener('mousemove', function(e){
        cursorX = e.pageX - this.offsetLeft;
        cursorY = e.pageY - this.offsetTop;
    }, false);


    function draw() {
        context.lineTo(cursorX, cursorY);
        context.stroke();
        
    }
})
