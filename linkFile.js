 $(document).ready(init);

function init(){
  var newArr = [];
  var list = $('<ol></ol>')
  $.getJSON('json.json', function(data) {
    var numOfPlaces = Object.keys(data).length;
    for (var i = 1; i <= numOfPlaces; i++){
      console.log(data[i].pic)
      list.append('<li><a href="'+ data[i].pic + '">'+ data[i].name +'</a></li>')
    }
    $('.container').append(list);

  });
}