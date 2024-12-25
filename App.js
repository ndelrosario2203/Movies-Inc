import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetallePelicula from "./components/DetallePelicula.jsx";
import Inicio from './components/Inicio.jsx'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="Detalles" component={DetallePelicula} options={{ title: "Detalle de las películas" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
