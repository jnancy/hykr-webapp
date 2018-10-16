$(function(){
$.ajax({
 type : 'GET',
 url : 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200374350-e954741ee27b3d305a1cb6138f1aebfd',
 async : false,
 beforeSend : function(){/*loading*/},
 dataType : 'json',
 success : function(result){
  var buffer="";
   $.each(result, function(index, val){

     for(var i=0; i < val.length; i++){
       var item = val[i];
       console.log(item.name);
       buffer+=" <li><a href='#"+item.name+"'>"+item.name+"</a></li> <li><a href='#"+item.command+"'>"+item.command+"</a></li>";
     }
     $('#ul').html(buffer);
   });
 }
});
});
