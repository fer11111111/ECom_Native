// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// interface Product {
//   id: number; // Replace with `string` if the ID is a string
//   name: string;
//   image: string;
//   price: string;
// }
// const LandingPage = () => {
//   const [showProducts, setShowProducts] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch products from API
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://api.example.com/products'); // Replace with your API endpoint
//       setProducts(response.data); // Ensure the API response structure matches your product data structure
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (showProducts) {
//       fetchProducts();
//     }
//   }, [showProducts]);

//   const renderProduct = ({ item }: { item: Product }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: item.image }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>{item.price}</Text>
//     </View>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {!showProducts ? (
//         <>
//           {/* Header Section */}
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Welcome to NewApp</Text>
//             <Text style={styles.subHeaderText}>Your one-stop shop for everything!</Text>
//           </View>

//           {/* Banner Section */}
//           <Image
//             source={{ uri: 'https://via.placeholder.com/400x200' }}
//             style={styles.banner}
//           />

//           {/* Features Section */}
//           <View style={styles.featuresSection}>
//             <Text style={styles.sectionTitle}>Why Shop With Us?</Text>
//             <View style={styles.featureItem}>
//               <Text style={styles.featureText}>✔ Wide variety of products</Text>
//             </View>
//             <View style={styles.featureItem}>
//               <Text style={styles.featureText}>✔ Amazing discounts</Text>
//             </View>
//             <View style={styles.featureItem}>
//               <Text style={styles.featureText}>✔ Fast delivery</Text>
//             </View>
//           </View>

//           {/* Call-to-Action */}
//           <TouchableOpacity style={styles.ctaButton} onPress={() => setShowProducts(true)}>
//             <Text style={styles.ctaButtonText}>Start Shopping Now</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <View style={styles.productsContainer}>
//           <Text style={styles.sectionTitle}>Our Products</Text>
//           {loading ? (
//             <ActivityIndicator size='large' color='#007bff' />
//           ) : (
//             <FlatList
//               data={products}
//               renderItem={renderProduct}
//               keyExtractor={(item) => item.id.toString()}
//               numColumns={2}
//               contentContainerStyle={styles.grid}
//             />
//           )}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//   },
//   banner: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   featuresSection: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   featureText: {
//     fontSize: 16,
//     color: '#444',
//   },
//   ctaButton: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   ctaButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   productsContainer: {
//     flex: 1,
//   },
//   grid: {
//     justifyContent: 'space-between',
//   },
//   productCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     margin: 8,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 8,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default LandingPage;



// App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ContentfulResponse, Product } from './src/types';

const SPACE_ID = 'gxz2kpjfag3c'; // Replace with your Space ID
const ACCESS_TOKEN = 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA'; // Replace with your access token

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries`;

    axios
      .get<ContentfulResponse>(url, {
        params: {
          access_token: ACCESS_TOKEN,
          content_type: 'products', // Replace with your content type
        },
      })
      .then((response) => {
        setProducts(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.fields.name}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image style={styles.image} source={{ uri: item.fields.media }} />
            <Text style={styles.productName}>{item.fields.name}</Text>
            <Text style={styles.productPrice}>${item.fields.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productCard: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4CAF50',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
