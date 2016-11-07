
	/*$(function(){

		$.ajax({
			url : "http://localhost:7070/book/session",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",


			success : function(result){
                //
				// if(!result){
                //
				// 	//alert("세션이 존재합니다.");
                //
				// }else{
                //
                //
				// 	alert("세션이 존재하지 않습니다.");
				// }

			},
			error : function(){
				alert("로그인 에러 발생!!");
			}
		})
	});*/



	function login(){

		$.ajax({
			url : "http://localhost:7070/book/login",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					id : $("#id").val(),
					password : $("#pw").val(),
			},
			success : function(result){

				if(result){
					alert("로그인 되었습니다.");
					sessionStorage.login = "login";
					sessionStorage.id = $("#id").val();

				}else{
					alert("비밀번호 또는 아이디가 잘못되었습니다.");
				}

				$(location).attr("href","main.html");
			},
			error : function(){
				alert("서버에서 로그인 에러 발생!!");
			}
		});


	}

