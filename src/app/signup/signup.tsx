import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LabeledSlider from '../../components/labeled-slider/labeled-slider';
import { styles } from '../../styles/signup';

import { createAccount } from '../../services/cognito';

export default function Signup() {

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const stepText = `PASSO ${currentStep} DE ${totalSteps} • ${currentStep === 1 ? 'CONTA' : currentStep === 2 ? 'PERFIL' : 'METAS'}`;
    const stepTitle = currentStep === 1 ? 'Vamos criar a sua conta' : currentStep === 2 ? 'Sobre você e a DM1' : 'Suas metas e parâmetros';
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        age: 22,
        diagnosisTime: '',
        treatmentType: '',
        carboDayGoal: 80,
        insulinCarboRatio: '',
        insulinSensitivity: '',
        targetGlucose: '',
        basalInsulin: '',
    })

    const handleCreateAccount = async (email: string, password: string) => {
        try {
            const response = await createAccount(
                email,
                password,
                form.name
            );

            console.log('Account created successfully: ', response);

            const profile = {
                name: form.name,
                age: form.age,
                diagnosisTime: form.diagnosisTime,
                treatmentType: form.treatmentType,
                carboDayGoal: form.carboDayGoal,
                insulinCarboRatio: Number(form.insulinCarboRatio),
                insulinSensitivity: Number(form.insulinSensitivity),
                targetGlucose: Number(form.targetGlucose),
                basalInsulin: form.basalInsulin,
            };

            router.push({
                pathname: '/signup/validateAccount',
                params: {
                    email: email,
                    profile: JSON.stringify(profile)
                }
            });
        } catch (error) {
            console.error('Error creating account: ', error);
        }
    }

    const validatePassword = (password: string): boolean => {
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        return (
            hasMinLength &&
            hasUppercase &&
            hasLowercase &&
            hasSpecialChar
        );
    };

    const passwordRequirements = {
        minLength: form.password.length >= 8,
        uppercase: /[A-Z]/.test(form.password),
        lowercase: /[a-z]/.test(form.password),
        special: /[^A-Za-z0-9]/.test(form.password),
    };

    const validateStepOne = (name: string, email: string, password: string): boolean => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '')
            return false;
        if (!email.includes('@'))
            return false;

        const [user, domain] = email.split('@');

        if (!user || !domain)
            return false
        if (!validatePassword(password))
            return false

        return true
    }

    const validateStepTwo = (diagnosisTime: string, treatmentType: string): boolean => {
        if (diagnosisTime.trim() === '' || treatmentType.trim() === '')
            return false
        return true
    }

    const validateStepThree = (insulinCarboRatio: number, insulinSensitivity: number, targetGlucose: number, basalInsulin: string): boolean => {
        if (String(insulinCarboRatio).trim() === '' || String(insulinSensitivity).trim() === '' || String(targetGlucose).trim() === '' || basalInsulin.trim() === '')
            return false
        if (isNaN(insulinCarboRatio) || isNaN(insulinSensitivity) || isNaN(targetGlucose))
            return false
        return true
    }

    const canContinue =
        currentStep === 1
            ? validateStepOne(form.name, form.email, form.password)
            : currentStep === 2
                ? validateStepTwo(form.diagnosisTime, form.treatmentType)
                : currentStep === 3
                    ? validateStepThree(Number(form.insulinCarboRatio), Number(form.insulinSensitivity), Number(form.targetGlucose), form.basalInsulin)
                    : true;

    const stepBarView = () => {
        return (
            <View style={styles.stepBarContainer}>
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.stepBarSegment,
                            { backgroundColor: index < currentStep ? '#ec3013' : 'lightgray' },
                        ]}
                    />
                ))}
            </View>
        );
    };

    const insulinCalculation = (insulinCarboRatio: number, insulinSensitivity: number, targetGlucose: number) => {
        const carbDose = 60 / insulinCarboRatio;
        const correctionDose = (168 - targetGlucose) / insulinSensitivity;
        const totalDose = carbDose + correctionDose
        return { carbDose, correctionDose, totalDose }
    }

    const resultCalc = insulinCalculation(
        Number(form.insulinCarboRatio),
        Number(form.insulinSensitivity),
        Number(form.targetGlucose)
    )

    const handleNextStep = () => {
        if (currentStep === 1) {
            return (
                <View>
                    <Text style={styles.label}>COMO QUER SER CHAMADO</Text>
                    <TextInput
                        value={form.name}
                        placeholder="Seu nome"
                        placeholderTextColor="gray"
                        onFocus={() => setFocusedInput("name")}
                        onBlur={() => setFocusedInput(null)}
                        style={[styles.input, focusedInput === "name" && { borderColor: '#ec3013', borderWidth: 1.5 }]}
                        onChangeText={(value) =>
                            setForm(prev => ({
                                ...prev,
                                name: value
                            }))
                        }
                    />
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        value={form.email}
                        placeholder="voce@email.com"
                        placeholderTextColor="gray"
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        style={[styles.input, focusedInput === "email" && { borderColor: '#ec3013', borderWidth: 1.5 }]}
                        onChangeText={(value) =>
                            setForm(prev => ({
                                ...prev,
                                email: value
                            }))
                        }
                    />
                    <Text style={styles.label}>SENHA</Text>
                    <TextInput
                        value={form.password}
                        placeholder="Mínimo de 8 caracteres"
                        placeholderTextColor="gray"
                        secureTextEntry
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        style={[styles.input, focusedInput === "password" && { borderColor: '#ec3013', borderWidth: 1.5 }]}
                        onChangeText={(value) =>
                            setForm(prev => ({
                                ...prev,
                                password: value
                            }))
                        }
                    />

                    <View style={{ marginTop: 8 }}>
                        <Text style={[styles.passwordRequirement, passwordRequirements.minLength && styles.passwordRequirementValid]}>
                            {passwordRequirements.minLength ? '✓' : '' } 8 caracteres
                        </Text>

                        <Text style={[styles.passwordRequirement, passwordRequirements.uppercase && styles.passwordRequirementValid]}>
                            {passwordRequirements.uppercase ? '✓' : ''} 1 letra maiúscula
                        </Text>

                        <Text style={[styles.passwordRequirement, passwordRequirements.lowercase && styles.passwordRequirementValid]}>
                            {passwordRequirements.lowercase ? '✓' : ''} 1 letra minúscula
                        </Text>

                        <Text style={[styles.passwordRequirement, passwordRequirements.special && styles.passwordRequirementValid]}>
                            {passwordRequirements.special ? '✓' : ''} 1 caractere especial
                        </Text>
                    </View>

                </View>
            )
            // SESSÃO: SOBRE VOCÊ E A DM1
        } else if (currentStep === 2) {
            return (
                <View>
                    <Text style={styles.subLabel}>Isso ajusta as estimativas da IA e o tom das explicações.</Text>

                    <View style={styles.sliderBlock}>
                        <LabeledSlider
                            label="IDADE"
                            unit="anos"
                            value={form.age}
                            minimumValue={8}
                            maximumValue={80}
                            onValueChange={(value) =>
                                setForm(prev => ({
                                    ...prev,
                                    age: value
                                }))
                            }
                        />
                        <View style={styles.labelValueContainer}>
                            <Text style={styles.subLabel}>8 anos</Text>
                            <Text style={styles.subLabel}>80 anos</Text>
                        </View>
                    </View>

                    {/* SESSÃO: TEMPO DE DIAGNÓSTICO */}
                    <Text style={styles.label}>TEMPO DE DIAGNÓSTICO</Text>

                    <View style={styles.diagnosisTimeContainer}>
                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    diagnosisTime: 'Menos de 6 meses'
                                }))
                            }
                            style={[
                                styles.options,
                                form.diagnosisTime === "Menos de 6 meses" && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.diagnosisTime === "Menos de 6 meses" && { color: '#fff' }
                                ]}>Menos de 6 meses</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    diagnosisTime: '6 meses a 2 anos'
                                }))
                            }
                            style={[
                                styles.options,
                                form.diagnosisTime === "6 meses a 2 anos" && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.diagnosisTime === "6 meses a 2 anos" && { color: '#fff' }
                                ]}>6 meses a 2 anos</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    diagnosisTime: '2 a 5 anos'
                                }))
                            }
                            style={[
                                styles.options,
                                form.diagnosisTime === "2 a 5 anos" && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.diagnosisTime === "2 a 5 anos" && { color: '#fff' }
                                ]}>2 a 5 anos</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    diagnosisTime: 'Mais de 5 anos'
                                }))
                            }
                            style={[
                                styles.options,
                                form.diagnosisTime === "Mais de 5 anos" && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.diagnosisTime === "Mais de 5 anos" && { color: '#fff' }
                                ]}>Mais de 5 anos</Text>
                        </Pressable>
                    </View>

                    {/* SESSÃO: TRATAMENTO */}
                    <Text style={[styles.label, { marginTop: 14 }]}>TRATAMENTO</Text>

                    <View style={styles.diagnosisTimeContainer}>
                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    treatmentType: 'Caneta (múltiplas doses)'
                                }))
                            }
                            style={[
                                styles.options,
                                form.treatmentType === 'Caneta (múltiplas doses)' && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.treatmentType === 'Caneta (múltiplas doses)' && { color: '#fff' }
                                ]}>Caneta (múltiplas doses)</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    treatmentType: 'Bomba de insulina'
                                }))
                            }
                            style={[
                                styles.options,
                                form.treatmentType === 'Bomba de insulina' && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.treatmentType === 'Bomba de insulina' && { color: '#fff' }
                                ]}>Bomba de insulina</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                setForm(prev => ({
                                    ...prev,
                                    treatmentType: 'Ainda definindo'
                                }))
                            }
                            style={[
                                styles.options,
                                form.treatmentType === 'Ainda definindo' && { backgroundColor: '#ec3013' }
                            ]}>
                            <Text
                                style={[
                                    styles.optionsText,
                                    form.treatmentType === 'Ainda definindo' && { color: '#fff' }
                                ]}>Ainda definindo</Text>
                        </Pressable>
                    </View>
                </View>
            )
            // SESSÃO: SUAS METAS E PARÂMETROS
        } else {
            return (
                <View>
                    <Text style={styles.subLabel}>Copie os números da receita da sua equipe. Dá para mudar depois no perfil.</Text>

                    <View style={styles.sliderBlock}>
                        <LabeledSlider
                            label="META DE CARBOIDRATO POR DIA"
                            unit="g/dia"
                            value={form.carboDayGoal}
                            minimumValue={80}
                            maximumValue={350}
                            step={5}
                            onValueChange={(value) =>
                                setForm(prev => ({
                                    ...prev,
                                    carboDayGoal: value
                                }))
                            }
                        />
                        <View style={styles.labelValueContainer}>
                            <Text style={styles.subLabel}>80 g</Text>
                            <Text style={styles.subLabel}>350 g</Text>
                        </View>
                    </View>

                    <View style={styles.dataContainer}>

                        {/* RAZÃO CARBO/INSULINA */}
                        <View style={styles.dataField}>
                            <Text style={styles.dataLabel}>
                                RAZÃO CARBO/INSULINA
                            </Text>

                            <TextInput
                                value={form.insulinCarboRatio}
                                onChangeText={(value) =>
                                    setForm(prev => ({
                                        ...prev,
                                        insulinCarboRatio: value
                                    }))
                                }
                                keyboardType="numeric"
                                placeholder="10"
                                placeholderTextColor="gray"
                                style={styles.dataInput}
                            />

                            <Text style={styles.inputUnit}>
                                g de carbo por 1 U
                            </Text>
                        </View>


                        {/* FATOR DE SENSIBILIDADE */}
                        <View style={styles.dataField}>
                            <Text style={styles.dataLabel}>
                                FATOR DE SENSIBILIDADE
                            </Text>

                            <TextInput
                                value={form.insulinSensitivity}
                                onChangeText={(value) =>
                                    setForm(prev => ({
                                        ...prev,
                                        insulinSensitivity: value
                                    }))
                                }
                                keyboardType="numeric"
                                placeholder="40"
                                placeholderTextColor="gray"
                                style={styles.dataInput}
                            />

                            <Text style={styles.inputUnit}>
                                mg/dL por 1 U
                            </Text>
                        </View>


                        {/* GLICEMIA ALVO */}
                        <View style={styles.dataField}>
                            <Text style={styles.dataLabel}>
                                GLICEMIA ALVO
                            </Text>

                            <TextInput
                                value={form.targetGlucose}
                                onChangeText={(value) =>
                                    setForm(prev => ({
                                        ...prev,
                                        targetGlucose: value
                                    }))
                                }
                                keyboardType="numeric"
                                placeholder="100"
                                placeholderTextColor="gray"
                                style={styles.dataInput}
                            />

                            <Text style={styles.inputUnit}>
                                mg/dL
                            </Text>
                        </View>


                        {/* INSULINA BASAL */}
                        <View style={styles.dataField}>
                            <Text style={styles.dataLabel}>
                                INSULINA BASAL
                            </Text>

                            <TextInput
                                value={form.basalInsulin}
                                onChangeText={(value) =>
                                    setForm(prev => ({
                                        ...prev,
                                        basalInsulin: value
                                    }))
                                }
                                placeholder="14 U às 22h"
                                placeholderTextColor="gray"
                                style={styles.dataInput}
                            />

                            <Text style={styles.inputUnit}>
                                Quantidade em U
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.card, { marginTop: 16 }]}>
                        <Text style={[styles.stepText, { textAlign: 'left', fontSize: 13 }]}>COMO VAI FICAR A SUA CONTA</Text>
                        <Text style={[styles.resume]}>
                            Algo de 60 g de carbo com glicemia em 168 → {
                                Number.isFinite(resultCalc.totalDose)
                                    ? resultCalc.totalDose.toFixed(1).replace('.', ',')
                                    : 0
                            }U. (
                            {
                                Number.isFinite(resultCalc.carbDose)
                                    ? resultCalc.carbDose.toFixed(1).replace('.', ',')
                                    : 0
                            } refeição + {
                                Number.isFinite(resultCalc.correctionDose)
                                    ? resultCalc.correctionDose.toFixed(1).replace('.', ',')
                                    : 0
                            }U de correção).
                        </Text>
                    </View>

                </View>
            )
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => {
                    if (currentStep === 1) {
                        setForm({
                            name: '',
                            email: '',
                            password: '',
                            age: 0,
                            diagnosisTime: '',
                            treatmentType: '',
                            carboDayGoal: 150,
                            insulinCarboRatio: '',
                            insulinSensitivity: '',
                            targetGlucose: '',
                            basalInsulin: '',
                        });
                        router.back();
                    } else {
                        setCurrentStep(currentStep - 1)
                    }
                }}
            >
                <Ionicons name="arrow-back" size={14} color="black" />
            </Pressable>
            <Text style={styles.stepText}>{stepText}</Text>
            {stepBarView()}
            <View style={styles.separator}></View>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>{stepTitle}</Text>
                {handleNextStep()}
                <Pressable
                    disabled={!canContinue}
                    onPress={() => setCurrentStep(currentStep + 1)}>
                    <View style={styles.buttonContainer}>
                        <Text
                            style={[
                                canContinue ? styles.buttonPrimary : styles.buttonDisabled,
                                currentStep === 3 ? { display: 'none' } : { display: 'flex' }
                            ]}>
                            CONTINUAR
                        </Text>
                    </View>
                </Pressable>
                <Pressable
                    style={{ marginTop: -20 }}
                    disabled={!canContinue}
                    onPress={() => handleCreateAccount(form.email, form.password)}
                >
                    <Text style={[
                        canContinue ? styles.buttonPrimary : styles.buttonDisabled,
                        currentStep === 3 ? { display: 'flex' } : { display: 'none' }
                    ]}>
                        CRIAR CONTA
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

