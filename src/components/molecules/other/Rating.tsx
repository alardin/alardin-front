import React, { useState } from 'react';
import Box from '../../atoms/box/Box';
import Star from '../../atoms/star/Star';

interface IRatingProps {
  setRatingScore: React.Dispatch<React.SetStateAction<number>>;
}

const Rating = ({ setRatingScore }: IRatingProps) => {
  const [checkedList, setCheckedList] = useState<boolean[]>(
    Array.from({ length: 5 }, () => true),
  );

  const handleChecked = (index: number) => {
    setCheckedList(checkedList.map((checked, idx) => idx <= index && true));
    const score = checkedList.filter(v => v === true).length;
    setRatingScore(score);
  };

  return (
    <Box row>
      {checkedList.map((checked, index) => (
        <Star
          key={`star_${index}`}
          checked={checked}
          handleChecked={() => handleChecked(index)}
        />
      ))}
    </Box>
  );
};

export default Rating;
