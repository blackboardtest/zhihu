$.getJSON('https://news-at.zhihu.com/api/4/news/latest', function(error, response, data) {
		data.stories.forEach(function (story) {
			var url = 'https://news-at.zhihu.com/api/4/news/' + story.id;
			var title = $(this).text();
			articles.get('url', url, function(article) {
				if (article) return;

				$.getJSON(url, function(error, response, data) {
					var html = $(data).find('.content-inner').eq(0);

					var article = {
						title: title,
						content: data.body,
						summary: data.body.replace(/<\/?[^>]*>/g,'').trim().substring(0, 50),
						url: url,
						image: data.images[0]
					};
					articles.append(article);
				});
			});
		});
});
