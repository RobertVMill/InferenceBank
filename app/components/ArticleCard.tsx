import Image from 'next/image'; // Use Next.js Image for optimization

type Article = {
  id: number;
  title: string;
  snippet: string;
  imageUrl?: string; // Optional because some articles might not have an image
  link: string;
};

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const placeholderImage = '/images/placeholder.jpg'; // Placeholder image path

  // Helper function to truncate the snippet
  const truncateSnippet = (snippet: string, maxLength: number) => {
    if (snippet.length > maxLength) {
      return snippet.substring(0, maxLength) + '...';
    }
    return snippet;
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Image with fallback */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl || placeholderImage}
          alt={article.title}
          layout="fill" // Next.js Image optimization
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Article Title */}
      <h2 className="text-xl font-semibold mt-4">{article.title}</h2>

      {/* Article Snippet */}
      <p className="text-sm text-gray-600 mt-2">
        {truncateSnippet(article.snippet, 120)}
      </p>

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
