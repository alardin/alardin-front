import alardinApi from '../utils/alardinApi';
import wrapPromise from '../utils/promiseWrapper';

export const fetchAssets = () => {
  const apiAssets = alardinApi.get('/assets').then(res => res.data.data);

  return {
    userAssets: wrapPromise(apiAssets),
  };
};

export const fetchUser = () => {
  const apiUser = alardinApi.get('/users').then(res => res.data.data);

  return {
    profile: wrapPromise(apiUser),
  };
};

export const fetchGames = () => {
  const apiGames = alardinApi.get('/game').then(res => res.data);

  return {
    gameList: wrapPromise(apiGames),
  };
};
