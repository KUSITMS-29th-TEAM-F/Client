import { Link } from "react-router-dom";

interface ArticleItemProps {
  imageSrc: string;
  title: string;
}

const ArticleItem = ({ imageSrc, title }: ArticleItemProps) => {
  return (
    <li>
      <Link to="/articles/1">
        <div className="flex w-[9.25rem] flex-col gap-2">
          <div className="aspect-square w-full overflow-hidden rounded-xl">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-md-300 w-full">{title}</h2>
        </div>
      </Link>
    </li>
  );
};

export default ArticleItem;
