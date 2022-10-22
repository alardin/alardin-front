import KakaoShareLink from 'react-native-kakao-share-link';
// import { sendFeed } from '@react-native-seoul/kakao-login';
import { Alert, Platform } from 'react-native';

export const beMyFriendTemplate = {
  content: {
    title: 'OOO님께서 회원님과 함께 Alardin 메이트를 하고 싶습니다',
    imageUrl:
      'https://alardin-static.s3.ap-northeast-2.amazonaws.com/images/app-meta/app-thumbnail.png',
    link: {
      webUrl: 'https://alard.in/',
      mobileWebUrl: 'https://alard.in/',
    },
    description:
      '혼자서 힘들게 일어나는 대신 OOO님과 함께 게임을 즐기면서 일어나 보세요. Alardin는 회원님과 여러 기능성 게임으로 맞이하고 있습니다.',
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
  ],
};

export const joinMyAlarmTemplate = {
  content: {
    title: 'OOO님께서 회원님과 함께 일어나고 싶습니다',
    imageUrl:
      'https://alardin-static.s3.ap-northeast-2.amazonaws.com/images/app-meta/app-thumbnail.png',
    link: {
      webUrl: 'https://alard.in/',
      mobileWebUrl: 'https://alard.in/',
    },
    description:
      '혼자서 힘들게 일어나는 대신 OOO님과 함께 게임을 즐기면서 일어나 보세요. Alardin는 회원님과 여러 기능성 게임으로 맞이하고 있습니다.',
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
  ],
};

export const shareMyProfile = {
  content: {
    title: 'OOO님께서 Alardin의 프로필을 공유합니다.',
    imageUrl:
      'https://alardin-static.s3.ap-northeast-2.amazonaws.com/images/app-meta/app-thumbnail.png',
    link: {
      webUrl: 'https://alard.in/',
      mobileWebUrl: 'https://alard.in/',
    },
    description:
      '혼자서 힘들게 일어나는 대신 OOO님과 함께 게임을 즐기면서 일어나 보세요. Alardin는 회원님과 여러 기능성 게임으로 맞이하고 있습니다.',
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
  ],
};

const shareOnKakao = async (
  type: 'mate' | 'profile' | 'alarm',
  myName: string,
) => {
  const customTitle =
    type === 'mate'
      ? `${myName}님께서 회원님과 함께 Alardin 메이트를 하고 싶습니다`
      : type === 'profile'
      ? `${myName}님께서 Alardin의 프로필을 공유합니다.`
      : `${myName}님께서 회원님과 함께 일어나고 싶습니다`;
  const customDescription = `혼자서 힘들게 일어나는 대신 ${myName}님과 함께 게임을 즐기면서 일어나 보세요. Alardin는 회원님과 여러 기능성 게임으로 맞이하고 있습니다.`;

  if (Platform.OS === 'ios') {
    try {
      const response = await KakaoShareLink.sendFeed(
        type === 'mate'
          ? {
              ...beMyFriendTemplate,
              content: {
                ...beMyFriendTemplate.content,
                title: customTitle,
                description: customDescription,
              },
            }
          : type === 'profile'
          ? {
              ...shareMyProfile,
              content: {
                ...shareMyProfile.content,
                title: customTitle,
                description: customDescription,
              },
            }
          : {
              ...joinMyAlarmTemplate,
              content: {
                ...joinMyAlarmTemplate.content,
                title: customTitle,
                description: customDescription,
              },
            },
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return;
  }
  Alert.alert(
    '카카오톡 미설치',
    '해당 디바이스에서 카카오톡이 설치되지 않았습니다.',
  );
};

export default shareOnKakao;
