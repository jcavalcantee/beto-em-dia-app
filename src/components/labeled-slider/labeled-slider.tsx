import Slider from '@react-native-community/slider';
import { Text, View } from 'react-native';
import { styles } from './styles';

const THUMB_IMAGE = {
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAABqUlEQVR4nOWaMa6EIBBAOcDvOIBXmH5r72BrbW3rlWytrbf1ECbcYTcmmBA+KLiDDkPxms3uOi/CMMAIBVJwJvUDKgWyViBbBbJXIAdNrz+r9XeyEdyC7RTIUYFcFchPIKv+TYctjPVHjQI5RQidMen/fFxwG2YLopjNop9xu+BLgZwTitnM+pm3CA43itkMKQX/dCJ4Sm5n1LGgCm6Z7U1Abucdmm1D5VImkqssIZIhw5LSm3O9ycPheiZIYc6dMV4VfDJbxuLNrj65F4GgY3Gukz7BOxdxLOZQwZZAsFf5V9a5BCkuCaEsZ4INgSB/pTkSxNzyPMXkE6wIBIdF5RLsCASGRecSzKFqCWV0CcacoVBntQU5zb+dyhSsCQSETW0K5ly9+GhNwZ5AQNj0pmBOW6NQhqIE2Q9R9kmG/TLBfqFnX6oVUWyz3y5xmofODS/7I4siDp3YHxvmXtUEHfyyP7oXJVy+5LaFir4+y6m6uXwBKkq4whbcmxBMSUpvErWNxByuFOZkkkYgKtk1aSuXCetmPBO27ZQ2bBtibdi2NB8Js2pKJ8cXCowWJupi4awAAAAASUVORK5CYII=',
    width: 28,
    height: 28,
    scale: 2,
};

type LabeledSliderProps = {
    label: string;
    unit: string;
    value: number;
    minimumValue: number;
    maximumValue: number;
    step?: number;
    onValueChange: (value: number) => void;
};

export default function LabeledSlider({
    label,
    unit,
    value,
    minimumValue,
    maximumValue,
    step = 1,
    onValueChange,
}: LabeledSliderProps) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.valueRow}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>

            <Slider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                step={step}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor="#ec3013"
                maximumTrackTintColor="#e2e0e0"
                thumbTintColor="#ec3013"
                thumbImage={THUMB_IMAGE}
            />
            
        </View>
    );
}