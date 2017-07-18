$(document).ready(function(){
  var url = 'https://wind-bow.gomix.me/twitch-api/streams/';
  var streamers =['moonmoon_ow','admiralbulldog','rikhh','asmongold'];
  
  var toggle_streams = function(status){
    for(var i = 0; i < streamers.length; i++) {
      var id_name = '#' + streamers[i];
      if(status == 'all') {
        $(id_name).show();  
      } else {
        if ( $(id_name).data('stat') != status ) {
          $(id_name).hide();  
        } else {
          $(id_name).show();
        }
      }     
    } 
  };
  
  $('#all-btn').addClass('menu-highlight'); 
  $('#all-btn').prop('disabled',true); 
  
  $('button').click(function(e){
    var btn_press = $(document.activeElement).val(); 
    if (btn_press == 'online') {
      toggle_streams('online');
      $('#online-btn').addClass('menu-highlight'); 
      $('#online-btn').prop('disabled',true); 
      $('#offline-btn').prop('disabled',false); 
      $('#offline-btn').removeClass('menu-highlight'); 
      $('#all-btn').removeClass('menu-highlight'); 
      $('#all-btn').prop('disabled',false); 
    } else if (btn_press == 'offline') {
      //offline handler  
      toggle_streams('offline');
      $('#offline-btn').addClass('menu-highlight'); 
      $('#offline-btn').prop('disabled',true); 
      $('#online-btn').prop('disabled',false); 
      $('#online-btn').removeClass('menu-highlight'); 
      $('#all-btn').removeClass('menu-highlight'); 
      $('#all-btn').prop('disabled',false); 
    } else {
      toggle_streams('all');
      $('#all-btn').addClass('menu-highlight'); 
      $('#all-btn').prop('disabled',true); 
      $('#offline-btn').prop('disabled',false); 
      $('#offline-btn').removeClass('menu-highlight'); 
      $('#online-btn').removeClass('menu-highlight'); 
      $('#online-btn').prop('disabled',false); 
    }
  });
  
  var load_streamers = function(id_name,i) {
    
   $.getJSON(url+streamers[i]+'?callback=?', function(js){ 
     console.log('loading');
     var info = js.stream;     
      if (info != null) {
        var title = info.channel.status;     
        if (title.length > 40) {
          title = title.slice(0,36) + "...";
        }   
        var viewers = info.viewers;
        var logo = info.channel.logo;
        var name = info.channel.display_name;
        $(id_name).data('stat','online');
        $(id_name +' > .logo').css('background-image','url(' + logo + ')');
        $(id_name +' > .stream-disc').text(name+ ": " +title );
        $(id_name +' > .viewer-info').text(viewers);
      } else {
        //offline profile     
        $(id_name).data('stat','offline');
        $(id_name +' > .logo').css('padding-top','30px').text( 'offline');
        $(id_name +' > .stream-disc').text(id_name.slice(1));
        $(id_name +' > .viewer-info').text('0');
      }
    });  
  }
  
  for(var i = 0; i < streamers.length; i++) {
    var id_name = '#' + streamers[i];
    load_streamers(id_name,i);
  }

  $('.streamers').click(function(e){
    window.open('https://www.twitch.tv/'+$(this).attr('id').trim());
  });
});