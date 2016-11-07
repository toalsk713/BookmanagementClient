

	function insertComment() {

		$.ajax({
			url: "http://localhost:7070/book/bookReview",
			type: "GET",
			dataType: "jsonp",
			jsonp: "callback",
			data: {
				isbn: localStorage.isbn,
				review: $("[type=review]").val()
			},
			success: function () {
				alert("정상적으로 등록되었습니다.");
				$("#review").val(" ");
				location.reload();
			},
			error: function () {
				alert("서평등록 에러 발생!!");
			}
		});
	}


	$(function(){

		var isbn = localStorage.isbn;

		$.ajax({
			url : "http://localhost:7070/book/printReview",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",
			data : {
				isbn : isbn
			},
			success : function(result){

				for(var i=0; i < result.length; i++){

					var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);
					var seqTd = result[i].seq;
					var idTd = $("<td></td>").text(result[i].id);
					var contentTd = $("<td></td>").text(result[i].content);
					var deletebtn = $("<span id='"+seqTd+"' class='glyphicon glyphicon-remove'></span>");
					deletebtn.on("click", deleteReview);
					var deleteTd = $("<td></td>").append(deletebtn);

					//tr.append(seqTd);
					tr.append(idTd);
					tr.append(contentTd);
					tr.append(deleteTd);

					$("#myTbody").append(tr);

				}
			}
			,
			error : function(){
				alert("뭔가 이상함");
			}
		})
	});



	function deleteReview(){

		$.ajax({
			url : "http://localhost:7070/book/deleteReview",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",
			data : {
				deleteReviewNo: $(this).attr("id")
			},
			success : function(){
				alert("서평이 삭제되었습니다.");
				location.reload();
			},
			error : function(){
				alert("삭제 에러 발생!!");
			}
		});

	}



