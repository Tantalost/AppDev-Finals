import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
// Import useMemo
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlacesScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('Canteen');
  // --- New State ---
  // Use a Set for efficient adding/removing/checking of favorites
  const [favorites, setFavorites] = useState(new Set<number>());
  // State to toggle between normal view and favorites-only view
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  // --- End New State ---

  const filters = ['Canteen', 'Library', 'Admin Office'];

  const places = {
    Canteen: [
      {
        id: 1,
        name: 'Main Canteen',
        hours: '7am - 7pm',
        image: require('@/assets/images/canteen.jpg'),
      },
      {
        id: 2,
        name: 'Snack Bar',
        hours: '8am - 6pm',
        image: require('@/assets/images/snack.jpg'),
      },
      {
        id: 3,
        name: 'Coffee Hub',
        hours: '8am - 5pm',
        image: require('@/assets/images/coffee.jpg'),
      },
    ],
    Library: [
      {
        id: 4,
        name: 'Main Library',
        hours: '8am - 8pm',
        image: require('@/assets/images/library.jpg'),
      },
    ],
    'Admin Office': [
      {
        id: 6,
        name: 'Registrar’s Office',
        hours: '8am - 5pm',
        image: require('@/assets/images/registrar.jpg'),
      },
      {
        id: 7,
        name: 'Finance Office',
        hours: '8am - 5pm',
        image: require('@/assets/images/finance.jpg'),
      },
    ],
  };

  // --- New Favorite Toggle Function ---
  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      // Create a new Set to ensure state immutability
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id); // Remove if already favorited
      } else {
        newFavorites.add(id); // Add if not favorited
      }
      return newFavorites;
    });
  };
  // --- End New Function ---

  // --- New Memoized Data Logic ---
  // Flatten all places into one array, memoized so it only runs once
  const allPlaces = useMemo(() => Object.values(places).flat(), []);

  // This determines what data to show in the FlatList
  const displayedData = useMemo(() => {
    if (showFavoritesOnly) {
      // If showing favorites, filter all places by the favorites Set
      return allPlaces.filter((place) => favorites.has(place.id));
    }
    // Otherwise, show places for the currently selected filter
    return places[selectedFilter as keyof typeof places] || [];
  }, [showFavoritesOnly, favorites, allPlaces, selectedFilter]);
  // --- End Memoized Data ---

  // --- Updated renderPlaceCard ---
  // This structure is changed to separate the navigation-click
  // from the bookmark-click.
  const renderPlaceCard = ({ item }: { item: any }) => (
    <View style={styles.placeCard}>
      {/* This Link/TouchableOpacity wraps the card content for navigation */}
      <Link href={`/place-details?id=${item.id}`} asChild>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={styles.placeCardImageContainer}>
            <Image
              source={item.image}
              style={styles.placeCardImage}
              resizeMode="cover"
            />
            <View style={styles.placeCardOverlay}>
              <Text style={styles.placeCardName}>{item.name}</Text>
              <Text style={styles.placeCardHours}>{item.hours}</Text>
              <Text style={styles.seeMoreText}>See More {'>>'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      {/* This TouchableOpacity is separate for the bookmark button */}
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={() => toggleFavorite(item.id)} // Calls the toggle function
      >
        <Icon
          // Dynamically change icon based on favorite status
          name={favorites.has(item.id) ? 'bookmark' : 'bookmark-outline'}
          size={20}
          // Change color for better visibility
          color={favorites.has(item.id) ? '#FF4444' : '#FFFFFF'}
        />
      </TouchableOpacity>
    </View>
  );
  // --- End Updated renderPlaceCard ---

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Places</Text>
        {/* Updated header bookmark to toggle favorites view */}
        <TouchableOpacity onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}>
          <Icon
            name={showFavoritesOnly ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color="#FF4444"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>

      {/* --- Conditional Rendering for Filters --- */}
      {/* Only show filters if we are NOT in favorites-only view */}
      {!showFavoritesOnly && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* --- End Conditional Rendering --- */}

      <ScrollView
        style={styles.featuredScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>
            {/* Dynamically change title */}
            {showFavoritesOnly ? 'My Favorites' : 'Featured Places'}
          </Text>
          <FlatList
            data={displayedData} // Use the new dynamic data
            renderItem={renderPlaceCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.placeCardRow}
            contentContainerStyle={styles.featuredContent}
            // Add a helpful message if favorites list is empty
            ListEmptyComponent={
              showFavoritesOnly ? (
                <Text style={styles.emptyText}>You have no favorites yet.</Text>
              ) : null
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Add the new 'emptyText' style
const styles = StyleSheet.create({
  // ... (all your existing styles) ...
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
    marginBottom: 15,
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
  filterContainer: {
    marginBottom: 8,
    maxHeight: 48,
  },
  filterContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FF4444',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  featuredScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuredSection: {
    paddingBottom: 30,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
    marginTop: 10,
    marginBottom: 20,
  },
  featuredContent: {
    paddingBottom: 20,
  },
  placeCardRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  // This style now applies to the <View> container
  placeCard: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeCardImageContainer: {
    width: '100%',
    height: 180,
    // position: 'relative', // No longer needed here
  },
  placeCardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  bookmarkButton: {
    position: 'absolute', // Now positioned relative to placeCard
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker bg for visibility
    borderRadius: 20,
    padding: 5,
    zIndex: 1, // Ensure it's on top
  },
  placeCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  placeCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  placeCardHours: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  seeMoreText: {
    fontSize: 11,
    color: '#FFD700',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  // --- New Style ---
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});

export default PlacesScreen;