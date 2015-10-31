 	var new_value = 0;
 	var state = { 'page_id': 3};
  var title = 'BarTinder';
  var url = '/clicker';
  history.pushState(state, title, url);
 	function increase(){
    current_value = document.getElementById("counter1").value;
    new_value = parseInt(current_value) + 1;
    document.getElementById("counter1").value = new_value;
 	}
 	function reduce(){
    current_value = document.getElementById("counter1").value;
    new_value = parseInt(current_value) - 1;
    if (new_value < 0){
    	new_value = 0;
    }
		document.getElementById("counter1").value = new_value;
 	}
