$(function(){
  function buildHTML(message){
    var html = `<li class='chat-message'>
                  <div class='chat-message__header'>
                    <p class='chat-message__name'>${message.user.name}</p>
                    <p class='chat-message__time'>${message.created_at}</p>
                  </div>
                    <p class='chat-message__body'>${message.body}</p>
                    <p class='chat-message__body'>${message.image}</p>
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
      url: "/groups/${group_id}/messages",
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
    })
    .fail(function(){
    alert('error');
    })
  })
});
