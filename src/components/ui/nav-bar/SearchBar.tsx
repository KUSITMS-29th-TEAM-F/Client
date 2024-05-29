import clsx from 'clsx';
import SearchIcon from '../icon/SearchIcon';

interface SearchBarWindowProps {
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchBar = ({ className, inputRef }: SearchBarWindowProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-full border border-gray-10 bg-gray-00 px-4 py-3 text-gray-80 placeholder:text-gray-40 lg:py-2.5',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-[1rem] text-gray-40">
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="검색어를 입력하세요..."
        className="text-md-200 flex-1 bg-transparent outline-none"
      />
    </div>
  );
};

export default SearchBar;
