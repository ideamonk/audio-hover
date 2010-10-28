/*!
 * Audio Hover beta
 * depends @jQuery
 *
 * Copyright 2010, Abhishek Mishra
*/

function AudioHover(){
    this.hover_in = function(){
        console.log("I am in");
    };
    
    this.hover_out = function(){
        console.log("I am out");
    };
    
    this.init = function(class_name) {
        if (class_name == undefined)
            class_name = "audiohover";
        
        $("." + class_name).hover(
            this.hover_in,
            this.hover_out
        );
    };
}