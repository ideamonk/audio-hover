/*!
 * Audio Hover beta
 * depends @jQuery
 *
 * Copyright 2010, Abhishek Mishra
*/

function AudioHover(){
    control_cache = {};
    
    this.hover_in = function(){
        console.log($(this).attr('class'));
    };
    
    this.hover_out = function(){
        console.log("I am out");
    };
    
    this.init = function(class_name) {
        this.control_cache = {};
        
        if (class_name == undefined)
            class_name = "audiohover";
            
        $("." + class_name).each(function(){
            var new_audio = document.createElement("audio");
            control_cache[$(this).attr('class')] = new_audio;
        });
        
        $("." + class_name).hover(
            this.hover_in,
            this.hover_out
        );
    };
}