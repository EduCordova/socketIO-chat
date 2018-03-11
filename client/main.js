var socket = io()

socket.on('messages',function(data){
    console.log(data)
    render(data)
})

function render(data){
    var html = data.map(function(i,key){
        return (`
        <div class="message">
            <strong>${i.nickname}</strong> dice:
            <p>${i.text}</p>
        </div>`)
    }).join(' ');

    var div_msgs = document.getElementById('messages')
    div_msgs.innerHTML = html
    div_msgs.scrollTop  = div_msgs.scrollHeight
}

function addMessage(e){
    var message = {
        id:Math.floor((Math.random() * 1000) + 1),
        nickname:document.getElementById('nickname').value,
        text:document.getElementById('text').value
        
    }
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message',message);
    document.getElementById('text').value =" "
    return false
}
