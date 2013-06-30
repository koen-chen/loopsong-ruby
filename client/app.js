$(function(){
 //    $("#loginBtn").click(function(event){
	// 	event.preventDefault();
	// 	$('#mask').show();
	// 	$('#loginForm').show();
	// });

	// $('#loginForm .closeBtn').click(function(){
	// 	$('#mask').hide();
	// 	$('#loginForm').hide();
	// })

	// $('#loginForm').submit(function(){
	// 	var $form = $(this);
	// 	$.ajax({
	// 		url: '/login',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: $form.serialize()
	// 	}).done(function(data){
	// 		if (data.error) {
	// 			$form.find('.tips').css('display','block').html(data.message);
	// 		}
	// 		else {
 //                $form.hide();
 //                $('#mask').hide();
 //                $("#loginBtn").replaceWith('<a class="adminBtn" href="/user/'+ data.id +'">管理</a><a class="logoutBtn" href="/logout">退出</a>');
	// 		}
	// 	});
	// 	return false;
	// });


	$('#styleList').hover(function(){
		$('.styleListBtn').addClass('active');
		$('#styleList > ul').slideDown();
	}, function() {
		$('.styleListBtn').removeClass('active');
		$('#styleList > ul').slideUp();
	});

	$('#styleList .level1').hover(function(){
		$(this).find('.subStyle').animate({
			width:'toggle'
		},200);
	}, function(){
		$(this).find('.subStyle').animate({
			width:'toggle'
		},200);
	});

	$('#searchForm input').focusin(function(){
		$(this).css('background','#fff').animate({
			'width': '140px'
		})
	}).focusout(function(){
		$(this).css('background','transparent').animate({
			'width': '80px'
		})
	});

	$('.albumList > li').hover(function(){
		$(this).find('.sleeve').animate({'top':'-19px'});
		$(this).find('.cover').animate({'margin-top':'20px'});
	}, function(){
		$(this).find('.sleeve').animate({'top':'0px'});
		$(this).find('.cover').animate({'margin-top':'0px'});	
	});

	$('.albumList > li').click(function(){
		$.ajax({
            url: '/albums/'+ $(this).attr('albumId'),
            type: 'GET',
            dataType: 'json',
        }).done(function(data){
            $('#mask').show();  
            console.log(data);
            var compiled = _.template($('#albumModel').html());
            var result = compiled(data);
            $('#albumModel').html(result).show()
        });
		return false;
	});

	$('#albumModel').on('click', '.closeBtn', function(){
		$('#mask').hide();
		$('.albumModel').hide();
	});

    $('.albumList').isotope({
    	itemSelector:'.albumItem',
    	layoutMode: 'fitRows',
    	getSortData : {
    		hots : function($el){
    			return parseInt($el.find('.favoriteNum').text());
    		},

    		latest : function($el){
    			return parseInt($el.find('.createdAt').text());
    		}
    	}
    });

    $('.sortNav li').click(function(){
    	$(this).siblings().removeClass('active')
    	$(this).addClass('active');
    	if ($(this).hasClass('latest')) {
    		$('.albumList').isotope({sortBy:'latest'});
    	}
    	if ($(this).hasClass('popular')) {
    		$('.albumList').isotope({sortBy:'hots'});
    	}
    });

    $('.sortNav li').mouseover(function(){
        var distance = Math.round($(this).offset().left - $(".navBar").offset().left + 34);
        $('.navBox').stop().animate({
            left: distance
        }, 500, 'easeOutBack');
    });

    $('.sortNav li').mouseleave(function(){
        var distance = Math.round($('.sortNav li.active').offset().left - $(".navBar").offset().left + 34);
        $('.navBox').stop().animate({
            'left': distance
        }, 500, 'easeOutBack');
    });
});


jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});