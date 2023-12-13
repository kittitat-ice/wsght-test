import {t} from 'i18next';
import {Platform} from 'react-native';

export const randomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomText = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let text = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * (characters.length - 0)) + 0;
    text += characters[index];
  }
  return text;
};

export const removeNonNumber = text => {
  return text ? text.replace(/[^0-9]/g, '') : '';
};

// 0 = Jan
export const dateMonthToMonthString = (dateMonthNum, shortVersion = false) => {
  const short = [
    t('month_short_january'),
    t('month_short_febuary'),
    t('month_short_march'),
    t('month_short_april'),
    t('month_short_may'),
    t('month_short_june'),
    t('month_short_july'),
    t('month_short_august'),
    t('month_short_september'),
    t('month_short_october'),
    t('month_short_november'),
    t('month_short_december'),
  ];
  const long = [
    t('month_january'),
    t('month_febuary'),
    t('month_march'),
    t('month_april'),
    t('month_may'),
    t('month_june'),
    t('month_july'),
    t('month_august'),
    t('month_september'),
    t('month_october'),
    t('month_november'),
    t('month_december'),
  ];
  return shortVersion ? short[dateMonthNum] : long[dateMonthNum];
};

export const thaiTitleToI18n = (title, shortVersion = false) => {
  switch (title) {
    case 'นาย':
      return shortVersion ? t('mister_short') : t('mister');
    case 'นาง':
      return shortVersion ? t('missus_short') : t('missus');
    case 'นางสาว':
      return shortVersion ? t('miss_short') : t('miss');
    default:
      return '';
  }
};

export const isSameDay = (firstDateObj, secondDateObj) => {
  if (!firstDateObj || !secondDateObj) {
    return false;
  }

  return (
    firstDateObj.getDate() === secondDateObj.getDate() &&
    firstDateObj.getMonth() === secondDateObj.getMonth() &&
    firstDateObj.getFullYear() === secondDateObj.getFullYear()
  );
};

export const getFullDate = (
  dateObj,
  shortVersion = false,
  useBuddhistYear = false,
) => {
  const offset = useBuddhistYear ? 543 : 0;
  if (!dateObj) {
    return '-';
  }
  return `${dateObj.getDate()} ${dateMonthToMonthString(
    dateObj.getMonth(),
    shortVersion,
  )} ${dateObj.getFullYear() + offset}`;
};

export const getTimeString = (dateObj, withSecond = false) => {
  if (!dateObj) {
    return '-';
  }
  const hour = dateObj.getHours().toString().padStart(2, '0');
  const min = dateObj.getMinutes().toString().padStart(2, '0');
  const sec = dateObj.getSeconds().toString().padStart(2, '0');
  return withSecond
    ? `${hour}:${min}:${sec} ${t('clock_short')}`
    : `${hour}:${min} ${t('clock_short')}`;
};

export const getOtpCountdownTime = dateObj => {
  const now = new Date();
  const totalSeconds = ((dateObj.getTime() - now.getTime()) / 1000).toFixed(0);
  const minute = (totalSeconds / 60).toString().split('.')[0].padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  if (totalSeconds <= 0) {
    return {ended: true, text: '00:00'};
  }
  return {ended: false, text: `${minute}:${seconds}`};
};

export const getOtpCooldownTime = dateObj => {
  const now = new Date();
  const totalSeconds = ((dateObj.getTime() - now.getTime()) / 1000).toFixed(0);
  if (totalSeconds <= 0) {
    return {ended: true, text: '0'};
  }
  return {ended: false, text: `${totalSeconds}`};
};

export const getTimeForDebug = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getMilliseconds()}ms`;
};

/*
 *  remove same date data
 *  return newest data per day
 *  data have to be orderBy desc
 *  order is return order
 */
export const filterOutDuplicateDateForChart = (data, order = 'asc') => {
  if (!data) {
    return [];
  }
  const newData = data.reduce((acc, curr) => {
    if (
      !acc.some(item => {
        const prevDate = new Date(item.dateAdded * 1000);
        const currDate = new Date(curr.dateAdded * 1000);
        return isSameDay(prevDate, currDate);
      })
    ) {
      acc.push(curr);
    }
    return acc;
  }, []);
  newData.sort((a, b) =>
    order === 'desc' ? b.dateAdded - a.dateAdded : a.dateAdded - b.dateAdded,
  );
  return newData;
};

export const getLineHeight = fontSize => {
  if (Platform.OS === 'ios') {
    return fontSize * 1.7;
  }
  return fontSize * 1.8;
};

export const getSex = apiSex => {
  switch (apiSex) {
    case 'M':
      return t('male');
    case 'F':
      return t('female');
    default:
      return t('none');
  }
};

export const getAge = dateString => {
  try {
    if (!dateString) {
      throw 'empty dateString';
    }
    const now = new Date();
    const birthdate = new Date(dateString);
    let age = now.getFullYear() - birthdate.getFullYear();
    const monthDif = now.getMonth() - birthdate.getMonth();
    if (
      monthDif < 0 ||
      (monthDif === 0 && now.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  } catch (error) {
    console.log('[Error] getAge -> ', error);
    return '-';
  }
};

export const formatPhoneNumberTH = phone => {
  if (!phone) {
    return '';
  }
  let newPhone = '';
  if (phone.length >= 6) {
    newPhone =
      phone.substring(0, 3) +
      '-' +
      phone.substring(3, 6) +
      '-' +
      phone.substring(6);
  } else if (phone.length >= 3) {
    newPhone = phone.substring(0, 3) + '-' + phone.substring(3);
  } else {
    newPhone = phone;
  }
  return newPhone;
};

// https://stackoverflow.com/a/2901298
// for i18n support use Number.toLocaleString() instead
export const formatCommaThousand = num => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
