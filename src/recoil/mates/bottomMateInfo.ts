import { atom } from 'recoil';
import { IMateListDataType } from '../../components/templates/mates/TMates';

interface IBottomMateInfoProps extends IMateListDataType {
  type: string;
}

const bottomMateInfo = atom<IBottomMateInfoProps>({
  key: 'bottomMateInfo',
  default: {} as IBottomMateInfoProps,
});

export default bottomMateInfo;
