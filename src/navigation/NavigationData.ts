import Home from '../components/pages/Home';
import Menu from '../components/pages/Menu';
import Notify from '../components/pages/Notify';
import Record from '../components/pages/Record';
import Shop from '../components/pages/Shop';

interface INaviData {
  name: string;
  icon: string;
  component: () => JSX.Element;
}

export interface RootBottomParamList {
  Home: undefined;
  Record: undefined;
  Shop: undefined;
  Notify: undefined;
  Menu: undefined;
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
