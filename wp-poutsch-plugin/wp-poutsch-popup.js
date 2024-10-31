function bind_usefull(){

    // Init input for send ID
    jQuery("#question_id").keypress(function (event){
    	if (event.keyCode == 13){
    		event.preventDefault();
    		send_poutsch();
    	}
    	else
    		check_id(jQuery("#question_id").val());
    });

    // Init input for question search
    jQuery("#question-search").keypress(function (event){
    	if (event.keyCode == 13){
    		event.preventDefault();
    		send_poutsch();
    	}
    	var term_search = jQuery("#question-search").val();
    	autocomplete_question(term_search);
    });


}


function autocomplete_question(term_search){
	jQuery("#question-search").autocomplete({
		source: function (request, response) {
			jQuery.ajax({
				async: false,
				cache: false,
				type: "GET",
				dataType: 'jsonp',
				url: "https://poutsch.com/app/render/auto_header.php?term="+term_search+"&justq=true",
				success: function (data) {
					response( jQuery.map( data, function( item ) {
						item.label = jQuery('<div/>').html(item.label).text();
						return {
							label: item.label,
							value: item.id
						}
					}));
				}
			});
		},
		focus: function(event, ui){
			jQuery("#question-search").val(ui.item.label);
			return false;
		},
		select: function(event, ui){
			jQuery("#question_id").val(ui.item.value);
			jQuery("#question-search").val(ui.item.label);
			return false;
		}
	});
}

function init_popup_content(){
	jQuery("#ed_toolbar").prepend("<div id='poutsch-form' style='width:200px; heigth: 400px; postion: absolute; border: 15px; display: none'>\
		<a href='#' style='float: right; postion absolute; text-decoration: none; color: black; font-size: 11px' onclick='close_popup_poutsch()' >X</a>\
		<p style='margin-top: 3px; margin-bottom: 3px; text-align: center'>Enter the id of your question:</p>\
		<input type='text' name='id' id='question_id' placeholder='Type a question ID ' style='width: 197px;'/>\
		<p style='margin-top: 4px; margin-bottom: 3px; text-align: center'>You can search your question</p>\
		<input type='text' name='question' id='question-search' placeholder='Type your question here' style='width: 197px;'/>\
		<input type='checkbox' id='question_is_title' style='margin-left: 15px;'/>Question is article title\
		<input id='widget_width' type='text' value='540' style='width: 33px; height: auto; margin-left: 15px'> Widget width in pixels </br>\
		<p style='margin-top: 4px; margin-bottom: 3px; text-align: center'>Display these elements:</p>\
		<span style='margin-top: 4px; margin-bottom: 3px; text-align: center'>\
		<input id='tags_is_visible' checked='checked' type='checkbox' style='display: inline-block'>Tags\
		<input id='picture_is_visible' checked='checked' type='checkbox' style='display: inline-block'>Author Pic\
		<input id='chat_is_visible' checked='checked' type='checkbox' style='display: inline-block'>Chat\
		</span>\
		<input type='button' id='send-poutsch-button' style='width: 197px; text-align: center' value='Send'>\
		<input type='button' href='https://poutsch.com/ask' id='href-poutsch' onclick='redirect_to_poutsch()' style='text-align: center;width: 197px;' value='Ask your question on Poutsch'>\
		</div>");
jQuery("#qt_content_ed_h1").css("background-image", "url('/wordpress/wp-content/plugins/wp-poutsch-plugin/poutsch-icon.jpg')");
}

function redirect_to_poutsch(){
	window.open('https://poutsch.com', '_blank');
	window.focus();
}

function check_id(id){
	jQuery.ajax({
		async: false,
		cache: false,
		type: "GET",
		dataType: 'jsonp',
		url: "https://poutsch.com/api/v1/questions/"+id,
		success: function (data) {
			if (data.response.question)
				jQuery("#question-search").val(data.response.question);
		}
	});
}

function init_popup_backend(){
	jQuery("#qt_content_ed_h1").attr("onclick", "open_popup_poutsch();");
	jQuery("#send-poutsch-button").attr("onclick", "send_poutsch();");
}

function open_popup_poutsch(){
	jQuery("#poutsch-form").css('display', 'inline-block');
	jQuery("#poutsch-form").css({
		'background-color': '#EEEEEE',
		'border-style' : 'solid',
		'border-width' : '1px',
		'border-color' : '#C3C3C3'
	});
	jQuery("#poutsch-form").css({
		"position": "absolute",
		"top" : "189px",
		"left": "519px"
	});
	jQuery("#qt_content_ed_h1").attr("onclick", "close_popup_poutsch()");
}

function close_popup_poutsch(){
	jQuery("#poutsch-form").css("display", "none");
	jQuery("#question_id").val("");
	jQuery("#question-search").val("");
	jQuery("#qt_content_ed_h1").attr("onclick", "open_popup_poutsch()");
}

function is_checked(obj){
	if (obj.attr("checked") == "checked")
		return 'true';
	return 'false';
}

function send_poutsch(){
	if (jQuery("#question_is_title").attr("checked") == "checked"){
		jQuery("#title").val(jQuery("#question-search").val());
		jQuery("#title-prompt-text").text("");
	}
	var id = jQuery("#question_id").val();
	if (id  != ""){
		jQuery("#content").val(jQuery("#content").val() + "<div class='poutsch_question' style='margin-bottom:15px'><a href='https://poutsch.com/question/"+id+"' target='_blank'>https://poutsch.com/question/"+id+"</a></div>");
		close_popup_poutsch();
	}
}