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
              var token = data['token'];
              Cookies.set('user_token', token);
              $(location).attr('href', 'http://localhost:3000/clicker');
              
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
            		alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
         });

 			return false

});