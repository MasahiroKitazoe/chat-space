$(function(){

  function dateFormat(date) {
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    if (mon < 10) {
      mon = '0' + mon;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (min < 10) {
      min = '0' + min;
    }

    // フォーマット整形済みの文字列を戻り値にする
    return year + '-' + mon + '-' + day + ' ' + hour + ':' + min;
  }

  var group_id = gon.group_id

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

    if (message.image.url === null && message.body === "") {
      var html = ``
      alert('メッセージを入力してから送信してください')
    } else {
    var html = `<li class='chat-message'>
                  <div class='chat-message__header'>
                    <p class='chat-message__name'>${message.name}</p>
                    <p class='chat-message__time'>${dateFormat(new Date(message.created_at))}</p>
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

  setInterval(function(){
    $.ajax({
      type: "GET",
      url: `/groups/${group_id}/messages`,
      dataType: 'json'
    })

    .done(function(messages){
      if (messages.length !== 0) {
        $('.chat-messages').empty()
        messages.forEach(function(message){
          index_html = buildHTML(message);
          $('.chat-messages').append(index_html)
        });
      }
    })

    .fail(function(){
      alert('error');
    })
  }, 5000);
});
