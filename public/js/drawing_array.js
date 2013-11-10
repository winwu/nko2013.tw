
// all_array_x = []
// one_stroke_x = []
// all_array_y = []
// one_stroke_y = []

function init_drawing_array(){
	all_array_x = []
	one_stroke_x = []
	all_array_y = []
	one_stroke_y = []
}

function save_one_point(x,y){
	// one_stroke_x.push(x);
	// one_stroke_y.push(y);
	all_array_x.push(x);
	all_array_y.push(y);
	//console.log(x);
	//console.log(y);
}

function save_one_stroke(){
	// var one_stroke_x_copy = one_stroke_x.slice();
	// var one_stroke_y_copy = one_stroke_y.slice();

	// all_array_x.push(one_stroke_x_copy);
	// all_array_y.push(one_stroke_y_copy);
	one_stroke_x = [];
	one_stroke_y = [];
}

function save_all_array(){
	socket.emit('all_array', {all_array_x: all_array_x, all_array_y: all_array_y});
	init_drawing_array();
}

// function play_from_all_array(img_dom_element){

// 	var all_x = img_dom_element.getAttribute('data-x');
// 	var all_y = img_dom_element.getAttribute('data-y');

// 	console.log(all_x);
// 	console.log(all_y);

// 	var delay = 0; // play one note every quarter second
// 	var velocity = 127; // how hard the note hits
// 	// play the note
// 	MIDI.setVolume(0, audio_volume);
// 	for(var i=0;i<all_x.length;i++){
// 		var x = parseInt(all_x[i]);
// 		var y = parseInt(all_y[i]);
// 		if((typeof x == 'number') && (typeof y == 'number')){
// 			var num = 40;
// 			x = num+Math.floor(x/20);
//             y = num+Math.floor(y/20);
// 			var note = Math.floor(x/y*50);
// 			//console.log(note);

// 		     note = normalize(note);

//              check_volume();

//              //console.log(note);
//              var random_num = Math.random();
//              if(random_num>0.5)
//                play(note)

// 		}
// 	}

// }


function play_from_all_array(img_dom_element){

	var all_x = img_dom_element.getAttribute('data-x');
	var all_y = img_dom_element.getAttribute('data-y');

	play_all(all_x,all_y);

}

function play_all(all_x,all_y){
	if(all_x.length>0){
		var delay = 0; // play one note every quarter second
		var velocity = 127; // how hard the note hits
		// play the note
		MIDI.setVolume(0, audio_volume);
		var x = parseInt(all_x[0]);
		var y = parseInt(all_y[0]);
		if((typeof x == 'number') && (typeof y == 'number')){
			var num = 40;
			// x = num+Math.floor(x/20);
	  //       y = num+Math.floor(y/20);
			// //var note = Math.floor(x/y*50);

			console.log(x);
			
	        var note = Math.floor(x);

			//console.log(note);
		    note = normalize(note);
	        check_volume();
	       	
	       	var random_num = Math.random();
	        //if(random_num>0.8)
	    	    MIDI.noteOn(0, note, velocity, delay);

	        setTimeout(function(){
		 	    play_all(all_x.slice(1),all_y.slice(1));
	        },1);
		}
	}
}


