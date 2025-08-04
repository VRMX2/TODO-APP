import { View, Text ,Switch} from 'react-native'
import React, { use } from 'react'
import { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
const Preferences = () => {
	const [isAutoSync, setIsAutoSync] = useState(true);
	const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
	const {colors,isDarkMode,toggleDarkMode} = useTheme();
	const stylePreferences = createSettingsStyles(colors);

    
	return (
	<LinearGradient colors = {colors.gradients.surface}
	style = {stylePreferences.section}>
		<Text style = {stylePreferences.sectionTitle}>Preferences</Text>
	<View style = {stylePreferences.settingItem}>
		<View style = {stylePreferences.settingLeft}>
		<LinearGradient colors={colors.gradients.primary} style = {stylePreferences.settingIcon}>
            <Ionicons name="moon" size={18} color="#fff"/>
		</LinearGradient>
        <Text style = {stylePreferences.settingText}>Dark Mode</Text>
        
	</View>
	<Switch
	value = {isDarkMode}
	onValueChange = {toggleDarkMode}
	thumbColor = {"#fff"}
    trackColor={{ false: colors.border, true: colors.primary }}
    ios_backgroundColor={colors.border}
	/>
	</View>



    <View style = {stylePreferences.settingItem}>
		<View style = {stylePreferences.settingLeft}>
		<LinearGradient colors={colors.gradients.warning} style = {stylePreferences.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff"/>
		</LinearGradient>
        <Text style={stylePreferences.settingText}>Notifications</Text>
	</View>
	<Switch
	value = {isNotificationsEnabled}
	onValueChange = {() => setIsNotificationsEnabled(!isNotificationsEnabled)}
	thumbColor = {"#fff"}
    trackColor={{ false: colors.border, true: colors.warning }}
    ios_backgroundColor={colors.border}
	/>
	</View>




	<View style = {stylePreferences.settingItem}>
		<View style = {stylePreferences.settingLeft}>
		<LinearGradient colors = {colors.gradients.success} style = {stylePreferences.settingIcon}>
			<Ionicons name = "notifications" size = {18} color = "#fff"/>
		</LinearGradient>
        <Text style={stylePreferences.settingText}>Auto Sync</Text>
	</View>
	<Switch
	value = {isAutoSync}
	onValueChange = {() => setIsAutoSync(!isAutoSync)}
	thumbColor = {"#fff"}
	trackColor = {{ false: colors.border, true: colors.success }}
	ios_backgroundColor = {colors.border}
	/>
	</View>
	</LinearGradient>
  )
}

export default Preferences