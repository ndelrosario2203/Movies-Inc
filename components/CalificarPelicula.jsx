import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CalificarPelicula = ({ idPelicula, titulo }) => {
  const [valoracion, setValoracion] = useState(0); 
  const [calificado, setcalificado] = useState(false); 

  const API_URL = `https://api.themoviedb.org/3/movie/${idPelicula}/rating`;
  const API_KEY = "bfd9fa3cf704fc798a90a90ca8805ec4";

  const actualizarValoracion = (newvaloracion) => {
    if (calificado) {
      Alert.alert("Ya has votado", "No puedes volver a calificar esta película.");
      return;
    }

    setValoracion(newvaloracion);

    fetch(`${API_URL}?api_key=${API_KEY}`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `'{"value:"${newvaloracion * 2}}'`,
    })
      .then((response) => {
        if (response.ok) {
          setcalificado(true);
          Alert.alert("¡Gracias!", `Has calificado "${titulo}" con ${newvaloracion} estrellas.`);
        } else {
          Alert.alert("Error", "No se pudo enviar tu calificación. Intenta nuevamente.");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la calificación:", error);
        Alert.alert("Error", "No se pudo enviar tu calificación. Verifica tu conexión.");
      });
  };

  return (
    <View style={styles.valoracionContainer}>
      <Text style={styles.textoValoracion}>Califica esta película:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => actualizarValoracion(star)}
            disabled={calificado}
          >
            <FontAwesome
              name={star <= valoracion ? "star" : "star-o"}
              size={30}
              color={star <= valoracion ? "#FFD700" : "#ccc"}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  valoracionContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  textoValoracion: {
    fontSize: 16,
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
  },
  starIcon: {
    marginHorizontal: 5,
  },
});

export default CalificarPelicula;