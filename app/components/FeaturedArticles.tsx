const FeaturedArticles = ({ articles }) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {articles.slice(0, 2).map((article) => (
          <div key={article.id} className="relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
              <h2 className="text-white text-2xl font-bold">{article.title}</h2>
              <p className="text-gray-300 mt-2">{article.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default FeaturedArticles;
  