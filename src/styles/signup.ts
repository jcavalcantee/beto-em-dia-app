import { StyleSheet } from 'react-native';
import { colors, fonts } from '../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f3f2f2',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        //MUDAR PARA 40 O TOP
        left: 20,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    stepText: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 15,
        fontSize: 12,
        fontFamily: 'Archivo_600SemiBold',
        color: '#ae1800',
        textAlign: 'center'
    },
    stepBarContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 16,
        gap: 6,
    },
    stepBarSegment: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgray',
        marginTop: 16,
    },
    content: {
        width: '100%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 26,
        fontFamily: 'Archivo_800ExtraBold',
        marginTop: 20,
    },
    label: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Archivo_400Regular',
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        fontSize: 14,
        fontFamily: 'Archivo_400Regular',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#aaa',
        height: 50,
        width: '100%',
        backgroundColor: '#eae7e7',
    },
    buttonPrimary: {
        fontFamily: 'Archivo_600SemiBold',
        fontSize: 16,
        backgroundColor: '#ec3013',
        color: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ec3013',
        height: 50,
        width: '100%',
        textAlign: 'left',
        paddingTop: 12,
        paddingLeft: 20,
        marginTop: 20,
    },
    buttonSecondary: {
        fontFamily: 'Archivo_600SemiBold',
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 50,
        width: '100%',
        textAlign: 'left',
        paddingTop: 12,
        paddingLeft: 20,
        marginTop: 20
    },
    subLabel: {
        fontSize: 12,
        fontFamily: 'Archivo_400Regular',
        color: 'gray',
        alignContent: 'flex-start',
    },
    sliderBlock: {
        marginTop: 20,
        marginBottom: 10,
    },
    diagnosisTimeContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    options: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 50,
        flexBasis: '47%',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    optionsText: {
        fontFamily: 'Archivo_600SemiBold',
        fontSize: 16,
        textAlign: 'center',
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
    buttonContainer: {
        marginTop: 25
    },
    labelValueContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataContainer: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'darkorange',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 15
    },
    dataLabel: {
        fontSize: 12,
        color: '#343434',
        fontFamily: 'Archivo_600SemiBold',
        marginBottom: 8,

    },

    dataField: {
        width: '48%',
    },

    inputUnit: {
        fontSize: 12,
        fontFamily: 'Archivo_400Regular',
        color: '#888',
        marginTop: 8,
    },
    dataInput: {
        fontSize: 18,
        fontFamily: 'Archivo_400Regular',
        borderWidth: 1,
        borderColor: '#aaa',
        height: 50,
        width: '100%',
        backgroundColor: '#eae7e7',
        paddingHorizontal: 16,
    },

    formContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
        alignItems: 'center',
    },
    card: {
        fontSize: 14,
        fontFamily: 'Archivo_400Regular',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 100,
        width: '100%',
        backgroundColor: '#eae7e7',
    },
    resume: {
        fontFamily: 'Archivo_400Regular',
        color: '#333',
        paddingTop: 3,
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 20,

    },
    passwordRequirement: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.labelColor
    },
    passwordRequirementValid: {
        color: colors.primary
    }

})
