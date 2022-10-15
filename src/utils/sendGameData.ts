const sendGameData = (
  type: number,
  originalData: [{ [key: string]: any }] | undefined,
  userType?: number,
) => {
  if (!originalData) {
    return;
  }
  switch (type) {
    case 1:
      return [
        {
          subject:
            originalData[originalData.length - 1].images[
              originalData[0].answerIndex
            ],
          images: originalData[0].images,
          answer:
            originalData[0].images[
              originalData[originalData.length - 1].answerIndex
            ],
        },
        {
          subject:
            originalData[0].images[
              originalData[originalData.length - 1].answerIndex
            ],
          images: originalData[originalData.length - 1].images,
          answer:
            originalData[originalData.length - 1].images[
              originalData[0].answerIndex
            ],
        },
      ];
    case 2:
      if (!userType) {
        return;
      }
      return [
        {
          currentUser: String.fromCharCode(65 + userType),
          images: originalData[0].images,
        },
        {
          currentUser: String.fromCharCode(65 + userType),
          images: originalData[0].images,
        },
      ];
    case 3:
      return;
    default:
      return;
  }
};

export default sendGameData;
