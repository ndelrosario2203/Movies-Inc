import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from "react-native";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "bfd9fa3cf704fc798a90a90ca8805ec4";

const DetallePelicula = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${movieId}?api_key=${API_KEY}&language=es-MX&append_to_response=credits`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ha ocurrido un error al obtener las películas: ", error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#282c34" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Ocurrió un error a la hora de cargar las películas.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.titulo}>{movie.title}</Text>
      <Text style={styles.subtitulo}>Año de estreno: {new Date(movie.release_date).getFullYear()}</Text>
      <Text style={styles.subtitulo}>Géneros: {movie.genres.map((genre) => genre.name).join(", ")}</Text>
      <Text style={styles.valoracion}>Valoración: {movie.vote_average}</Text>
      <Text style={styles.resumen}>{movie.overview}</Text>
      <Text style={styles.actores}>Actores:</Text>
      {movie.credits.cast.slice(0, 10).map((actor) => (
        <Text key={actor.cast_id} style={styles.actor}>
          {actor.name} como {actor.character}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 8,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  valoracion: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  resumen: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  actorsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  actores: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});

export default DetallePelicula;
