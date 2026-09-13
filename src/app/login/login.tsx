import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../constants';
import { login } from '../../services/cognito';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const canSubmit = email.trim() !== '' && password.trim() !== '' && !isLoading;

    const handleLogin = async () => {
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await login(email, password);
            router.replace('/home/home');
        } catch (error) {
            if (error instanceof Error && error.name === 'UserAlreadyAuthenticatedException') {
                router.replace('/home/home');
                return;
            }

            console.error('Error logging in: ', error);
            setErrorMessage('E-mail ou senha inválidos.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Entrar na sua conta</Text>

            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
                value={email}
                placeholder="voce@email.com"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                style={[styles.input, focusedInput === 'email' && { borderColor: colors.primary, borderWidth: 1.5 }]}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>SENHA</Text>

            <View style={styles.passwordContainer}>
                <TextInput
                    value={password}
                    placeholder="Sua senha"
                    placeholderTextColor="gray"
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    style={[
                        styles.input,
                        styles.passwordInput,
                        focusedInput === 'password' && {
                            borderColor: colors.primary,
                            borderWidth: 1.5
                        }
                    ]}
                    onChangeText={setPassword}
                />

                <Pressable
                    style={styles.passwordIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="gray"
                    />
                </Pressable>
            </View>

            {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <Pressable disabled={!canSubmit} onPress={handleLogin}>
                <Text style={[canSubmit ? styles.buttonPrimary : styles.buttonDisabled]}>
                    {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.back()}>
                <Text style={styles.buttonSecondary}>Voltar</Text>
            </Pressable>
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
        fontFamily: fonts.extraBold,
        marginBottom: 10
    },
    label: {
        fontSize: 12,
        color: colors.labelColor,
        fontFamily: fonts.regular,
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        fontSize: 16,
        fontFamily: fonts.regular,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.inputBorder,
        height: 50,
        width: '100%',
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 16,
        color: '#000'
    },
    errorText: {
        color: colors.primary,
        fontFamily: fonts.regular,
        fontSize: 13,
        marginTop: 10
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
        marginTop: 15,
        textAlign: 'center',
        color: colors.primary
    },
    buttonDisabled: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        fontFamily: fonts.semiBold,
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
    passwordContainer: {
        position: 'relative',
        width: '100%',
        height: 50,
    },
    passwordInput: {
        paddingRight: 50,
    },
    passwordIcon: {
        position: 'absolute',
        right: 16,
        top: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
