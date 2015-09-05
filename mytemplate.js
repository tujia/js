/**
 * The simple js template engine for html
 * @author tujia 2015.09.05
 */
(function($){     
    $.extend({     
        template:function(opt,callback){
               $.each(opt, function(k,v){
                    var _targets      = $("foreach[name='"+ k +"']");
                    _targets.each(function(){
                            var _target = $(this);
                            var data_name = _target.attr('name');
                            var data_item   = _target.attr('item');
                            var data = v;
                            if(data){
                                var html     = _target.html();
                                var regx      = new RegExp("\{\\$"+ data_item +".*?\}", "g");
                                var matches = html.match(regx);
                                var compile_str = temp_str = html_copy = '';
                                $.each(data, function(kk,vv){
                                    html_copy = html;
                                    $.each(matches,function(kkk,vvv){
                                        temp_str        = vvv.replace("$"+data_item, "data["+ kk +"]");
                                        temp_str        = temp_str.substr(1, temp_str.length-2);
                                        html_copy      = html_copy.replace(vvv, eval(temp_str));
                                    });
                                    compile_str     += html_copy;
                                });
                                _target.before(compile_str);
                                _target.remove();
                            }
                    });
               });
        }     
    })  
})(jQuery);
