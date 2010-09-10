/*
* jQuery Mobile Framework : prototype for "tree" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.tree = function(settings){
	
	return $(this).each(function(){
			var o = $.extend({
				expanded: '',
				theme: 'e',
				backBtnText: 'Back',
				liveBackText: false,
				loadingText: 'loading...',
				ajaxCallback: function(){
					$('.ui-body a:not(.ui-btn):not(.ui-link-inherit)').addClass('ui-link');
					tree.height($(this).outerHeight());
				}
			},settings);
	
		if( !$(this).parents('.tree').length ){
		
		//save references
		var tree = $(this),
			treeContain = tree.wrap('<div role="application" class="ui-tree-contain"></div>').parent(),
			treeheader = $('.ui-header'),
			prevHTML = treeheader.html();

		//add the role and default state attributes
		tree.attr({'role': 'tree'}).addClass('ui-tree');
		
		
		tree.find('li').each(function(){
			if($(this).contents()[0].nodeType == 3){
				$(this).wrapInner('<div></div>');
			}
		});	
		
		
		//ajax placeholders
		tree.find('li.hijax>a').after('<div class="ui-body-c"></div>');
		//add classes to panel content so it'll be excluded
		tree.find('li>:not(ul,a)').addClass('ui-tree-panel');
		//add treeitem role to all li children
		tree.find('li').not('.ui-tree-panel *').attr('role','treeitem').addClass('ui-treeitem');
		//buttons from anchors
		tree.find('li.ui-treeitem>a').addClass('ui-treeitem-link').buttonMarkup({theme: o.theme, iconPos: 'right',icon: 'arrow-r',corners: false});
		//set first node's tabindex to 0
		tree.find('li.ui-treeitem>a:eq(0)').attr('tabindex','0');
		//set all others to -1
		tree.find('li.ui-treeitem>a:gt(0)').attr('tabindex','-1');
		//add group role and tree-group-collapsed class to all ul children
		tree.find('li.ui-treeitem>a').next().attr('role','group').addClass('ui-tree-group ui-tree-group-collapsed');
		
		//find tree group parents
		tree.find('li.ui-treeitem:has(.ui-tree-group)').not('.ui-tree-panel *')
				.attr('aria-expanded', 'false')
				.find('>a')
				.addClass('ui-tree-parent ui-tree-parent-collapsed');
	
		//expanded at load		
		tree
			.find(o.expanded).not('.ui-tree-panel *')
			.attr('aria-expanded', 'true')
			.addClass('ui-tree-expanded')
				.find('>a')
				.removeClass('ui-tree-parent-collapsed')
				.next()
				.removeClass('ui-tree-group-collapsed');
			
		//for setting up the back button header	
		function setNavigation(targetLi){
			treeheader.find('.ui-back').remove();
			if(targetLi.length){
				targetA = targetLi.find('>a:eq(0)');
				var backText = o.liveBackText ? (targetLi.parents('li:eq(0)').find('>a:eq(0)').text() || o.backBtnText) : o.backBtnText;
				var bbutton = $('<a href="#" class="ui-back">'+  backText +'</a>')
					.appendTo(treeheader)
					.buttonMarkup({icon:'arrow-l'})
					.click(function(){
						targetLi.trigger('collapse');
						return false;
					});
				treeheader.find('h1').text(targetA.text());
			}
			else{
				treeheader.html(prevHTML);
			}
		}		
		
		//quick function for seeing if an event is tree-related and if so, getting all the elements related to event target
		function targetElements(event){
			if($(event.target).parents('.ui-tree-panel').length){
				return false;
			}	
			else{
				var targetLi = $(event.target).closest('li'),
					targetA = targetLi.find('>a:eq(0)'),
					targetContent = targetA.next(),
					targetParent = targetLi.closest('ul'),
					targetParentLi = targetParent.closest('li');
				
				return {
					targetLi: targetLi,
					targetA: targetA,
					targetContent: targetContent,
					targetParent: targetParent,
					targetParentLi: targetParentLi
				};
			}			
		}
		
		//bind the custom events
		tree
			//expand a tree node
			.bind('expand.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				var et = targetElements(event);
				
				//ajax content in if necessary
				et.targetContent.filter(':empty').append('<p class="ui-tree-content-loading"><span class="ui-icon ui-icon-loading"></span><span class="ui-tree-loading-text">'+ o.loadingText +'</span></p>').load(et.targetA.attr('href'), o.ajaxCallback);
				
				et.targetA.removeClass('ui-tree-parent-collapsed');
				et.targetLi.attr('aria-expanded', 'true');
				et.targetContent.removeClass('ui-tree-group-collapsed');
				et.targetParent.addClass('ui-tree-expanded');
				setNavigation(et.targetLi); 
				et.targetLi.find('li>a:eq(0)').focus(); //note - this should be tighter in scope
				tree.height('');
				tree.height(et.targetContent.outerHeight());
				event.stopPropagation();
			})
			//collapse a tree node
			.bind('collapse.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				et.targetA.addClass('ui-tree-parent-collapsed');
				et.targetLi.attr('aria-expanded', 'false');
				setTimeout(function(){ et.targetContent.addClass('ui-tree-group-collapsed'); },300);
				et.targetParent.removeClass('ui-tree-expanded');				
				setNavigation(et.targetParentLi);	
				et.targetA.focus();
				tree.height('');
				tree.height(et.targetParent.outerHeight() || tree.outerHeight());
				event.stopPropagation();	
			})
			.bind('toggle.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				et.targetLi.trigger(et.targetLi.is('[aria-expanded=false]') ? 'expand' : 'collapse');
				event.stopPropagation();
			})
			//shift focus down one item		
			.bind('traverseDown.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				if(et.targetLi.is('[aria-expanded=true]')){
					et.targetContent.find('a').eq(0).focus();
				}
				else if(et.targetLi.next().length) {
					et.targetLi.next().find('a').eq(0).focus();
				}	
				else {				
					et.targetParentLi.next().find('a').eq(0).focus();
				}
				event.stopPropagation();
			})
			//shift focus up one item
			.bind('traverseUp.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				if(et.targetLi.prev().length){ 
					if( et.targetLi.prev().is('[aria-expanded=true]') ){
						et.targetLi.prev().find('li:visible:last a').eq(0).focus();
					}
					else{
						et.targetLi.prev().find('>a:eq(0)').focus();
					}
				}
				else { 				
					et.targetParentLi.find('>a:eq(0)').trigger('collapse');
				}
				event.stopPropagation();
			})
			//native events
			.bind('focus.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				//deactivate previously active tree node, if one exists
				tree.find('[tabindex=0]').blur().attr('tabindex','-1').removeClass('ui-treeitem-active');
				//assign 0 tabindex to focused item
				et.targetA.attr('tabindex','0').addClass('ui-treeitem-active');
			})
			.bind('click.tree',function(event){
				var et = targetElements(event);
				if(!et){ return; }
				//check if target is a tree node
				if( et.targetLi.is('[aria-expanded]') ){
					et.targetLi.trigger('toggle.tree');
					et.targetA.focus();
					return false;
				}
			})
			.bind('keydown.tree',function(event){	
				var et = targetElements(event);
				if(!et){ return; }
				//check for arrow keys
				if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40){
					//if key is left arrow 
					if(event.keyCode == 37){ 
						//if list is expanded
						if(et.targetLi.is('[aria-expanded=true]')){
							et.targetLi.trigger('collapse');
						}
						//try traversing to parent
						else {
							et.targetParentLi.find('>a:eq(0)').trigger('collapse');
						}	
					}						
					//if key is right arrow
					if(event.keyCode == 39){ 
						//if list is collapsed
						if(et.targetLi.is('[aria-expanded=false]')){
							et.targetLi.trigger('expand');
						}
						//try traversing to child
						else {
							et.targetLi.find('li.ui-treeitem>a:eq(0)').focus();
						}
					}
					//if key is up arrow
					if(event.keyCode == 38){ 
						et.targetLi.trigger('traverseUp');
					}
					//if key is down arrow
					if(event.keyCode == 40){ 
						et.targetLi.trigger('traverseDown');
					}
					//return any of these keycodes false
					return false;
				}	
				//check if enter or space was pressed on a tree node
				else if((event.keyCode == 13 || event.keyCode == 32) && target.is('a.ui-tree-parent')){
					et.targetLi.trigger('toggle');
					//return click event false because it's a tree node (folder)
					return false;
				}
			});
		}
	});
};				
})(jQuery);