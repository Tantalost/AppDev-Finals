import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to Campus Guide</Text>
          <Text style={styles.headerSubtitle}>Your essential campus helper</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Link href="/(tabs)/events" asChild>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="calendar" size={32} color="#FF4444" />
              <Text style={styles.actionTitle}>Events</Text>
              <Text style={styles.actionSubtitle}>View upcoming events</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/(tabs)/places" asChild>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="map-marker" size={32} color="#FF4444" />
              <Text style={styles.actionTitle}>Places</Text>
              <Text style={styles.actionSubtitle}>Discover locations</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Quick Info</Text>
          <Text style={styles.infoText}>
            Navigate through the tabs to explore events, discover places, and learn more about the app.
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
    marginTop: 10,
    marginBottom: 5,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default DashboardScreen;
