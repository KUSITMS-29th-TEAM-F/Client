import Description from '../description/Description';

interface DetailContentTabProps {
  detailContents: string;
}

const DetailContentTab = ({ detailContents }: DetailContentTabProps) => {
  return <Description>{detailContents}</Description>;
};

export default DetailContentTab;
