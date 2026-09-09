import { StyleSheet } from 'react-native';
import { colors, fonts } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  logoImage: {
    width: 250,
    height: 230,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 38,
    fontFamily: fonts.extraBold,
    color: colors.black,
  },
  subText: {
    fontSize: 14,
    color: colors.labelColor,
    fontFamily: fonts.regular,
  },
  buttonPrimary: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    backgroundColor: colors.primary,
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
    width: 350,
    textAlign: 'left',
    paddingTop: 12,
    paddingLeft: 20,
    marginTop: 30,
  },
  buttonSecondary: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 50,
    width: 350,
    textAlign: 'left',
    paddingTop: 12,
    paddingLeft: 20,
    marginTop: 10,
  },
  alertText: {
    fontSize: 10,
    color: 'gray',
    fontFamily: fonts.regular,
    marginTop: 20,
    textAlign: 'center',
  },
});
