import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { config } from '../config/config';
import styles from '../assets/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RecommendedPlaces({description}) {
//    console.log(description);
   const [recData, setRecData] = useState();
   useEffect(() => {  

    axios.post(`${config.baseUrl}/places/similar`,{description:description}).then(res=>{
      console.log("the result is ",res.data.data)
      setRecData(res.data.data);
    }).catch(err=>{
      console.log("error is",err)
    })

  },[]);


  return (
    <View>
      <Text>RecommendedPlaces</Text>


      {recData?.length>0 &&  <FlatList
         data={recData}
         keyExtractor={(item) => item.place._id}
         numColumns={2}
         renderItem={({ item }) => (
           <TouchableOpacity
             onPress={() => navigation.navigate("PlaceDetail", { param: item })}
             style={styles.card}
           >
             <Image source={{ uri: item.place.coverImage }} style={styles.cardImage} />
             <Text style={styles.cardTitle}>{item.place.title}</Text>
             <View style={styles.locationContainer}>
               <FontAwesome name="map-marker" size={16} color="#0B646B" style={styles.locationIcon} />
               <Text style={styles.cardLocation}>{item.place.location}</Text>
             </View>

             <View style={styles.locationContainer}>
               {/* <FontAwesome name="map-marker" size={16} color="#0B646B" style={styles.locationIcon} /> */}
               <Text style={styles.cardLocation}>Cosine Similarity Score:{item.similarityScore}</Text>
             </View>
           </TouchableOpacity>
         )}
         contentContainerStyle={styles.listContent}
       />
        }
      
 
    </View>
  )
}

// import { View, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';

// export default function RecommendedPlaces({ description }) {
//   const [recData, setRecData] = useState(null);

//   useEffect(() => {
    // const fetchRecommendedPlaces = async () => {
    //   try {
    //     const response = await fetch("http://192.168.1.70:5513/api/places   ", {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ description }), // Sending the description in the body
    //     });

//         if (response.ok) {
//           const data = await response.json();
//           setRecData(data);
//         } else {
//           console.error('Error fetching recommended places:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching recommended places:', error);
//       }
//     };

//     fetchRecommendedPlaces();
//   }, [description]); // Dependency array includes `description`

//   console.log(recData);

//   return (
//     <View>
//       <Text>Recommended Places</Text>
//       {recData && recData.map((place, index) => (
//         <Text key={index}>{place.name}</Text> // Adjust this to display your data structure
//       ))}
//     </View>
//   );
// }
