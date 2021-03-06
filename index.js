hubble.getJSON('https://news-at.zhihu.com/api/4/news/latest', function(error, response, data) {
		// for-of 保证顺序
		data.stories.forEach(function(story) {
			articles.get('id', story.id, function(article) {
				if (article) return;

				var url = 'https://news-at.zhihu.com/api/4/news/' + story.id;
				hubble.getJSON(url, function(error, response, data) {
					var article = {
						id: data.id,
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
