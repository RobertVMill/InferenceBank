import ArticleCard from './ArticleCard';

// Reuse the Article type from ArticleCard
type Article = {
  id: number;
  title: string;
  snippet: string;
  imageUrl: string;
  link: string;
};

type NewsFeedProps = {
  articles: Article[];
};

const NewsFeed = ({ articles }: NewsFeedProps) => { // Apply the NewsFeedProps type here
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    );
  };
  
export default NewsFeed;
