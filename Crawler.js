const Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getAgro();

	},
	getAgro: function(dados = []){
		Crawler.request('https://www.agrobill.com.br/categoria/implementos-agricolas/', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('.fl-post-text').each(function(){
                var nome  = $(this).find('.fl-post-title').text().trim();
                var link  = $(this).find('.fl-post-title a').attr('href');
                var preco = $(this).find('.link-preco div h3').text()
				var response = {nome, link, preco}
				dados.push(response)
				
			});

			Crawler.fs.writeFile('dados.json', JSON.stringify(dados, null, 2), err => {
                if(err) throw new Error('deu ruim')
			})

			console.log(dados)	 
		});
	}
};
Crawler.init()
