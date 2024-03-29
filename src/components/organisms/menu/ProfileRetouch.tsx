/* eslint-disable @typescript-eslint/naming-convention */
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  SafeAreaView,
  TextInputChangeEventData,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import theme from '../../../theme/theme';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Container from '../../atoms/container/Container';
import InputText from '../../atoms/input/InputText';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';

type ProfileInputData = {
  nickname: string;
  email: string;
  thumbnail_image_url: string;
  profile_image_url: string;
  imageName: string;
};

type ProfileRetouchScreen = StackScreenProps<
  RootStackParamList,
  'ProfileRetouch'
>;

const CustomSafeBox = styled.SafeAreaView`
  flex: 1;
`;

const CustomContainer = styled(Container)`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const Top = styled(Box)`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const Middle = styled(Box)`
  flex: 3;
`;

const Bottom = styled(Box)`
  flex: 1;
  justify-content: flex-end;
`;

const CustomBox = styled(Box)`
  height: 120px;
  justify-content: center;
  padding: 0 4px;
`;

const Title = styled(Text)`
  margin: 12px 0;
`;

const ErrorText = styled(Text)`
  margin-top: 4px;
  margin-left: 8px;
`;

// const ImageButton = styled(Button)`
//   margin-top: 12px;
// `;

const NoticeText = styled(Text)`
  width: 80%;
  text-align: center;
  padding-top: 8px;
`;

const ImageButton = styled(Button)`
  margin-top: 20px;
`;

const ProfileRetouch = ({ navigation, route }: ProfileRetouchScreen) => {
  const {
    nickname,
    bio,
    profile_image_url,
    thumbnail_image_url,
    email,
    is_private,
  } = route.params;
  const [errorComment, setErrorComment] = useState<string>('');
  const [isError, setIsError] = useState<{ email: boolean; nickname: boolean }>(
    { email: false, nickname: false },
  );
  const [retouchItems, setRetouchItems] = useState<ProfileInputData>({
    nickname,
    email,
    profile_image_url: profile_image_url,
    thumbnail_image_url: profile_image_url,
    imageName: '',
  });

  const handleNameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = event.nativeEvent.text;
    if (value.length <= 1) {
      setIsError({ ...isError, nickname: true });
      setErrorComment('이름은 최소 2글자부터 시작해야 합니다.');
    } else if (value.length > 8) {
      setIsError({ ...isError, nickname: true });
      setRetouchItems(prevState => ({ ...prevState, nickname: '' }));
      setErrorComment('최대 8자까지 가능 (※ 띄어쓰기 포함)');
    } else {
      setIsError({ ...isError, nickname: false });
    }
    setRetouchItems(prevState => ({ ...prevState, nickname: value }));
  };

  //   const validateEmail = (emailString: string) => {
  //     var re = /\S+@\S+\.\S+/;
  //     return re.test(emailString);
  //   };

  //   const handleEmailChange = (
  //     event: NativeSyntheticEvent<TextInputChangeEventData>,
  //   ) => {
  //     const value = event.nativeEvent.text;
  //     if (!validateEmail(value)) {
  //       setIsError({ ...isError, email: true });
  //       setErrorComment('이메일 형식이 유효하지 않습니다.');
  //     } else {
  //       setIsError({ ...isError, email: false });
  //     }
  //     setRetouchItems(prevState => ({ ...prevState, email: value }));
  //   };

  const uploadProfileImage = async () => {
    let formData = new FormData();

    formData.append('profile_image', {
      uri: retouchItems.thumbnail_image_url,
      type: 'image',
      name: retouchItems.imageName,
    });

    alardinApi
      .post('/users/profile-image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  const launchPhotoLibrary = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 0.8,
      });
      console.log(result);
      setRetouchItems({
        ...retouchItems,
        profile_image_url: result.assets[0].uri,
        thumbnail_image_url: result.assets[0].uri,
        imageName: result.assets[0].fileName,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const requestEdit = async () => {
    if (retouchItems.thumbnail_image_url !== thumbnail_image_url) {
      await uploadProfileImage();
    }

    try {
      await alardinApi.post('/users/edit', {
        nickname: retouchItems.nickname,
        bio,
        profile_image_url,
        thumbnail_image_url,
        is_private,
      });
      Alert.alert('프로필 수정 성공', '사용자의 프로필 정보가 수정되었습니다.');
    } catch {
      Alert.alert(
        '프로필 수정 실패',
        '사용자의 프로필 정보가 수정에 실패했습니다.',
      );
    }
    navigation.goBack();
  };

  return (
    <CustomSafeBox>
      <CustomContainer>
        <Top>
          <ProfileIcon size={100} uri={retouchItems.thumbnail_image_url} />
          <ImageButton
            width="100px"
            height="s"
            options="destructive"
            center
            onPress={launchPhotoLibrary}>
            사진 변경
          </ImageButton>
          <NoticeText size="xs" colorName={theme.color.gray_600}>
            ※ 프로필 수정했어도, 바로 반영이 안될 수 있습니다. 그럴때는 앱의
            백그라운드를 종료 후 다시 실행해보시면 됩니다.
          </NoticeText>
        </Top>
        <Middle>
          <CustomBox>
            <Title>이름(닉네임)</Title>
            <InputText
              width="100%"
              height="52px"
              value={retouchItems.nickname}
              placeholder="2 ~ 8글자까지 가능 (※ 띄어쓰기 포함)"
              onChange={handleNameChange}
              error={isError.nickname}
            />
            {isError.nickname && (
              <ErrorText size="s" colorName={theme.color.function_error}>
                {errorComment}
              </ErrorText>
            )}
          </CustomBox>
          {/* <CustomBox>
          <Title>이메일</Title>
          <InputText
            width="100%"
            height="52px"
            value={retouchItems.email}
            placeholder=""
            onChange={handleEmailChange}
            error={isError.email}
          />
          {isError.email && (
            <ErrorText size="s" colorName={theme.color.function_error}>
              {errorComment}
            </ErrorText>
          )}
        </CustomBox> */}
        </Middle>
        <Bottom>
          <Button
            width="100%"
            height="xl"
            options="primary"
            center
            onPress={requestEdit}>
            수정하기
          </Button>
        </Bottom>
      </CustomContainer>
    </CustomSafeBox>
  );
};

export default ProfileRetouch;
