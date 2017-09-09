hubble.getJSON('https://news-at.zhihu.com/api/4/news/latest', function(error, response, data) {
		data.stories.forEach(function(story) {
			articles.get('key', story.id, function(article) {
				if (article) return;

				var url = 'https://news-at.zhihu.com/api/4/news/' + story.id;
				hubble.getJSON(url, function(error, response, data) {
					var article = {
						key: data.id,
						title: data.title,
						content: data.body,
						summary: data.body.replace(/<\/?[^>]*>/g,'').trim().substring(0, 50),
						url: data.share_url,
						image: data.images[0]
					};
					articles.append(article);
				});
			});
		});
});
