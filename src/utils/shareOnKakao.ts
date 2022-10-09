// import KakaoShareLink from 'react-native-kakao-share-link';

// const shareOnKakao = async () => {
//   try {
//     const response = await KakaoShareLink.sendCommerce({
//       content: {
//         title: 'title',
//         imageUrl:
//           'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
//         link: {
//           webUrl: 'https://developers.kakao.com/',
//           mobileWebUrl: 'https://developers.kakao.com/',
//         },
//         description: 'description',
//       },
//       commerce: {
//         regularPrice: 100000,
//         discountPrice: 80000,
//         discountRate: 20,
//       },
//       buttons: [
//         {
//           title: '앱에서 보기',
//           link: {
//             androidExecutionParams: [{ key: 'key1', value: 'value1' }],
//             iosExecutionParams: [
//               { key: 'key1', value: 'value1' },
//               { key: 'key2', value: 'value2' },
//             ],
//           },
//         },
//         {
//           title: '웹에서 보기',
//           link: {
//             webUrl: 'https://developers.kakao.com/',
//             mobileWebUrl: 'https://developers.kakao.com/',
//           },
//         },
//       ],
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(`error: ${e}`);
//   }
// };

// export default shareOnKakao;
