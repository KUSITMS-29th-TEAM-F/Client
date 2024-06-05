import Status from '../../ui/Status';
import StarFilledIcon from '../../ui/icon/StarFilledIcon';
import ThumbUpIcon from '../../ui/icon/ThumbUpIcon';

const ReviewItem = () => {
  return (
    <li className="flex flex-col gap-4 border-b border-gray-05 py-6">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 4 }, (_, index) => index + 1).map((th) => (
          <span key={th} className="text-primary">
            <StarFilledIcon />
          </span>
        ))}
        {Array.from({ length: 1 }, (_, index) => index + 1).map((th) => (
          <span key={th} className="text-gray-15">
            <StarFilledIcon />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg-300 text-gray-80">
          31기 미래에셋 해외교환 장학생
        </h2>
        <div>
          <Status variant="primary">2024.04.24 모집</Status>
          <Status variant="success">합격</Status>
        </div>
        <p className="text-sm-extra text-gray-70">
          교환학생 가는 대학생들은 필수로 신청해야 하는 최고의 장학금. 생각보다
          지원 절차도 까다롭지 않고 교환학생 가는데 비용 걱정되는 사람들은 이거
          하나면 부담 덜 수 있음.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="aspect-square w-[1.25rem] overflow-hidden rounded-full">
              <img
                src="/images/placeholders/placeholder-profile.png"
                alt="프로필 임시 이미지"
              />
            </div>
            <span className="text-md-200 text-gray-60">닉네임</span>
          </div>
          <span className="caption-200 text-gray-30">2024.05.12</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-primary bg-white px-3 py-1.5 text-primary">
          <span>
            <ThumbUpIcon />
          </span>
          <span className="caption-300">123</span>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
