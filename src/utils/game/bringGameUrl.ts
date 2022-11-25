export const bringOnlineGameUrl = (gameId: number) => {
  switch (gameId) {
    case 1:
      return `https://games-test.alard.in/picoke`;
    case 2:
      return `https://games-test.alard.in/deleterow`;
    case 3:
      return `https://games-test.alard.in/novelists`;
    case 5:
      return `https://games-test.alard.in/manyfest`;
    case 6:
      return `https://games-test.alard.in/novelists`;
    default:
      return ``;
  }
};

export const bringOfflineGameUrl = (gameId: number) => {
  switch (gameId) {
    case 1:
      return `https://games-test.alard.in/picoke`;
    case 2:
      return;
    case 3:
      return `https://games-test.alard.in/deleterow`;
    default:
      return;
  }
};
