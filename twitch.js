$(document).ready(function(){
    
    //SET UP THE URL FOR THE API
    var API = "https://wind-bow.glitch.me/twitch-api";
    var users = "/users/";
    var channels = "/channels/";
    var streams = "/streams/";
    
    //THE ARRAY OF STREAMERS TO LOOP THROUGH
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    //LOOP THROUGH THE ARRAY OF STREAMERS
    streamers.forEach(function(streamer){
        //MAKE A JSON CALL WITH CALLBACK FUNCTION
        $.getJSON(API + streams + streamer, function(data){  
            var logo, name, status, link;
            //ESTABLISH A ROW FOR EACH STREAMER
            var row = "<div class='row content d-flex align-items-center justify-content-between' id='" + streamer + " '>";
            //IF THEIR STREAM STATUS ISN'T NULL, THEN GET THEIR
            //NAME, LOGO, STATUS AND LINK
            if(data.stream){
                name = data.stream.channel.display_name;
                logo = data.stream.channel.logo;
                status = data.stream.channel.status;
                link = data.stream.channel.url;
                //ADD TO THE ROW DIV 
                //THE ARROW INDICATING THEY'RE STREAMING
                row += "<div class='col-md-1 arrow-right'></div>";
                //THE NAME WITH LINK TO THEIR TWITCH ACCOUNT
                row += "<div class='col-md-3'><a href='" + link +"'>" + name + "</a><br> is currenlty streaming!</div>";
                //THEIR STATUS
                row += "<div class='col-md-4'>Status:<br>" + status + "</div>";
                //THEIR LOGO
                row += "<div class='col-md-3'><img class='rounded-circle' src='" + logo + "' alt='logo'></div>";
                //APPEND THE FINAL BUILT ROW TO THE MAIN DIV
                $(".main").append(row);
          //IF THE STREAM STATUS IS NULL, MAKE ANOTHER JSON CALL,
                //THIS TIME TO THE CHANNELS ROUTE WHICH GIVES US
                //DIFFERENT INFO
            } else {
              $.getJSON(API + channels + streamer, function(data2){
                //STORE THE INFO IN VARIABLES  
                name = data2.display_name;
                logo = data2.logo;
                link = data2.url;
                //ADD TO THE ROW DIV JUST LIKE ABOVE  
                row += "<div class='col-md-1'></div>";
                row += "<div class='col-md-3 name'><a href='" + link + "'>" + name + "</a></div>";
                row += "<div class='col-md-4'>Status:<br>Currently Offline</div>";
                row += "<div class='col-md-3 image'><img class='rounded-circle align-middle' src='" + logo + "' alt='logo'></div>";
                //APPEND THE FINAL ROW TO THE MAIN DIV
                $(".main").append(row);
              });
          } 
        });
    });    
});