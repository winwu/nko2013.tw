    
    window.onload = init;

    function init(){
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

          console.log(ctx.strokeStyle);

          window.onmousemove = handleMouseMove;
          function handleMouseMove(event) {
              event = event || window.event; // IE-ism
              var num = 40;

              if(event.clientX>canvas_rect.left && event.clientX<canvas_rect.right && event.clientY>canvas_rect.top && event.clientY<canvas_rect.bottom){
                console.log('x: ' + (num+event.clientX/20));
                console.log('y: ' + (num+event.clientY/20));

                 var x = num+Math.floor(event.clientX/20);
                 var y = num+Math.floor(event.clientY/20);
                 //note = Math.floor(x*Math.random()+y*Math.random());
                 var note = Math.floor(x/y*50);
                 //var note = Math.floor(x*y/50);

                 note = normalize(note);

                 console.log(note);
                 var random_num = Math.random();
                 if(random_num>0.9)
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
      var delay = 0; // play one note every quarter second
      var velocity = 127; // how hard the note hits
      // play the note
      MIDI.setVolume(0, 127);
      MIDI.noteOn(0, note, velocity, delay);
      //MIDI.noteOff(0, note, delay + 0.75);
    };


    function play_series(arr) {
      var delay = 0; // play one note every quarter second
      var velocity = 127; // how hard the note hits
      // play the note
      MIDI.setVolume(0, 127);
      for(var i=0;i<arr.length;i++){
        MIDI.noteOn(0, arr[i], velocity, delay);
      }
    };
