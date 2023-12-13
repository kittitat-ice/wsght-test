import React from 'react';
import {View, Modal, Pressable, StyleSheet, Text} from 'react-native';
// import AppTextSemi from '../common/AppTextSemi';
import CardView from './CardView';
import RoundedButton from './RoundedButton';
// import {AppColors, AppStyles} from '../../Const';
import {t} from 'i18next';

const AppAlert = ({
  onOverlayPress,
  onShow,
  modalProps = {},
  overlayStyle = {
    backgroundColor: '#00000066',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle = {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    maxWidth: '90%',
    minWidth: '60%',
  },
  iconComponent = null,
  title = 'Alert',
  titleStyle = [{fontSize: 20}],
  desc = 'desc',
  descStyle = [
    {
      marginTop: 8,
      marginBottom: 24,
      textAlign: 'center',
      fontSize: 18,
    },
  ],
  negativeButtonVisible = false,
  negativeButtonProps = {},
  positiveButtonVisible = false,
  positiveButtonProps = {},
  visible = true,
  ...props
}) => {
  if (!visible) {
    return;
  }
  return (
    <Modal
      visible={visible}
      onShow={onShow}
      animationType={'fade'}
      transparent
      statusBarTranslucent
      {...modalProps}>
      <Pressable onPress={onOverlayPress} style={overlayStyle}>
        <CardView
          style={cardStyle}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => {
            e.stopPropagation();
          }}>
          {iconComponent}
          <Text style={titleStyle}>{title}</Text>
          <Text style={descStyle}>{desc}</Text>
          <View style={{flexDirection: 'row'}}>
            {negativeButtonVisible && (
              <RoundedButton
                text={negativeButtonProps.text ?? t('cancel')}
                buttonStyle={[styles.button, styles.negative]}
                textStyle={styles.negative.text}
                touchProps={negativeButtonProps}
              />
            )}
            {positiveButtonVisible && negativeButtonVisible && (
              <View style={{width: 16}} />
            )}
            {positiveButtonVisible && (
              <RoundedButton
                text={positiveButtonProps.text ?? t('confirm')}
                buttonStyle={[styles.button, styles.positive]}
                textStyle={styles.positive.text}
                touchProps={positiveButtonProps}
              />
            )}
          </View>
        </CardView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  desc: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    flex: 1,
  },
  positive: {
    backgroundColor: 'red',
    text: {
      color: 'white',
    },
  },
  negative: {
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: 'red',
    text: {
      color: 'red',
    },
  },
});

export default AppAlert;
