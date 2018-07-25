$(function(){
  function buildHTML(message){
    if (message.image.url === null) {
      var message_body_html = `<p class='chat-message__body'>${message.body}</p>`
    } else{
      var message_body_html = `<p class='chat-message__body'>${message.body}</p>
                               <p class='chat-message__body'>
                                 <img src="${message.image.url}"/>
                               </p>
                               `
    }

    var html = `<li class='chat-message'>
                  <div class='chat-message__header'>
                    <p class='chat-message__name'>${message.name}</p>
                    <p class='chat-message__time'>${message.created_at}</p>
                  </div>
                    ${message_body_html}
                </li>
                `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var group_id = gon.group_id
    $.ajax({
      type: "POST",
      url: `/groups/${group_id}/messages`,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-messages').append(html)
      $('#message_body').val('')
      $('#message_image').val('')
      $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
    })

    .fail(function(){
    alert('error');
    })

    .always(function(){
  $("#message-submit").removeAttr("disabled");
});
  })
});
