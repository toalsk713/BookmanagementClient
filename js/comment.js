
	$(function(){

		var isbn = localStorage.isbn;

		console.log("this is "+isbn);

		$.ajax({
			url : "http://localhost:7070/book/session",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",

			success : function(result){

				// 세션있을때
				if(!result.result){

					$.ajax({
						url : "http://localhost:7070/book/bookComment",
						type : "GET",
						dataType : "jsonp",
						jsonp : "callback",
						data : {
							isbn : isbn
						},
						success : function(result){

							$('#img').attr("src",result.img);
							$('#title').text(result.title);
							$('#author').text(result.author);
							$('#price').text(result.price);
							$('#publisher').text(result.publisher);
							$('#page').text(result.page);

						}
						,
						error : function(){
							alert("뭔가 이상함");
						}
					})
				}else{

				}
			},
			error : function(){

			}
		})


	});




