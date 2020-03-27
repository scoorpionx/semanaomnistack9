import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import styles from './styles';

function SpotList({ tech, navigation }){
    const [spots, setSpots] = useState([]);
    
    useEffect(() => {
        async function LoadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }

        LoadSpots();
    }, []);
    
    function handleNavigate(id){
        navigation.navigate('Book', { id });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: spot }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: spot.thumbnail }} />
                        <Text style={styles.company}>{spot.company}</Text>
                        <Text style={styles.price}>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(spot._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

export default withNavigation(SpotList);