import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../constants';
import { confirmAccount } from '../../services/cognito';

export default function ValidateAccount() {
    const [code, setCode] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const { email } = useLocalSearchParams();

    const validateInput = () => {
        return code.length !== 6;
    }

    const handleConfirmAccount = async () => {
        try {
            const response = await confirmAccount(
                email as string,
                code
            )

            console.log('Account confirmed successfully: ', response);
            router.replace('/');
        } catch (error) {
            console.error('Error confirming account: ', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Confirme seu e-mail</Text>
            <Text style={{ fontFamily: fonts.regular}}>
                Enviamos um código de 6 dígitos para{' '}
                <Text style={{ fontFamily: fonts.semiBold }}>
                    {email}.
                </Text>
            </Text>

            <TextInput
                style={[styles.input, focusedInput === 'code' && { borderColor: colors.primary, borderWidth: 1.5}]}
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChangeText={setCode}
                onFocus={() => setFocusedInput('code')}
                onBlur={() => setFocusedInput(null)}                
            />

            <Pressable 
                disabled={validateInput()}
                onPress={handleConfirmAccount}
            >
                <Text style={[validateInput() ? styles.buttonDisabled : styles.buttonPrimary]}>CONFIRMAR E CONTINUAR</Text>
            </Pressable>

            <Pressable>
                <Text style={styles.buttonSecondary}>Reenviar código</Text>
            </Pressable>

            <View style={styles.separator}></View>

            <Text style={[styles.helpText, {letterSpacing: .5, fontFamily: fonts.semiBold}]}>Não recebeu o código?</Text>
            <Text style={styles.helpText}>Verifique a caixa de spam. Se o endereço de e-mail estiver incorreto, volte e corrija - nada foi salvo ainda.</Text>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        fontFamily: fonts.extraBold
    },
    input: {
        fontSize: 20,
        fontFamily: fonts.semiBold,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#aaa',
        height: 50,
        width: '100%',
        backgroundColor: '#eae7e7',
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#000'
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
        width: '100%',
        textAlign: 'left',
        paddingTop: 12,
        paddingLeft: 20,
        marginTop: 20,
    },
    buttonSecondary: {
        fontFamily: fonts.semiBold,
        fontSize: 14,
        marginTop: 10,
        color: colors.primary
    },
    buttonDisabled: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: 16,
        color: '#ccc',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        width: '100%',
        textAlign: 'left',
        paddingTop: 12,
        paddingLeft: 20,
        marginTop: 20,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgray',
        marginTop: 'auto',
    },
    helpText: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.labelColor,
        marginTop: 10
    }
})