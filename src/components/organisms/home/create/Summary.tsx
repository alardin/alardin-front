import React from 'react';
import { useRecoilState } from 'recoil';
import { summaryData } from '../../../../recoil/home/summary';
import SummaryText from '../../../molecules/home/create/SummaryText';

interface ISummaryProps {
  type: string;
}

const Summary = ({ type }: ISummaryProps) => {
  const [summary] = useRecoilState(summaryData);

  return <SummaryText {...{ ...summary, type }} />;
};

export default Summary;
