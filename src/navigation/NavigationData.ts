import Home from '../components/pages/Home';
import Menu from '../components/pages/Menu';
import Notify from '../components/pages/Notify';
import Record from '../components/pages/Record';
import Shop from '../components/pages/Shop';
import CallScreen from '../screen/CallScreen';
import GameEnd from '../screen/game/GameEnd';
import GameStart from '../screen/game/GameStart';
import Login from '../screen/Login';
import Test from '../Test';
import BottomNavigation from './bottom/BottomNavigation';

interface INaviData {
  name: string;
  icon: string;
  component: () => JSX.Element;
}

export const bottomData: INaviData[] = [
  {
    name: 'Home',
    icon: 'home',
    component: Home,
  },
  {
    name: 'Record',
    icon: 'clipboard-list',
    component: Record,
  },
  {
    name: 'Shop',
    icon: 'shopping-cart',
    component: Shop,
  },
  {
    name: 'Notify',
    icon: 'bell',
    component: Notify,
  },
  {
    name: 'Menu',
    icon: 'bars',
    component: Menu,
  },
];

export const stackData: INaviData[] = [
  {
    name: 'BottomNavigation',
    icon: 'drill',
    component: BottomNavigation,
  },
  {
    name: 'Test',
    icon: 'drill',
    component: Test,
  },
  {
    name: 'Login',
    icon: 'login',
    component: Login,
  },
  {
    name: 'GameStart',
    icon: 'game',
    component: GameStart,
  },
  {
    name: 'GameEnd',
    icon: 'game',
    component: GameEnd,
  },
  {
    name: 'CallScreen',
    icon: 'call',
    component: CallScreen,
  },
];
