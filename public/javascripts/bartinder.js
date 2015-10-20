
// $(document).on('click', function() {
//   console.log('bartinder');

// });


$('.login_form').on('submit', function(){
			var name = $('#name').val();
			var password = $('#password').val();
 			$.ajax({
            url: 'http://localhost:3000/authenticate',
            dataType: "json",
            method: "POST",
            data: {
            	name: name,
            	password: password
            	
          		},
            success: function(data, textStatus, jqXHR){
               console.log("hi");
               console.log(data);
               // var token = data['token'];
               // console.log(token);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
            		alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
         });

    return false

});