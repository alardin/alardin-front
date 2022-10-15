import { sendCommerce } from '@react-native-seoul/kakao-login';
import { Alert, Platform } from 'react-native';

const shareOnKakao = async () => {
  if (Platform.OS === 'ios') {
    try {
      const response = await sendCommerce({
        content: {
          title: 'title',
          imageUrl:
            'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
          link: {
            webUrl: 'https://developers.kakao.com/',
            mobileWebUrl: 'https://developers.kakao.com/',
          },
          description: 'description',
        },
        commerce: {
          regularPrice: 100000,
          discountPrice: 80000,
          discountRate: 20,
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              androidExecutionParams: [{ key: 'key1', value: 'value1' }],
              iosExecutionParams: [
                { key: 'key1', value: 'value1' },
                { key: 'key2', value: 'value2' },
              ],
            },
          },
          {
            title: '웹에서 보기',
            link: {
              webUrl: 'https://developers.kakao.com/',
              mobileWebUrl: 'https://developers.kakao.com/',
            },
          },
        ],
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
    return;
  }
  Alert.alert('미지원 기능', '해당 디바이스에서 지원되지 않는 모드입니다');
};

export default shareOnKakao;
