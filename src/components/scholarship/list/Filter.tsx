'use client';

import clsx from 'clsx';
import { useState } from 'react';

interface FilterProps {
  filterList: string[];
}

const Filter = ({ filterList }: FilterProps) => {
  const [filterActiveIndexList, setFilterActiveIndexList] = useState<boolean[]>(
    [false, false, false],
  );

  const handleFilterClick = (index: number) => {
    const updatedFilterActiveIndexList = [...filterActiveIndexList];
    updatedFilterActiveIndexList[index] = !updatedFilterActiveIndexList[index];
    setFilterActiveIndexList(updatedFilterActiveIndexList);
  };

  return (
    <ul className="flex items-center gap-2">
      {filterList.map((filter, index) => (
        <li
          key={index}
          className={clsx(
            'text-md-200 cursor-pointer rounded-full px-3 py-1.5',
            {
              'border border-gray-80 bg-gray-80 text-gray-10':
                filterActiveIndexList[index],
              'border border-gray-15 bg-gray-00 text-gray-60':
                !filterActiveIndexList[index],
            },
          )}
          onClick={() => handleFilterClick(index)}
        >
          {filter}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
