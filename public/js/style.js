$(function(){
  var newColor = '#ffffff';
  myCanvas.style.background = '#ffffff';

  //填姓名, 存姓名功能
  var user_name;
  function save_username(){
    if($('#username').val()){
      user_name = $('#username').val();
    }else{
      user_name = 'Guest';
    }
    console.log(user_name);
    socket.emit('join', user_name );
    $('#hellobox_shadow, #hellobox').fadeOut();
     prop_msg('Hello! '+ user_name );
  }
  //msg prop 功能
  function prop_msg(txt){
    $('#msg').html(txt).css('display','inline-block').fadeOut(3000);
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

  //Audio
  var audio = new Audio('musics/01.mp3');

  //canvas
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

      //change music
      audio = new Audio('musics/01.mp3');

  });

  //清除 = 新增圖面
  $('#add_canvas').click(function(e){
    $('#redo_canvas, #undo_canvas, #save_canvas').removeAttr('disabled');
    newColor = '#ffffff';
    ctx.fillStyle='';
    myCanvas.style.background='';
    $('#allbackground').val('#ffffff');
    $('#allbackground_picker').val('#ffffff').css('border-color','#FFFFFF');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    $('#myCanvas').css('cursor','');
    return false;
    if(e.state){
      context.putImageData(e.state, 0, 0);
    }
  });


  // 儲存
var saved_dataURL;
  $('#save_canvas').click(function(){
    ctx.globalCompositeOperation = "destination-over";
    console.log('newColor'+newColor);
    //console.log(typeof newColor === "undefined");
    /*if( typeof newColor === "undefined"){
      ctx.fillStyle  = '#ffffff';
    }else{*/
      ctx.fillStyle  = newColor;
    //}

    myCanvas.style.background = newColor;
    //ctx.fill();
    ctx.fillRect(0, 0, 700, 350);
    ctx.fill();

    saved_dataURL =  canvas.toDataURL('image/jpeg');
    sessionStorage.setItem('image', saved_dataURL );

    //var data_obj = {name : '', pic:'',music:''};
    socket.emit('message', {name: user_name, pic: saved_dataURL, music: ''});
    //load.disabled = false;

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    // A.自己畫的圖片要自己 append
    var author_talking_dom = '<p><code>'+ user_name +'</code>\'s works:</p>'
    var new_saved_dom = '<img src="' + saved_dataURL + '"/>';
    console.log(new_saved_dom);
    $('#paint_saved_history').prepend('<div class="clearfix">'+ author_talking_dom + new_saved_dom + '</div>');


    prop_msg('Broadcase Your Works!');
    $('#redo_canvas, #undo_canvas, #save_canvas').attr('disabled','disabled');
    $('#myCanvas').css('cursor','not-allowed');
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    return false;
  });

    // B.接收別人的圖片要接 data_obj
    socket.on('receivePic',function(data_obj){
      console.log( data_obj.name );
      console.log('理我一下');
      var author_talking_dom = '<p><code>'+ data_obj.name +'</code>\'s works:</p>'
      var new_saved_dom = '<img src="' + data_obj.pic + '"/>';
      console.log(new_saved_dom);
      $('#paint_saved_history').prepend('<div class="clearfix">'+ author_talking_dom + new_saved_dom + '</div>');
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
     audio.pause();
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
    audio.play();
  }


   $('#allbackground_picker').colpick({
        layout:'hex',
        colorScheme:'dark',
        submit:0,
        onChange:function(hsb,hex,rgb,fromSetColor) {
            if(!fromSetColor) $('#allbackground_picker').val(hex).css('border-color','#'+hex);
            $('#allbackground').val( '#'+hex);
            newColor = $('#allbackground').val();
            myCanvas.style.background = newColor;

            ctx.fillStyle  = newColor;

        }
    });
   $('#allbackground_picker').keyup(function(){
        $(this).colpickSetColor(this.value);
    });


   // shim and create AudioContext
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    var audio_context = new AudioContext();

    // shim and start GetUserMedia audio stream
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });

    function startUserMedia(stream) {
      // create MediaStreamSource and GainNode
      var input = audio_context.createMediaStreamSource(stream);
      var volume = audio_context.createGainNode();
      volume.gain.value = 0.7;

      // connect them and pipe output
      input.connect(volume);
      volume.connect(audio_context.destination);

      // connect recorder as well - see below
      var recorder = new Recorder(input);
    }

});