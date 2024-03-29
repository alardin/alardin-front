import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IMateListDataType } from '../navigation/top/MatesNavigation';
import { mateRefresh } from '../recoil/mates/mateRefresh';
import alardinApi from '../utils/alardinApi';

const useMatesList = (parmas: 'kakaoFriends' | 'mates') => {
  const refresher = useRecoilValue(mateRefresh);
  const [data, setData] = useState<IMateListDataType>({} as IMateListDataType);

  useEffect(() => {
    alardinApi.get('/mate').then(res => {
      const responseData = res.data.data;
      if (responseData) {
        const matesThumbnails = responseData.mates.map(
          (friends: any) => friends.nickname,
        );
        const convertKakaoData = responseData.kakaoFriends?.map(
          (friend: any) => ({
            kakao_id: friend.id,
            thumbnail_image_url: friend.profile_thumbnail_image,
            nickname: friend.profile_nickname,
          }),
        );
        const filteredKakao = convertKakaoData?.filter(
          (friend: any) => !matesThumbnails.includes(friend.nickname),
        );
        setData({
          kakaoFriends: filteredKakao,
          mates: responseData.mates,
        });
      }
    });
    return () => setData({} as IMateListDataType);
  }, [refresher]);

  return data[parmas];
};

export default useMatesList;
