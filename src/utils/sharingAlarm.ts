import { Alert, Share } from 'react-native';

const sharingAlarm = async () => {
  try {
    const result = await Share.share({
      message: 'Alardin 초대 공유 멘트 작성',
    });
    if (result.action === Share.sharedAction) {
      console.log(result.activityType);
    } else if (result.action === Share.dismissedAction) {
      console.log('dismiss sharing');
    }
  } catch (error) {
    Alert.alert(
      '디바이스 오류',
      '해당 디바이스는 공유하기를 이용할 수 없습니다',
    );
  }
};

export default sharingAlarm;
