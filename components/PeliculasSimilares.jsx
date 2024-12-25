import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from "react-native";
import PosterPelicula from "./PosterPelicula";

const PeliculasSimilares = ({ movieId, navigation }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar`;
  const API_KEY = "bfd9fa3cf704fc798a90a90ca8805ec4";

  useEffect(() => {
    // Fetch películas similares
    fetch(`${API_URL}?api_key=${API_KEY}&language=es-MX&page=1`)
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching similar movies:", error);
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

  return (
    <ScrollView contentContainerStyle={styles.movieList}>
      {similarMovies.map((movie) => (
        <View key={movie.id} style={styles.movieCard}>
          <PosterPelicula
            idPelicula={movie.id}
            enlacePelicula={movie.poster_path}
            titulo={movie.title}
            fechaSalida={movie.release_date}
            valoracion={movie.vote_average}
            navigation={navigation}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  movieList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center", 
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movieCard: {
    marginBottom: 20,
    alignItems: "center",
  },
});

export default PeliculasSimilares;