import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {AppColors} from '../../Const';

const RoundedButton = ({
  textStyle,
  buttonStyle,
  text = '',
  touchProps = {},
  disabled = false,
  disableStyle,
  disableTextStyle,
  disableColor = '#DDD',
  disableTextColor = '#888',
  disableText = text,
  LeftIconComponent = <Fragment />,
  ...props
}) => {
  const _buttonStyle = disabled
    ? [
        styles.button,
        buttonStyle,
        {backgroundColor: disableColor},
        disableStyle,
      ]
    : [styles.button, buttonStyle];

  const _textStyle = disabled
    ? [
        styles.buttonText,
        textStyle,
        {color: disableTextColor},
        disableTextStyle,
      ]
    : [styles.buttonText, textStyle];
  return (
    <TouchableOpacity style={_buttonStyle} disabled={disabled} {...touchProps}>
      {LeftIconComponent}
      <Text style={_textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  button: {
    columnGap: 8,
    flexDirection: 'row',
    backgroundColor: 'red', //AppColors.primaryColor,
    borderRadius: 1000,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white', //AppColors.colorWhite,
    fontFamily: 'Sarabun-SemiBold',
    // lineHeight: getLineHeight(20),
  },
});
