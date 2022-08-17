import React, { useState } from 'react';
import Box from '../../atoms/box/Box';
import Star from '../../atoms/star/Star';

const Rating = () => {
  const [checkedList, setCheckedList] = useState<boolean[]>(
    Array.from({ length: 5 }, () => true),
  );

  const handleChecked = (index: number) => {
    setCheckedList(checkedList.map((checked, idx) => idx <= index && true));
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
