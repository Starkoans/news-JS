import News from './news/news';
import Sources from './sources/sources';

type ArticlesResponse = {
    status: string;
    articles: Article[];
};
type SourcesResponse = {
    status: string;
    sources: Source[];
};

export type Article = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: URL;
    urlToImage: URL;
    publishedAt: string;
    content: string;
};

export type Source = {
    id: string;
    name: string;
    description?: string;
    url?: URL;
    category?: string;
    language?: string;
    country?: string;
};

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticlesResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
