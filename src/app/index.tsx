import { router } from 'expo-router';
import { Image, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles';

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
      <Pressable onPress={() => router.push('/signup/signup')}>
        <Text style={styles.buttonPrimary}>CRIAR MINHA CONTA</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/login/login')}>
        <Text style={styles.buttonSecondary}>JÁ TENHO CONTA</Text>
      </Pressable>
      <Text style={styles.alertText}>
        Este app não substitui orientação médica. Seus parâmetros de insulina vêm da sua equipe de saúde.
      </Text>
    </SafeAreaView>
  );
}

