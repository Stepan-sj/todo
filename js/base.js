;(function(){
	var addtask=$(".add-task");
	var storage=[];
	var html="";
	var num;
	var tpl;
	init();



	addtask.on("submit",function(e){
		
		var inputcontent={};
		/*禁用默认行为*/
		e.preventDefault();
		inputcontent.content=$(this).find("input[name=content]").val();
		if(!inputcontent.content) return;
		add(inputcontent);
		html="<div class='task-item' data-num='"+(storage.length-1)+"'><span><input type='checkbox' class='complete'></span><span class='task-content'>"+inputcontent.content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
		$(".task-list").prepend(html)
		$("input").val("");
		
		
		
	})
	$(".task-list").on("click",".btn.detail",function(){
		num=$(this).parent().attr("data-num");
		console.log($(this).parent())
		$(".task-detail-mask").show();
		$(".task-detail").show();
		var s=store.get("storage")||[];
		var txt=s[num].txt==undefined?"":s[num].txt
		var date=s[num].time==undefined?"":s[num].time
		tpl='<form class="task-detail">'+
					'<div class="content">'+s[num].content+'</div>'+
					'<div class="desc">'+
						'<textarea name="desc" id="">'+txt+'</textarea>'+
					'</div>'+
					'<div class="remind">'+
						'<p>提醒时间</p>'+
						'<input type="text" name="date" class="datetime" value="'+(date==undefined?"":date)+'">'+
						'<button type="submit" style="text-align: center;margin-top:25px;">submit</button>'+
					   '</div>'+
				'</form>';
		$(".container").append(tpl);
		$('.datetime').datetimepicker({lang:'ch'});
		$(".task-detail").on("submit",function(e){
			e.preventDefault();
			storage[num].txt=$("textarea").val();
			storage[num].time=$("input[name=date]").val();
			store.set("storage",storage);
			$(".task-detail").remove();
			$(".task-detail-mask").hide();
		})
	})
	$(".task-list").on("dblclick",".task-item",function(){
		num=$(this).attr("data-num");
		console.log($(this).parent())
		$(".task-detail-mask").show();
		$(".task-detail").show();
		var s=store.get("storage")||[];
		var txt=s[num].txt==undefined?"":s[num].txt
		var date=s[num].time==undefined?"":s[num].time
		tpl='<form class="task-detail">'+
					'<div class="content">'+s[num].content+'</div>'+
					'<div class="desc">'+
						'<textarea name="desc" id="">'+txt+'</textarea>'+
					'</div>'+
					'<div class="remind">'+
						'<p>提醒时间</p>'+
						'<input type="text" name="date" class="datetime" value="'+date+'">'+
						'<button type="submit" style="text-align: center;margin-top:25px;">submit</button>'+
					   '</div>'+
				'</form>';

		$(".container").append(tpl);
		$('.datetime').datetimepicker({lang:'ch'});
		$(".task-detail").on("submit",function(e){
			e.preventDefault();
			storage[num].txt=$("textarea").val();
			storage[num].time=$("input[name=date]").val();
			store.set("storage",storage);
			$(".task-detail").remove();
			$(".task-detail-mask").hide();
		})


	})

	


	$(".task-list").on("click",".complete",function(){
		num=$(this).parent().parent().attr("data-num");
		var status=$(this).is(":checked")
		isComplete(status,$(this))
		storage[num].status=status;
		store.set("storage",storage);
		$(".task-list").html("");
		for(var i=0;i<storage.length;i++){
			if(storage[i].status){
				html="<div class='task-item  active' data-num='"+i+"'><span><input type='checkbox' checked class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
				$(".task-list").append(html)
			}else{
				html="<div class='task-item' data-num='"+i+"'><span><input type='checkbox' class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
				$(".task-list").prepend(html)
			}
		}

	})

	function isComplete(status,h){
		if(status){
			h.parent().parent().addClass("active")		
		}else{
			h.parent().parent().removeClass('active')	
		}
	}

	


	$(".task-detail-mask").on("click",function(){
		$(".task-detail-mask").hide();
		$(".task-detail").remove();

	})

	
	$(".task-list").on("click",".btn.dele",function(){
		num=$(this).parent().attr("data-num");
		var r=confirm("确认删除吗?")




		if(r){
			storage.splice(num,1);
			$(".task-list").html("")
			for(var i=0;i<storage.length;i++){
				if(storage[i].status){
					html="<div class='task-item  active' data-num='"+i+"'><span><input type='checkbox' checked class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
					$(".task-list").append(html)
				}else{
					html="<div class='task-item' data-num='"+i+"'><span><input type='checkbox' class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
					$(".task-list").prepend(html)
				}
			}
			store.set("storage",storage)
		}
	})


	function add(inputcontent){
		storage.push(inputcontent)
		store.set("storage",storage)
	}

	


	function init(){

		storage=store.get("storage")||[];
		var complete=[];
		for(var i=0;i<storage.length;i++){
			if(storage[i].status){
				html="<div class='task-item  active' data-num='"+i+"'><span><input type='checkbox' checked class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
				$(".task-list").append(html)
			}else{
				html="<div class='task-item' data-num='"+i+"'><span><input type='checkbox' class='complete'></span><span class='task-content'>"+storage[i].content+"</span><span class='btn detail'>详情</span><span class='btn dele'>删除</span></div>"
				$(".task-list").prepend(html)
			}
			
		}
		setInterval(call,300)
	}


    function call(){
    	storage=store.get("storage")||[];
    	for(var i=0;i<storage.length;i++){

    		if(storage[i].finshed){continue};
    		var now=new Date().getTime();
    		var settime=new Date(storage[i].time)
    		if(settime<=now){
    			storage[i].finshed=true
    			store.set("storage",storage)
    			
    			console.log("gaijisule"+storage[i].content)
    		}	
    	}
    }
   


})()