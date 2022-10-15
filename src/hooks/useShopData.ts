import alardinApi from '../utils/alardinApi';
import wrapPromise from '../utils/promiseWrapper';

export const fetchAssets = () => {
  try {
    const apiAssets = alardinApi.get('/assets').then(res => res.data.data);
    return {
      userAssets: wrapPromise(apiAssets),
    };
  } catch {
    return { userAssets: undefined };
  }
};

export const fetchUser = () => {
  try {
    const apiUser = alardinApi.get('/users').then(res => res.data.data);
    return {
      profile: wrapPromise(apiUser),
    };
  } catch {
    return { profile: undefined };
  }
};

export const fetchGames = () => {
  try {
    const apiGames = alardinApi.get('/game').then(res => res.data);
    return {
      gameList: wrapPromise(apiGames),
    };
  } catch {
    return { gameList: undefined };
  }
};
