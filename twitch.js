$(document).ready(function(){
    var API = "https://wind-bow.glitch.me/twitch-api";
    var users = "/users/";
    var channels = "/channels/";
    var streams = "/streams/";
    
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
            
    streamers.forEach(function(streamer){
        
        
        $.getJSON(API + streams + streamer, function(data){  
            var logo, name, status;
            var row = "<div class='row rounded-right' id='" + streamer + " '>";
            
            if(data.stream){
                name = data.stream.channel.display_name;
                logo = data.stream.channel.logo;
                status = data.stream.channel.status;
                
                row += "<div class='col-md-4 float-left'><img class='rounded-circle' src='" + logo + "' alt='logo'></div>";
                row += "<div class='col-md-4'>" + status + "</div>";
                row += "<div class='col-md-4'>" + name + "</div>";
                $(".container").append(row);
          
            } else {
              
              $.getJSON(API + users + streamer, function(data2){
                name = data2.display_name;
                logo = data2.logo;
                status = "OFFLINE";

                row += "<div class='col-md-4'><img class='rounded-circle' src='" + logo + "' alt='logo'></div>";
                row += "<div class='col-md-4'>" + status + "</div>";
                row += "<div class='col-md-4'>" + name + "</div>";
                $(".container").append(row);            
              });
          }
            
            
           
        });
        
    });    
});