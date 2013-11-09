$(function(){
  //填姓名, 存姓名功能
  var user_name;
  function save_username(){
    if($('#username').val()){
      user_name = $('#username').val();
    }else{
      user_name = 'Anonymous';
    }
    console.log(user_name);
    $('#hellobox_shadow, #hellobox').fadeOut();
     prop_msg('Hello! '+ user_name );
  }
  //msg prop 功能
  function prop_msg(txt){
    $('#msg').html(txt).css('display','inline-block').fadeOut(4000);
  }

  $hellobox_shadow = $('#hellobox_shadow');
  $hellobox = $('#hellobox');
    window.onload = function(){
      $('#hellobox_shadow, #hellobox').fadeIn();
    }


  $('#hellobox_shadow, #save_username, #save_anno').on('click',function(){
      save_username();
  });

  //if press enter = save user name
  $hellobox.keypress(function( event ) {
    if ( event.which == 13 ) {
        //alert(event.keyCode);
        event.preventDefault();
        save_username();    }
  });

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var isDrawing = false;  // 判斷是否在繪圖模式

  // 設定線段粗細, 顏色
  ctx.lineWidth = $('#choose_range').val();
  ctx.strokeStyle = '#000';

  $('#choose_range').change(function(){
    ctx.lineWidth = $('#choose_range').val();
  });

  // 設定color 
  $( "#color_plate > li" ).click(function() {
      $(this).attr("class")
      ctx.strokeStyle =  $(this).attr("class");
  });

  //清除 = 新增圖面
  $('#add_canvas').click(function(e){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    return false;
    if(e.state){
      context.putImageData(e.state, 0, 0);
    }
  });


  // 儲存
  $('#save_canvas').click(function(){
    var saved_dataURL =  canvas.toDataURL();
    sessionStorage.setItem('image', saved_dataURL );
    //load.disabled = false;

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    var author_talking_dom = '<span>'+ user_name +'\'s works:</span>'
    var new_saved_dom = '<img src="' + saved_dataURL + '"/>';
    console.log(new_saved_dom);
    $('#paint_saved_history').prepend('<div class="clearfix">'+ author_talking_dom + new_saved_dom + '</div>');
    //document.getElementById('canvasImg').src = saved_dataURL;

    alert('Broadcase!');
    return false;
  });

  // 復原
  $('#undo_canvas').click(function(){

     window.history.go(-1);
     return false;
  });


 
  // 讀取
  $('#redo_canvas').click(function(){
     /* var img = new Image();
    img.src = localStorage.getItem('image');
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.drawImage(img, 0, 0);*/
     window.history.go(+1);
     return false;
  });


  /*
  load.addEventListener('click', function(){
    var img = new Image();
    img.src = localStorage.getItem('image');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
  }, false);
  */

  // canvas 滑鼠操作事件
  canvas.addEventListener('mousedown', startDarw, false);
  canvas.addEventListener('mousemove', drawing,   false);
  canvas.addEventListener('mouseup',   stopDrawing, false);

  // popstate 事件
  window.addEventListener('popstate', changeStep, false);
  function changeStep(e){
    // 清除畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(e.state){
      ctx.putImageData(e.state, 0, 0);
    }
  }
  function stopDrawing(e){
    isDrawing = false;
     var prev_state = ctx.getImageData(0,0,canvas.width,canvas.height);
      history.pushState(prev_state, null);
     // console.log(prev_state);
  }

  function drawing(e){
    if(isDrawing){
       ctx.lineTo(
          e.pageX - canvas.offsetLeft, 
          e.pageY - canvas.offsetTop
      );
      ctx.stroke();
    }
  }

  function startDarw(e){
    isDrawing = true;
    ctx.beginPath();

   /* console.log(e.pageX + 'e.pageX');
    console.log(e.pageY + 'e.pageY');
    console.log(canvas.offsetLeft + 'canvas.offsetLeft');
    console.log(canvas.offsetTop + 'canvas.offsetTop');*/
    ctx.moveTo(
      e.pageX - canvas.offsetLeft, 
      e.pageY - canvas.offsetTop
    );
  }

});