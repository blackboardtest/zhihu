$.get('http://daily.zhihu.com', function(data, status, xhr) {
		$(data).find('.box a').each(function (index, value) {
			var url  = 'http://daily.zhihu.com' + $(this).attr('href');
			var title = $(this).text();
			articles.get('url', url, function(article) {
				if (article) return;

				$.get(url, function(data, status, xhr) {
					var html = $(data).find('.content-inner').eq(0);

					var article = {
						title: title,
						content: html.html().trim(),
						summary: html.text().trim().substring(0, 50),
						url: url
					};
					articles.append(article);
				});
			});
		});
});
