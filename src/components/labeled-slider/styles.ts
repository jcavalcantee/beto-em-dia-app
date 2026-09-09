import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Archivo_400Regular',
        letterSpacing: 1,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 6,
        marginTop: 6,
    },
    value: {
        fontFamily: 'Archivo_800ExtraBold',
        fontSize: 40,
        lineHeight: 42,
        color: '#111',
    },
    unit: {
        fontFamily: 'Archivo_400Regular',
        fontSize: 16,
        color: '#333',
        paddingBottom: 6,
    },
    slider: {
        height: 8,
        width: '100%',
    }
});
