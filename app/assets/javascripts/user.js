$(function() {

  var search_list = $("#chat-group-users");

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user}</p>
                </div>`
      search_list.append(html);
  }

  function checkId(user_id){
    var judgement = true
    $('.user-info').each(function(){
      if ($(this).attr('value') === user_id.toString()){
        judgement = false
        return false;
      }
    })
    return judgement;
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $("#chat-group-users").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         if (checkId(user.id)) {
           appendUser(user);
         }
       });
     }
     else {
       appendNoUser("一致するユーザーはいません");
     }
   })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});



$(function() {

  user_result = $("#chat-members");

  function appendMember(member){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input class="user-info" name='group[user_ids][]' type='hidden' value='${member.id}'>
                  <p class='chat-group-user__name'>${member.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

        user_result.prepend(html)
  }

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var member = new Object();
    member.name = $(this).prev().text()
    member.id = $(this).attr("data-user-id")
    $(this).parent().remove()
    appendMember(member)
  })

  $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove()
    appendMember(member)
  })
});

