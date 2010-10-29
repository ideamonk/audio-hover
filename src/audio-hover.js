/*!
 * Audio Hover beta
 * depends @jQuery
 *
 * Copyright 2010, Abhishek Mishra
*/

(function(){
    var AudioHover = window.AudioHover = function(){
        control_cache = {};
    
        var hover_in = function(){
            control_cache[$(this).attr('class')].play();
        };
    
        var hover_out = function(){
            control_cache[$(this).attr('class')].pause();
            control_cache[$(this).attr('class')].currentTime = 0;
        };
    
        var audio_type = function(filename){
            var types = {
                "ogg":"audio/ogg",
                "mp3":"audio/mpeg",
                "wav":"audio/x-wav",
            };
            return types[filename.substr(filename.lastIndexOf('.') + 1)];
        };
    
        this.init = function(class_name) {
            this.control_cache = {};
        
            if (class_name == undefined)
                class_name = "audiohover";
            
            $("." + class_name).each(function(){
                var this_class_name = $(this).attr('class');
                var new_audio = document.createElement("audio");
                var sources = jQuery.parseJSON( '{ "sources" :' + 
                        this_class_name.match(/\[(.*)\]/)[0].replace(/\'/g,"\"")
                    + '}').sources;
                
                for (i=0; i<sources.length; i++){
                    var source = document.createElement("source");
                    source.src = sources[i];
                    source.type = audio_type(sources[i]);
                    new_audio.appendChild(source);
                }
                control_cache[$(this).attr('class')] = new_audio;
            });
        
            $("." + class_name).hover(
                hover_in,
                hover_out
            );
        };
    }
})();

$(document).ready( function(){
	// initialize AudioHover
	var _ah = new AudioHover();
	_ah.init();		// set it up
});