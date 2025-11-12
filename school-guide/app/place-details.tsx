import React from 'react';
import {
  View,Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const allPlaces = [
  { id: 1, name: 'Main Canteen', 
    hours: '7am - 7pm', 
    days:'Mon-Sat', 
    image: require('@/assets/images/canteen.jpg'), 
    description: "Healthy meals and snacks.", 
    services: [{id:1,name:'Clean Environment',
    icon:'hand-wash'},{id:2,name:'Food and Beverages',icon:'food'},{id:3,name:'Support customers',icon:'handshake'},{id:4,name:'Budget Friendly',icon:'cash'}] },
  
  { id: 2, name: 'Snack Bar', 
    hours: '8am - 6pm', 
    days:'Mon-Sat', 
    image: require('@/assets/images/snack.jpg'), 
    description: "Quick snacks.", 
    services: [{id:1,name:'Clean Environment',
    icon:'hand-wash'
  }] },

  { id: 3, 
    name: 'Coffee Hub', 
    hours: '8am - 5pm', 
    days:'Mon-Sat', 
    image: require('@/assets/images/coffee.jpg'), 
    description: "Coffee and pastries.", 
    services: [{id:2,name:'Food and Beverages',icon:'food'}] },

  { id: 4, 
    name: 'Main Library', 
    hours: '8am - 8pm', 
    days:'Mon-Sun', 
    image: require('@/assets/images/library.jpg'), 
    description: "Quiet reading and research.", 
    services: [{id:3,name:'Support customers',icon:'handshake'}] },

  { id: 6, 
    name: 'Registrar’s Office', 
    hours: '8am - 5pm', 
    days:'Mon-Fri', 
    image: require('@/assets/images/registrar.jpg'), 
    description: "Registration services.", 
    services: [{id:4,name:'Budget Friendly',icon:'cash'}] },

  { id: 7, 
    name: 'Finance Office', 
    hours: '8am - 5pm', 
    days:'Mon-Fri', 
    image: require('@/assets/images/finance.jpg'), 
    description: "Payments and accounts.", 
    services: [{id:4,name:'Budget Friendly',icon:'cash'}] },
];

const PlaceDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const placeData = allPlaces.find(p => p.id.toString() === id) || allPlaces[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#f9f6f6ff" />
        </TouchableOpacity>
      </View>


      <View style={styles.imageContainer}>
        <Image source={placeData.image} style={styles.backgroundImage} resizeMode="cover" />
      </View>

      <ScrollView style={styles.contentCard} contentContainerStyle={styles.contentCardContent}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{placeData.name}</Text>
          <TouchableOpacity>
            <Icon name="bookmark-outline" size={24} color="#FF6B4A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.hours}>{placeData.hours}</Text>
        <View style={styles.daysContainer}>
          <Icon name="calendar" size={16} color="#666" />
          <Text style={styles.days}>{placeData.days}</Text>
        </View>
        <Text style={styles.description}>{placeData.description}</Text>

        <Text style={styles.servicesTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {placeData.services.map(service => (
            <View key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Icon name={service.icon} size={32} color="#FF6B4A" />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { position:'absolute', top:0, left:0, right:0, zIndex:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20, paddingTop:50, paddingBottom:15 },
  backContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8, 
  paddingHorizontal: 10,
  paddingVertical: 20,
  borderRadius: 20,
  },

  backButton: { backgroundColor:'rgba(255,255,255,0.9)', borderRadius:20, padding:8 },
  imageContainer: { width:'100%', height:'40%' },
  backgroundImage: { width:'100%', height:'100%', backgroundColor:'#E0E0E0' },
  contentCard: { flex:1, backgroundColor:'#FFF8F8', borderTopLeftRadius:30, borderTopRightRadius:30, marginTop:-30, paddingTop:4 },
  contentCardContent: { padding:30, paddingBottom:40 },
  titleSection: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  title: { fontSize:28, fontWeight:'bold', color:'#11181C' },
  hours: { fontSize:16, color:'#11181C', marginBottom:10 },
  daysContainer: { flexDirection:'row', alignItems:'center', marginBottom:20 },
  days: { fontSize:14, color:'#666', marginLeft:8 },
  description: { fontSize:14, color:'#666', lineHeight:22, marginBottom:30 },
  servicesTitle: { fontSize:20, fontWeight:'bold', color:'#11181C', marginBottom:15 },
  servicesGrid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' },
  serviceItem: { width:'48%', alignItems:'center', marginBottom:20 },
  serviceIconContainer: { width:70, height:70, borderRadius:35, backgroundColor:'#FFF5F3', justifyContent:'center', alignItems:'center', marginBottom:10 },
  serviceName: { fontSize:12, color:'#666', textAlign:'center' },
});

export default PlaceDetailsScreen;
