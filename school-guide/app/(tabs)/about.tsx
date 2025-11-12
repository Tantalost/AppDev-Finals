import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const AboutScreen = () => {
  const developers = [
    {
      id: 1,
      name: 'Justine James Alviar',
      image: require('@/assets/images/justine.png'), // Placeholder
    },
    {
      id: 2,
      name: 'Jayna Sahibul',
      image: require('@/assets/images/jayn.png'), // Placeholder
    },
    {
      id: 3,
      name: 'John Lloyd Climaco',
      image: require('@/assets/images/lloyd.png'), // Placeholder
    },
    {
      id: 4,
      name: 'Venn Malali',
      image: require('@/assets/images/ven.png'), // Placeholder
    },
    {
      id: 5,
      name: 'Stephanie Villamor',
      image: require('@/assets/images/steph.png'), // Placeholder
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.title}>About</Text>
          <Text style={styles.paragraph}>
            The Campus Guide project is a user-friendly mobile application designed as the essential
            campus helper for students, simplifying navigation and providing instant access to vital
            school information.
          </Text>
          <Text style={styles.paragraph}>
            The primary goal is to enhance the student experience by creating a central, digital hub
            that quickly answers common questions about locations, activities, and contacts.
          </Text>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactItem}>
            <Icon name="phone" size={20} color="#666" />
            <Text style={styles.contactText}>(+63) 995 567 9874</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="email" size={20} color="#666" />
            <Text style={styles.contactText}>@wmsu.edu.ph</Text>
          </View>
        </View>

        {/* Developer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <Text style={styles.groupName}>CynergyOps Group</Text>
          <View style={styles.developersContainer}>
            {developers.map((developer) => (
              <View key={developer.id} style={styles.developerItem}>
                <Image
                  source={developer.image}
                  style={styles.developerImage}
                  resizeMode="cover"
                />
                <Text style={styles.developerName}>{developer.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 25,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 35,
  },

   title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 15,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  groupName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontWeight: '500',
  },
  developersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  developerItem: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 20,
  },
  developerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  developerName: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default AboutScreen;
