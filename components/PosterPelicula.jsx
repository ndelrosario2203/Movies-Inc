import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import CalificarPelicula from './CalificarPelicula.jsx'

const PosterPelicula = ({ idPelicula, enlacePelicula, titulo, fechaSalida, valoracion, navigation }) => {

  const url = enlacePelicula
    ? `https://image.tmdb.org/t/p/w500${enlacePelicula}`
    : "https://via.placeholder.com/200x300?text=Sin+Imagen";

  return (
    <View style={styles.movieCard}>
      <TouchableOpacity
        key={idPelicula}
        onPress={() => navigation.navigate("Detalles", { movieId: idPelicula })}
      >
        <Image
          source={{ uri: url }}
          style={styles.PosterPelicula}
        />
        <Text style={styles.movieTitle}>{titulo}</Text>
        <Text style={styles.movieReleaseDate}>Fecha de salida: {fechaSalida}</Text>
        <Text style={styles.movieRating}>Valoración: {valoracion}</Text>
      </TouchableOpacity>

      <CalificarPelicula idPelicula={idPelicula} titulo={titulo} />
    </View>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  PosterPelicula: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  movieReleaseDate: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  movieRating: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default PosterPelicula;