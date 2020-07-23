$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-box">
          <div class="message-list">
            <div class="message-list__name">
              ${message.user_name}
            </div>
            <div class="message-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__content">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-box">
        <div class="message-list">
          <div class="message-list__name">
            ${message.user_name}
          </div>
          <div class="message-list__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main__content">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main').append(html);
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__send').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});