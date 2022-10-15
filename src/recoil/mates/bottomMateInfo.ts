import { atom } from 'recoil';
import { IMateListDataType } from '../../navigation/top/MatesNavigation';

interface IBottomMateInfoProps extends IMateListDataType {
  type: string;
}

const bottomMateInfo = atom<IBottomMateInfoProps>({
  key: 'bottomMateInfo',
  default: {} as IBottomMateInfoProps,
});

export default bottomMateInfo;
