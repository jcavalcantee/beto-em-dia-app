import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { getUserName, logout } from '../../services/cognito'

export default function Home() {
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        getUserName()
            .then((value) => setName(value ?? null))
            .catch((error) => console.error('Error fetching user name: ', error))
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
            router.replace('/')
        } catch (error) {
            console.error('Error logging out: ', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>{name ?? 'Carregando...'}</Text>
            <Pressable onPress={handleLogout}>
                <Text>Sair</Text>
            </Pressable>
        </SafeAreaView>
    )
}