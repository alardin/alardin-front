const sendGameData = (
  type: number | undefined,
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
              originalData[originalData.length - 1].answerIndex
            ],
          images: originalData[0].images,
          answer: originalData[0].images[originalData[0].answerIndex],
        },
        {
          subject: originalData[0].images[originalData[0].answerIndex],
          images: originalData[originalData.length - 1].images,
          answer:
            originalData[originalData.length - 1].images[
              originalData[originalData.length - 1].answerIndex
            ],
        },
      ];
    case 2:
      return [
        {
          currentUser: 'A',
          images: originalData[0].images,
        },
        {
          currentUser: 'B',
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
