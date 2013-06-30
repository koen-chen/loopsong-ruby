$(function(){
    var $albumForm = $('#albumForm');

    $albumForm.parsley({
        messages: {
            require: '必填字段',
            url: '请输入合法的网址'
        }
    });

    $('.deleteBtn').on('click', function(event){
        var $btn = $(this);
        if (confirm('确定删除？')) {
            $.ajax({
                url: $(this).attr('href'),
                type: 'DELETE',
                dataType: 'json'
            }).done(function(data){
                if (!data.error) {
                    alert('专辑删除成功！');
                    $btn.parents('li').remove();
                }
            });
        }
        return false;
    });

	$albumForm.on('click', 'button', function(){
        if (!$albumForm.parsley( 'validate' )) {
            return false;
        }
        var btnType = $(this).data('mtype');
        if (btnType == 'submit') {
			$albumForm.submit();
			return;
		}
		
		var currentStep = parseInt($albumForm.data('step'));
		var nextStep = (btnType == 'next') ? (currentStep + 1) : (currentStep - 1);

		switch (nextStep) {
			case 1 :
                $albumForm.find('.backBtn, .submitBtn').hide();
				$albumForm.find('.nextBtn').show();
				break;
			case 2 :
				$albumForm.find('.submitBtn').hide();
				$albumForm.find('.nextBtn, .backBtn').show(); 
				break;
			case 3 :
				$albumForm.find('.nextBtn').hide();
				$albumForm.find('.backBtn, .submitBtn').show(); 
				break;
		}
        $albumForm.find('.step').hide();
		$albumForm.find('.step' + nextStep).show();
		$albumForm.data('step', nextStep);
	});

	var jcrop_api, boundx, boundy;
	$("#upload_cover").uploadify({
	 	'buttonText' : '选择封面',
	 	'fileTypeDesc' : '选择图片文件',
        'fileTypeExts' : '*.gif; *.jpg; *.png; *.jpeg',
	 	'fileObjName' : 'uploadCover',
	 	'multi' : false,
        'swf'      : '/lib/uploadify/uploadify.swf',
        'uploader' :　'/uploadCover',
        'onUploadSuccess': function(file,data,response){
        	$('#coverWrap .wrap').html('').append('<img width="300" src="/images/cover/'+file.name+'" />');
        	$('#previewWrap .wrap').html('').append('<img width="300" src="/images/cover/'+file.name+'" />');
            $('#album_cover').attr('value',file.name);
       		$('#coverWrap img').Jcrop({
       			onChange: updatePreview,
        		onSelect: updatePreview,
        		aspectRatio: 1 
       		}, function(){
		        var bounds = this.getBounds();
		        boundx = bounds[0];
		        boundy = bounds[1];
		    });
        }
    });

    function updatePreview(c) {
    	if (parseInt(c.w) > 0) {
          var rx = 300 / c.w;
          var ry = 300 / c.h;

          $('#previewWrap img').css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
          });

          $('#coords').attr('value', c.x + '|' + c.y);
        }
    }
});