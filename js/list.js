

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

		// 이미지 업로드
		var imageLoader = document.getElementById('filePhoto');
		imageLoader.addEventListener('change',handleImage,false);

		function handleImage(e){
			var reader = new FileReader();
			reader.onload = function(event){
				$('.uploader img').attr('src', event.target.result);
			}
			reader.readAsDataURL(e.target.files[0]);
		}
	});

	function insertBook(){

			$.ajax({
				url : "http://localhost:7070/book/bookInsert",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					imgbase64 : $("#img").attr("src"),
					isbn : $("[type=isbn]").val(),
					author: $("[type=author]").val(),
					price : $("[type=price]").val(),
					title : $("[type=title]").val()

				},
				success : function(){
					alert("정상적으로 처리되었습니다.");
				},
				error : function(){
					alert("업데이트 에러 발생!!");
				}
			});

	}


	function searchBook(){
		//입력상자에 키가 입력되면 무조건 호출
		//우리가 원하는 건 enter key를 입력했을 때 서버와 통신
		if(event.keyCode == 13){
		//사용자가 입력한 ISBN번호를 가져와서
		//AJAX로 서버프로그램을 호출
		
			$.ajax({
				url : "http://localhost:7070/book/bookList",
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


							//서평
							var commentbtn = $("<input />").attr("type","button").attr("value","서평").attr("id","comment").attr("class","btn-xs, btn-warning");
							var commentTd = $("<td></td>").append(commentbtn);


							//상세정보
							var infobtn = $("<input />").attr("type","button").attr("value","상세정보").attr("id","info").attr("class","btn-xs, btn-success");
							infobtn.on("click",function(){

								var isbn = $(this).parent().parent().attr("data-isbn");
								var thisTd = $(this).parent().parent().find("td:nth-child(2)");

								$.ajax({
									url : "http://localhost:7070/book/bookInfo",
									type : "GET",
									dataType : "jsonp",
									jsonp : "callback",
									data : {
										isbn : isbn
									},
									success : function(result){

										var line = $("<p></p>").text("--------------------------------------------");
										thisTd.append(line);

										var date = $("<p></p>").text("출판일: " + result.date);
										thisTd.append(date);

										var page = $("<p></p>").text("페이지수: " + result.page + "쪽");
										thisTd.append(page);

										var translator = $("<p></p>").text("번역: " + result.translator);
										thisTd.append(translator);

										var supplement = $("<p></p>").text("공급: " + result.supplement);
										thisTd.append(supplement);

										var publisher = $("<p></p>").text("출판사: " + result.publisher);
										thisTd.append(publisher);

										var line2 = $("<p></p>").text("--------------------------------------------");
										thisTd.append(line2);

									},
									error : function(){
										alert("상세정보 보기 에러 발생!!");
									}
								});

							});

							var infoTd = $("<td></td>").append(infobtn);

							//삭제
							var deletebtn = $("<input />").attr("type","button").attr("value","삭제").attr("id","delete").attr("class","btn-xs, btn-danger");
							deletebtn.on("click",function(){

								var isbn = $(this).parent().parent().attr("data-isbn");

										$.ajax({
											url : "http://localhost:7070/book/bookDelete",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn
											},
											success : function(){
												alert("삭제되었습니다.");

											},
											error : function(){
												alert("삭제 에러 발생!!");
											}
										});

							});

							var deleteTd = $("<td></td>").append(deletebtn);

							//수정
							var updatebtn = $("<input />").attr("type","button").attr("value","수정").attr("class","btn-xs, btn-primary");
							updatebtn.on("click",function(){

								var price = $(this).parent().parent().find("td:nth-child(4)").text();  //가격부분 내용을 text 안 내용으로 변경
								var price_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(price);

								var author = $(this).parent().parent().find("td:nth-child(3)").text();
								var author_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(author);

								var title = $(this).parent().parent().find("td:nth-child(2)").text();
								var title_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(title);

								$(this).parent().parent().find("[type=button]").attr("disabled", "disabled");


								price_updatebox.on("keyup",function(){
									if(event.keyCode==13){

										var isbn = $(this).parent().parent().attr("data-isbn");
										var price = $(this).val();
										var title = title_updatebox.val();
										var author = author_updatebox.val();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(4)").empty();
												$(this).parent().parent().find("td:nth-child(4)").text(price);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								author_updatebox.on("keyup",function(){
									if(event.keyCode==13){

										var isbn = $(this).parent().parent().attr("data-isbn");
										var author = $(this).val();
										var title = title_updatebox.val();
										var price = price_updatebox.cal();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(3)").empty();
												$(this).parent().parent().find("td:nth-child(3)").text(author);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								title_updatebox.on("keyup",function(){
									if(event.keyCode==13){
										//update처리
										//db처리
										//ajax 호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경
										//서버프로그램에게 어떤 값을 알려줘야지 처리가 되는가?
										//변경된 책 가격, ISBN값이 필요
										var isbn = $(this).parent().parent().attr("data-isbn");
										var title = $(this).val();
										var author = author_updatebox.val();
										var price = price_updatebox.val();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(2)").empty();
												$(this).parent().parent().find("td:nth-child(2)").text(title);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								$(this).parent().parent().find("td:nth-child(4)").text("");
								$(this).parent().parent().find("td:nth-child(4)").append(price_updatebox);

								$(this).parent().parent().find("td:nth-child(3)").text("");
								$(this).parent().parent().find("td:nth-child(3)").append(author_updatebox);

								$(this).parent().parent().find("td:nth-child(2)").text("");
								$(this).parent().parent().find("td:nth-child(2)").append(title_updatebox);

							});
							var updateTd = $("<td></td>").append(updatebtn);

							tr.append(imgTd);
							tr.append(titleTd);
							tr.append(authorTd);
							tr.append(priceTd);
							tr.append(infoTd);
							tr.append(updateTd);
							tr.append(deleteTd);
							tr.append(commentTd);

							$("tbody").append(tr);
						}
				},
				error : function(){
					alert("뭔가 이상함");
				}
					
			});
		}
	}


	$(document).on('click', '#delete', function(){
		$(this).parent().parent().remove();
	});


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



	$(document).on("click","#comment",function(){

		var isbn = $(this).parent().parent().attr("data-isbn");

		localStorage.isbn = isbn;
		$(location).attr("href","comment.html");
	});








