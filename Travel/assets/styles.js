import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 40,
    color: '#0B646B',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#527283',
    fontSize: 36,
  },
  TopimageContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  searchContainer: {
    margin: 20,
    borderColor:'grey',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,  // Equivalent to px-8
    marginTop: 15,     
    marginBottom:15     // Equivalent to mt-8
  },  
  listContent: {
    paddingHorizontal: 50,
    paddingBottom: 50,
  },
  card: {
    flex:1,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 180,
    margin: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    // height: 220
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#428288',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardLocation: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
    marginTop: 6,
  },
   listContent: {
    paddingHorizontal: 3,
    paddingVertical: 16,
  },
});

export default styles;
