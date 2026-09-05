import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants';


export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/main-logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.title}>Conte carboidratos sem advinhar.</Text>
      <Text
        style={styles.subText}>
        Fotografe o prato, veja a estimativa da IA com a fonte na tabela TACO e o bolus calculado com os seus parâmetros. Feito para os primeiros meses com diabetes tipo 1.
      </Text>
      <Pressable onPress={() => alert('Em breve!')}>
        <Text style={styles.buttonPrimary}>CRIAR MINHA CONTA</Text>
      </Pressable>
      <Pressable onPress={() => alert('Em breve!')}>
        <Text style={styles.buttonSecondary}>JÁ TENHO CONTA</Text>
      </Pressable>
      <Text style={styles.alertText}>
        Este app não substitui orientação médica. Seus parâmetros de insulina vêm da sua equipe de saúde.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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