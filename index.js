hubble.getJSON('https://news-at.zhihu.com/api/4/news/latest', function(error, response, data) {
		var list = [];
		// 使用 for-of 保证顺序
		for (story of data.stories) {
			var result = articles.get('key', story.id);
			if (!result) {
				list.append(story.id);

				var article = {
					key: story.id,
					title: story.title,
					image: story.images[0]
				};
				articles.append(article);
			}
		}

		list.forEach(function(id) {
			articles.get('key', id, function(article) {
				if (article) return;

				var url = 'https://news-at.zhihu.com/api/4/news/' + story.id;
				hubble.getJSON(url, function(error, response, data) {
					var article = {
						content: data.body,
						summary: data.body.replace(/<\/?[^>]*>/g,'').trim().substring(0, 50),
						url: data.share_url,
					};
					articles.update(article, data.id);
				});
			});
		});
});
