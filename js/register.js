

	function registerInfo(){

		alert("가입되었습니다.");

		$.ajax({
			url : "http://localhost:7070/book/memberInsert",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					id : $(".id").val(),
					password : $(".password").val(),
					email : $(".email").val()
			},
			success : function(result){

				$(location).attr("href","main.html");

			},
			error : function(){
				alert("회원가입 에러 발생!!");
			}
		});


	}
