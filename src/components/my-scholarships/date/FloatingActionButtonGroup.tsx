import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';

interface FloatingActionButtonGroupProps {
  viewMode: 'calendar' | 'list';
}

const FloatingActionButtonGroup = ({
  viewMode,
}: FloatingActionButtonGroupProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleViewModeChange = (viewMode: 'calendar' | 'list') => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('view', viewMode);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="fixed bottom-8 right-4 flex flex-col gap-3 lg:right-8">
      <button
        className={clsx(
          'flex aspect-square w-[3.625rem] items-center justify-center rounded-full border',
          {
            'border-gray-80 bg-gray-80': viewMode === 'calendar',
            'border-gray-10 bg-white': viewMode !== 'calendar',
          },
        )}
        onClick={() => handleViewModeChange('calendar')}
      >
        <span>
          <img
            src={`/icons/my-scholarship/event-note${viewMode !== 'calendar' ? '-gray' : ''}.svg`}
            alt="캘린더 아이콘"
          />
        </span>
      </button>
      <button
        className={clsx(
          'flex aspect-square w-[3.625rem] items-center justify-center rounded-full border',
          {
            'border-gray-80 bg-gray-80': viewMode === 'list',
            'border-gray-10 bg-white': viewMode !== 'list',
          },
        )}
        onClick={() => handleViewModeChange('list')}
      >
        <span>
          <img
            src={`/icons/my-scholarship/calendar-view-day${viewMode !== 'list' ? '-gray' : ''}.svg`}
            alt="리스트 아이콘"
          />
        </span>
      </button>
    </div>
  );
};

export default FloatingActionButtonGroup;
