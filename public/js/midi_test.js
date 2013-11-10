    
    window.onload = init;

    function init(){
      init_drawing_array();

      audio_volume = 127;
      MIDI.loadPlugin({
        soundfontUrl: "./midi/soundfont/",
        instruments: [ "acoustic_grand_piano", "synth_drum" ],
        callback: function() {
          MIDI.programChange(0, 0);
          MIDI.programChange(1, 118);
          run();
        }
      }); 
    }

    function run() {

          canvas = document.getElementById('myCanvas');
          canvas_rect = canvas.getBoundingClientRect();

          ctx = canvas.getContext('2d');

          window.onmousemove = handleMouseMove;
          function handleMouseMove(event) {
              event = event || window.event; // IE-ism
              var num = 40;

              if(event.clientX>canvas_rect.left && event.clientX<canvas_rect.right && event.clientY>canvas_rect.top && event.clientY<canvas_rect.bottom){
                console.log('x: ' + (num+event.clientX/20));
                console.log('y: ' + (num+event.clientY/20));

                console.log('original x: ' + event.clientX);
                console.log('original y: ' + event.clientY);

                 var x = num+Math.floor(event.clientX/20);
                 var y = num+Math.floor(event.clientY/20);
                 //note = Math.floor(x*Math.random()+y*Math.random());
                 //var note = Math.floor(x/y*50);
                 //var note = Math.floor(x*y/50);

                 var note = Math.floor(x);

                 note = normalize(note);

                 check_volume();

                 //console.log(note);
                 var random_num = Math.random();
                 //if(random_num>0.8)
                   play(note)
              }
          }
    };

    function normalize(note){
      var color = ctx.strokeStyle.toString().substr(1);
      //alert(color);
      var factor = 1;
      if(color == 'ff0000')
        factor = 1/6;
      if(color == 'ffc0cb')
        factor = 2/6
      if(color == 'ffa500')
        factor = 3/6
      if(color == '0000ff')
        factor = 4/6
      if(color == '008000')
        factor = 5/6

      return Math.round(note * factor+40);
    }


    function play(note) {
      //console.log('played');
      var delay = 0; // play one note every quarter second
      var velocity = 127; // how hard the note hits
      // play the note
      MIDI.setVolume(0, audio_volume);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 0.75);
    }


    function play_delayed(note) {
      setTimeout(function(){

        var delay = 0.2; // play one note every quarter second
        var velocity = 127; // how hard the note hits
        // play the note
        MIDI.setVolume(0, audio_volume);
        MIDI.noteOn(0, note, velocity, delay);
        //MIDI.noteOff(0, note, delay + 0.75);
        //MIDI.noteOff(0, note, delay + 0.75);

      },100)


    }

    function check_volume(){
      audio_volume = Math.round(200 * (0.5 + parseInt(document.getElementById('choose_range').value) / 15));
    }


    // function play_series(arr) {
    //   var delay = 0; // play one note every quarter second
    //   var velocity = 127; // how hard the note hits
    //   // play the note
    //   MIDI.setVolume(0, audio_volume);
    //   for(var i=0;i<arr.length;i++){
    //     MIDI.noteOn(0, arr[i], velocity, delay);
    //   }
    // };

