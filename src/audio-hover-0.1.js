/*!
 * Audio Hover beta
 * depends @jQuery
 *
 * Copyright 2010, Abhishek Mishra
*/

(function(){
    var AudioHover = window.AudioHover = function(){
        var control_cache = {};
        var play_delay = 0;
        var pause_delay = 0;
        var stop_on_out = true;
        
        var audio_types = {
                "ogg":"audio/ogg",
                "mp3":"audio/mpeg",
                "wav":"audio/x-wav",
        };
            
        var hover_in = function(){
            var class_name = $(this).attr('class'); // this changes inside timeout scope
            setTimeout(
                function(){
                    control_cache[class_name].play();
                }, play_delay
            );
        };
    
        var hover_out = function(){
            if (stop_on_out){
                var class_name = $(this).attr('class'); // this changes inside timeout scope
                setTimeout(
                    function(){
                        control_cache[class_name].pause();
                        control_cache[class_name].currentTime = 0;
                    }, pause_delay
                );
            }
        };
    
        var audio_type = function(filename){
            return audio_types[filename.substr(filename.lastIndexOf('.') + 1)];
        };
    
        this.play_after = function (delay) {
            // delay for start of hover-in play
            play_delay = delay;
        };
        
        this.stop_after = function (delay) {
            pause_delay = delay;
        };
        
        this.play_full = function (state) {
            stop_on_out = false;
        };
        
        this.setup = function(class_name) {
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
	// create a new AudioHover helper
	var _audiohover = window._audiohover = new AudioHover();
});