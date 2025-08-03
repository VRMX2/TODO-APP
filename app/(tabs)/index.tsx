import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';

export default function Index() {
	const {toggleDarkMode,colors} = useTheme();

  const HomeStyle = createHomeStyles(colors);

	return (
	<LinearGradient colors = {colors.gradients.background} style = {HomeStyle.container} >
      <StatusBar barStyle={colors.statusBarStyle}/>
	<SafeAreaView style = {HomeStyle.safeArea}>
		<Header />
		<TouchableOpacity onPress = {toggleDarkMode}><Text>toggle the mode</Text></TouchableOpacity>
	</SafeAreaView>
  </LinearGradient>
  );
}


