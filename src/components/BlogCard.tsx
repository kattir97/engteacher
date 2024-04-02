import "./css/blog-card.css";

interface Props {
  key: string;
  title: string;
  imageUrl: string;
  date: string;
  excerpt: string;
  slug: string;
  tags: {
    title: string;
  }[];
}

export const BlogCard = ({ title, imageUrl, date, excerpt, tags, slug }: Props) => {
  return (
    <div className="blogcard">
      <a href={`/blog/${slug}`} className="img-link">
        <div className="img" style={{ backgroundImage: `${imageUrl}` }}>
          <div className="overlay"></div>
        </div>
      </a>

      <div className="content">
        <span className="date">{new Date(date).toLocaleDateString()}</span>
        <a href={`/blog/${slug}`} className="title-link">
          <h1 className="title">{title}</h1>
        </a>
        <p className="text">{`${excerpt.slice(0, 150)}...`}</p>
        <div className="tags">
          {tags.map((tag, idx) => (
            <a href="#" className="tag" key={idx}>
              {tag.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
