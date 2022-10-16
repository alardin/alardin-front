import { sendFeed } from '@react-native-seoul/kakao-login';
import { Alert, Platform } from 'react-native';

export const beMyFriendTemplate = {
  content: {
    title: 'OOO님께서 회원님과 함께 Alardin 메이트를 하고 싶습니다',
    imageUrl:
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    link: {
      webUrl: 'https://www.alard.in/',
      mobileWebUrl: 'https://www.alard.in/',
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
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    link: {
      webUrl: 'https://www.alard.in/',
      mobileWebUrl: 'https://www.alard.in/',
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
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    link: {
      webUrl: 'https://www.alard.in/',
      mobileWebUrl: 'https://www.alard.in/',
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
      const response = await sendFeed(
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
  Alert.alert('미지원 기능', '해당 디바이스에서 지원되지 않는 모드입니다');
};

export default shareOnKakao;
