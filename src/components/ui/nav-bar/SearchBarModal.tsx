import clsx from "clsx";
import { useEffect, useRef } from "react";

import SearchBar from "./SearchBar";

interface SearchBarWindowProps {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (isSearchBarOpen: boolean) => void;
}

const SearchBarModal = ({
  isSearchBarOpen,
  setIsSearchBarOpen,
}: SearchBarWindowProps) => {
  const searchBarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchBarOpen && searchBarInputRef.current) {
      searchBarInputRef.current.focus();
    }
  }, [isSearchBarOpen]);

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-50 px-5 pt-[4rem] transition-opacity",
        {
          "opacity-100": isSearchBarOpen,
          "pointer-events-none opacity-0": !isSearchBarOpen,
        }
      )}
      onClick={() => setIsSearchBarOpen(false)}
    >
      <SearchBar
        inputRef={searchBarInputRef}
        className="absolute mx-auto w-[calc(100%-2rem)] p-4 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.10)]"
      />
    </div>
  );
};

export default SearchBarModal;
