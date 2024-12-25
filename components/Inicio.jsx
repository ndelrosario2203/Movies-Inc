import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import PosterPelicula from "./PosterPelicula";
import PeliculasSimilares from "./PeliculasSimilares.jsx";

const Inicio = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarSimilar, setmostrarSimilar] = useState(false);

  const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
  const API_KEY = "bfd9fa3cf704fc798a90a90ca8805ec4";

  useEffect(() => {
    fetch(`${API_URL}?api_key=${API_KEY}&language=es-MX&page=1`)
      .then((response) => response.json())
      .then((data) => {
        const sortedMovies = data.results.sort((a, b) => a.title.localeCompare(b.title));
        setMovies(sortedMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#282c34" />
      </View>
    );
  }

  return (
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <View style={styles.buttonContainer}>
              <Button
                title={mostrarSimilar ? "Ver Ahora en Cartelera" : "Ver Películas Similares"}
                onPress={() => setmostrarSimilar(!mostrarSimilar)}
              />
            </View>

            {mostrarSimilar ? (
              <PeliculasSimilares
                movieId={movies[0]?.id}
                navigation={navigation}
              />
            ) : (
              <ScrollView contentContainerStyle={styles.movieList}>
                {movies.map((movie) => (
                  <PosterPelicula
                    key={movie.id}
                    idPelicula={movie.id}
                    enlacePelicula={movie.poster_path}
                    titulo={movie.title}
                    fechaSalida={movie.release_date}
                    valoracion={movie.vote_average}
                    navigation={navigation}
                  />
                ))}
              </ScrollView>
            )}
          </View>
          <Footer />
        </View>
      )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  movieList: {
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    margin: 15,
    alignItems: "center",
  },
});

export default Inicio;