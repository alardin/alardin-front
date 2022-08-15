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
