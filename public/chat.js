window.addEventListener('DOMContentLoaded',  function() {
    const socket = io.connect('http://localhost:5000');

    const msg = document.getElementById('msg');
    const floatingMsg = document.getElementById('floating-msg');
    const user = document.getElementById('user');
    const output = document.getElementById('output');
    const btn = document.getElementById('btn-send');

    btn.addEventListener('click', () => {
        socket.emit('chat', {
            msg: msg.value,
            user: user.value
        });
    });

    document.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.keyCode && e.keyCode === 13 && msg.value) {
            socket.emit('chat', {
                msg: msg.value,
                user: user.value
            })
        }
    });

    msg.addEventListener('input', () => socket.emit('typing', user.value));

    socket.on('chat', data => {
        floatingMsg.innerHTML = '';
        output.innerHTML += `<p class="message"><strong class="name">${data.user}:</strong> ${data.msg}</p>`;
        msg.value = '';
    });

    socket.on('typing', data => floatingMsg.innerHTML = `<p class="typing-msg">${data} is typing...</p>`)
});