var searchParams = new URLSearchParams(window.location.search);

var nombre = searchParams.get('nombre');
var sala = searchParams.get('sala');

var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var divChatbox  = $("#divChatbox");
function renderizarUsuarios(personas) {
    console.log(personas);
    let html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + searchParams.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + (i + 1) + '.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}


divUsuarios.on('click', 'a', function (e) {
    var id = $(this).data('id');
    if (!id) {
        return;
    }
    console.log(id);
});

formEnviar.on('submit', function (e) {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        msg: txtMensaje.val()
    }, function (mensaje) {
        renderizarMensaje(mensaje,true);
        txtMensaje.val('').focus();
    });
});

function renderizarMensaje(mensaje,yo=false){
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours()+":"+fecha.getMinutes()
    var html='';
    var adminClass = 'info';
    var isAdmin = mensaje.usuario==='Admin';
    if(isAdmin){
        adminClass='danger'
    }

    html+='<li  class="animated fadeIn '+(yo?'reverse':'')+'">';
    html+=(yo||isAdmin?'':'<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>');
    html+='<div class="chat-content">';
    html+='<h5>'+mensaje.usuario+'</h5>';
    html+='<div class="box bg-light-'+(yo?'reverse':adminClass)+'">'+mensaje.msg+'</div>';
    html+='</div>';
    html+=(yo?'<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>':'');
    html+='<div class="chat-time">'+hora+'</div>';
    html+='</li>';
    console.log(html);
    divChatbox.append(html);
    scrollBottom();
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}