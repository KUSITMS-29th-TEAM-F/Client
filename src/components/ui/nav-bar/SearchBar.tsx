import clsx from 'clsx';

import SearchIcon from '../icon/SearchIcon';
import XIcon from '../icon/XIcon';

interface SearchBarWindowProps {
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar = ({
  className,
  inputRef,
  searchKeyword,
  setSearchKeyword,
  onSubmit,
}: SearchBarWindowProps) => {
  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleClearSearchKeyword = () => {
    setSearchKeyword('');
  };

  return (
    <form
      className={clsx(
        'flex items-center gap-2 rounded-full border border-gray-10 bg-gray-00 px-4 py-3 text-gray-80 placeholder:text-gray-40 lg:py-2.5',
        className,
      )}
      onSubmit={onSubmit}
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
        value={searchKeyword}
        onChange={handleSearchKeywordChange}
      />
      {searchKeyword && (
        <button
          type="button"
          className="text-[1rem] text-gray-40"
          onClick={handleClearSearchKeyword}
        >
          <XIcon />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
