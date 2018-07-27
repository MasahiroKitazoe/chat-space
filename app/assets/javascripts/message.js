$(function(){

  var group_id = gon.group_id

  function buildHTML(message){
    if (message.image === null) {
      var message_body_html = `<p class='chat-message__body'>${message.body}</p>`
    } else{
      var message_body_html = `<p class='chat-message__body'>${message.body}</p>
                               <p class='chat-message__body'>
                                 <img src="${message.image}"/>
                               </p>
                               `
    }

    if (message.image === null && message.body === "") {
      var html = ``
      alert('メッセージを入力してから送信してください')
    } else {
    var html = `<li class='chat-message'>
                  <div class='chat-message__header'>
                    <p class='chat-message__name'>${message.name}</p>
                    <p class='chat-message__time'>${message.created_at}</p>
                  </div>
                    ${message_body_html}
                </li>
                `
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
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

  if (window.location.href.match(/.+\/groups\/\d+\/messages/)) {
    setInterval(function(){

      $.ajax({
        type: "GET",
        url: `/groups/${group_id}/messages`,
        dataType: 'json',
        data: {last_id: $('.chat-message').length}
      })
      .done(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message){
            index_html = buildHTML(message);
            $('.chat-messages').append(index_html)
          });
          $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function(){
        alert('error');
      })
    }, 5000);
  }
});
