

	$(function(){

		$.ajax({
			url : "http://localhost:7070/book/session",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",

			success : function(result){

				// 세션있을때
				if(!result.result){

				}
				else{
					alert("로그인 한 후 이용 가능합니다.");
					$(location).attr("href","main.html");
				}
			},
			error : function(){

			}
		})

	});



	function searchBook(){
		//입력상자에 키가 입력되면 무조건 호출
		//우리가 원하는 건 enter key를 입력했을 때 서버와 통신
		if(event.keyCode == 13){
		//사용자가 입력한 ISBN번호를 가져와서
		//AJAX로 서버프로그램을 호출

			$("tbody").empty();
		
			$.ajax({
				url : "http://localhost:7070/book/shareBookList",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					keyword : $("#place").val()
				},
				success : function(result){

						for(var i = 0; i<result.length; i++) {

							var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

							var titleTd = $("<td></td>").text(result[i].title);
							var authorTd = $("<td></td>").text(result[i].author);
							var priceTd = $("<td></td>").text(result[i].price);
							var img = $("<img/>").attr("src", result[i].img);
							img.css("width","140px");
							var imgTd = $("<td></td>").append(img);

							var rentalTd = $("<td></td>");
							var returnTd = $("<td></td>");


							var rentalId = $("<h5></h5>");

							if(sessionStorage.login == "login"){

								if(result[i].id == ""){
									var rentalBtn = $("<input>").attr("type", "button").attr("value", "대여");
									rentalBtn.on("click", rentalBook);
									rentalTd.append(rentalBtn);
								} else{
									rentalId.text(result[i].id);
									rentalTd.append(rentalId);
								}

								if(result[i].id == sessionStorage.id){
									var returnBtn = $("<input>").attr("type", "button").attr("value", "반납");
									returnBtn.on("click", returnBook);
									returnTd.append(returnBtn);

								} else{

								}

							}


							tr.append(imgTd);
							tr.append(titleTd);
							tr.append(authorTd);
							tr.append(priceTd);
							tr.append(rentalTd);
							tr.append(returnTd);

							$("tbody").append(tr);
						}
				},
				error : function(){
					alert("뭔가 이상함");
				}
					
			});
		}
	}



	function mySort() {
		var rows = $("table").find("tbody > tr").get();

		rows.sort(function (x, y) {

			var key1 = $(x).children("td").eq(3).text();
			var key2 = $(y).children("td").eq(3).text();

			if(key1 < key2) 
				return -1;
			if(key1 > key2) 
				return 1;

			return 0;
		});

		$.each(rows, function (idx, row) {
			$("table").children("tbody").append(row);

		});
	}



	function rentalBook() {
		var isbn = $(this).parent().parent().attr("data-isbn");
		var thisTd = $(this).parent().parent().find("td:nth-child(5) > input");

		console.log("rentBook: login");

		$.ajax({
			url: "http://localhost:7070/book/rentBook",
			type: "get",
			dataType: "jsonp",
			jsonp: "callback",
			data: {
				isbn: isbn
			},
			success: function (result) {
				alert("책 대여 성공! ");
				thisTd.remove();
			},
			error: function () {
				alert("Share Book Add AJAX ERROR.");
			}
		});
	}

	function returnBook() {
		var isbn = $(this).parent().parent().attr("data-isbn");
		var thisTd = $(this).parent().parent().find("td:nth-child(6) > input");
		var thisTd2 = $(this).parent().parent().find("td:nth-child(5) > h5");
		var shareUser = $(this).parent().parent().find("td:nth-child(5) > h5").html();

		if(sessionStorage.login == "login"){

			if(sessionStorage.id == shareUser){
				$.ajax({
					url: "http://localhost:7070/book/returnBook",
					type: "get",
					dataType: "jsonp",
					jsonp: "callback",
					data: {
						isbn: isbn
					},
					success: function (result) {
						alert("책 반납 성공! ");
						thisTd.remove();
						thisTd2.remove();
					},
					error: function () {
						alert("Share Book Return AJAX ERROR.");
					}
				});
			} else{
				alert("본인이 대여한 책만 반납할 수 있습니다.....");
			}



		} else{
			alert("로그인 후 이용해주세요!");
		}
	}

	$(document).ready(function () {

		$("#showList").on("click", function () {

			$("tbody").empty();

			$.ajax({
				url: "http://localhost:7070/book/sharedBookList",
				type: "get",
				dataType: "jsonp",
				jsonp: "callback",
				data: {
				},
				success: function (result) {
					for(var i = 0; i<result.length; i++) {

						var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);

						var titleTd = $("<td></td>").text(result[i].title);
						var authorTd = $("<td></td>").text(result[i].author);
						var priceTd = $("<td></td>").text(result[i].price);
						var img = $("<img/>").attr("src", result[i].img);
						img.css("width", "140px");
						var imgTd = $("<td></td>").append(img);

						var rentalTd = $("<td></td>");
						var returnTd = $("<td></td>");


						var rentalId = $("<h5></h5>");

						if (sessionStorage.login == "login") {

							if (result[i].id == "") {
								var rentalBtn = $("<input>").attr("type", "button").attr("value", "대여");
								rentalBtn.on("click", rentalBook);
								rentalTd.append(rentalBtn);
							} else {
								rentalId.text(result[i].id);
								rentalTd.append(rentalId);
							}

							if (result[i].id == sessionStorage.id) {
								var returnBtn = $("<input>").attr("type", "button").attr("value", "반납");
								returnBtn.on("click", returnBook);
								returnTd.append(returnBtn);

							} else {

							}

						}

						tr.append(imgTd);
						tr.append(titleTd);
						tr.append(authorTd);
						tr.append(priceTd);
						tr.append(rentalTd);
						tr.append(returnTd);

						$("tbody").append(tr);
					}

				},
				error: function () {
					alert("Share Book List AJAX ERROR.");
				}
			});

		});
	});






