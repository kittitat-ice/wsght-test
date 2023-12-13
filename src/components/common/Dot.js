import React from 'react';
import {View} from 'react-native';
// import {AppColors} from '../../Const';

const Dot = ({color = 'red', size = 10, style, ...props}) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size,
        },
        style,
      ]}
    />
  );
};

export default Dot;
