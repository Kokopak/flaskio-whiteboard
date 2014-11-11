#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, redirect, request, render_template, session
from flask.ext.socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('draw')
def handle_draw(pos):
    print "Recu draw : " + pos
    emit('draw', pos, broadcast=True)

@socketio.on('mouseDown')
def handle_mousedown(pos):
    print "Recu mouseDown : " + pos
    emit('mouseDown', pos, broadcast=True)
 
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=8080)
