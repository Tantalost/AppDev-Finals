import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const EventsScreen = () => {
  const todayEvent = {
    title: 'WMSU College Entrance Test',
    time: '7am - 10am',
    location: 'WMSU, Zamboanga City',
    image: require('@/assets/images/image 146.png'), // Placeholder - replace with actual image
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'DevFest 2025',
      time: '8am - 12pm',
      location: 'Grand Astoria Hotel, Zamboanga City',
      date: '16 NOV',
      image: require('@/assets/images/devfest.jpg'), // Placeholder
    },
    {
      id: 2,
      title: 'Presidential and Vice-Presidential Debate 2025',
      time: '1pm - 5pm',
      location: 'WMSU Open Stage',
      date: '16 NOV',
      image: require('@/assets/images/debate.jpg'), // Placeholder
    },
    {
      id: 3,
      title: '106th Grand Alumni Homecoming',
      time: '8am - 5pm',
      location: 'WMSU, Zamboanga City',
      date: '1-6 DEC',
      image: require('@/assets/images/alumni.jpg'), // Placeholder
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity>
          <Icon name="bookmark" size={28} color="#FF4444" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          <TouchableOpacity style={styles.todayCard}>
            <View style={styles.todayCardImageContainer}>
              <Image
                source={todayEvent.image}
                style={styles.todayCardImage}
                resizeMode="cover"
              />
             
            </View>
            <View style={styles.todayCardContent}>
              <Text style={styles.todayCardTitle}>{todayEvent.title}</Text>
              <View style={styles.todayCardInfo}>
                <Icon name="clock-outline" size={16} color="#666" />
                <Text style={styles.todayCardInfoText}>{todayEvent.time}</Text>
              </View>
              <View style={styles.todayCardInfo}>
                <Icon name="map-marker" size={16} color="#666" />
                <Text style={styles.todayCardInfoText}>{todayEvent.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.upcomingScroll}>
            {upcomingEvents.map((event) => (
              <TouchableOpacity key={event.id} style={styles.upcomingCard}>
                <View style={styles.upcomingCardImageContainer}>
                  <Image
                    source={event.image}
                    style={styles.upcomingCardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.upcomingCardOverlay}>
                    <View style={styles.upcomingDateBox}>
                      <Text style={styles.upcomingDateText}>{event.date}</Text>
                    </View>
                    
                  </View>
                </View>
                <View style={styles.upcomingCardContent}>
                  <Text style={styles.upcomingCardTitleText}>{event.title}</Text>
                  <View style={styles.upcomingCardInfo}>
                    <Icon name="clock-outline" size={14} color="#666" />
                    <Text style={styles.upcomingCardInfoText}>{event.time}</Text>
                  </View>
                  <View style={styles.upcomingCardInfo}>
                    <Icon name="map-marker" size={14} color="#666" />
                    <Text style={styles.upcomingCardInfoText}>{event.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11181C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#11181C',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  todayCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todayCardImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  todayCardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  todayCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  todayCardOverlayText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  todayCardContent: {
    padding: 15,
  },
  todayCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 10,
  },
  todayCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  todayCardInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  upcomingScroll: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  upcomingCard: {
    width: 280,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingCardImageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  upcomingCardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E3A8A',
  },
  upcomingCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(177, 191, 231, 0)',
    padding: 15,
    justifyContent: 'space-between',
  },
  upcomingDateBox: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  upcomingDateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  upcomingCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  upcomingCardSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 5,
  },
  upcomingCardIcon: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  upcomingCardContent: {
    padding: 15,
  },
  upcomingCardTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 8,
  },
  upcomingCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  upcomingCardInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
});

export default EventsScreen;
