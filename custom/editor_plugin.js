(function() {
	tinymce.create('tinymce.plugins.poutschPlugin', {
	  init : function(ed, url) {
      ed.addButton('poutschEmbed', {
      	title: 'poutschEmbed.poutsch',
      	image: url+'/20x20.png',
      	onclick: function() {
          ed.windowManager.open ({
            title: 'Embed a poutsch question', 
            file: url + '/prompt.htm',
            width: 345,
            height: 505,
            inline: 1
          }, {
            plugin_url : url
          });
      	}
      });
    },
    createControl: function(n, cm) {
    	return null;
    },
    getInfo: function() {
    	return {
    		longname: 'poutsch',
    		author: 'poutsch',
    		authorurl: 'https://poutsch.com',
    		infourl: 'https://poutsch.com',
    		version: '0.3'
    	};
    }
  });
  tinymce.PluginManager.add('poutschEmbed', tinymce.plugins.poutschPlugin);
 })();
