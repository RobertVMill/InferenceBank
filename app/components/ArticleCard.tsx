import Image from 'next/image';

type Article = {
  id: number;
  title: string;
  snippet: string;
  imageUrl?: string;
  link: string;
  source: { name: string };
  publishedAt: string;
};

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const placeholderImage = '/images/placeholder.jpg'; // Placeholder image path

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Image with fallback */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl || placeholderImage}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Article Title */}
      <h2 className="text-xl font-semibold mt-4">{article.title}</h2>

      {/* Article Snippet */}
      <p className="text-sm text-gray-600 mt-2">
        {article.snippet}
      </p>

      {/* Display Source and Published Date */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Source: {article.source.name}</p>
        <p>Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
      </div>

      {/* Read more link */}
      <a
        href={article.link}
        className="text-blue-500 mt-4 inline-block hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${article.title}`}
      >
        Read more →
      </a>
    </div>
  );
};

export default ArticleCard;
