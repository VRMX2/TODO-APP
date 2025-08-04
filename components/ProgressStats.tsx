import { View, Text } from 'react-native'
import React from 'react'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import useTheme from '@/hooks/useTheme'
import { useQuery } from 'convex/react'
import {api} from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
const ProgressStats = () => {
	const {colors} = useTheme();
	const SettingsStyle = createSettingsStyles(colors);
	const todos = useQuery(api.todos.getTodos);
	const totalTodos = todos ? todos.length : 0;
	const completedTodos = todos ? todos.filter(todo => todo.isCompleted).length : 0;
    const pendingTodos = totalTodos - completedTodos;


	return (
	<LinearGradient colors = {colors.gradients.surface}
    style={SettingsStyle.section}>
		<Text style = {SettingsStyle.sectionTitle}>Progress Stats</Text>
		<LinearGradient colors = {colors.gradients.background}
	style = {[SettingsStyle.statCard, {borderLeftColor: colors.primary}]}>
		<View style = {SettingsStyle.statIconContainer}>
			<LinearGradient colors = {colors.gradients.primary} style = {SettingsStyle.statIcon}>
                <Ionicons name="list" size={20} color="#fff"/>
            </LinearGradient>
		</View>
		<View>
			<Text style={SettingsStyle.statNumber}>{totalTodos}</Text>
			<Text style={SettingsStyle.statLabel}>Total Todos</Text>
        </View>
	</LinearGradient>
	<LinearGradient colors = {colors.gradients.background}
	style = {[SettingsStyle.statCard, {borderLeftColor: colors.success}]}>
		<View style = {SettingsStyle.statIconContainer}>
			<LinearGradient colors = {colors.gradients.success} style = {SettingsStyle.statIcon}>
				<Ionicons name = "checkmark-circle" size = {20} color = "#fff"/>
            </LinearGradient>
		</View>
		<View>
			<Text style={SettingsStyle.statNumber}>{completedTodos}</Text>
			<Text style={SettingsStyle.statLabel}>Completed</Text>
        </View>
	</LinearGradient>
	<LinearGradient colors = {colors.gradients.background}
	style = {[SettingsStyle.statCard, {borderLeftColor: colors.warning}]}>
		<View style = {SettingsStyle.statIconContainer}>
			<LinearGradient colors = {colors.gradients.warning} style = {SettingsStyle.statIcon}>
                <Ionicons name="time" size={20} color="#fff"/>
            </LinearGradient>
		</View>
		<View>
			<Text style = {SettingsStyle.statNumber}>{pendingTodos}</Text>
			<Text style={SettingsStyle.statLabel}>Active</Text>
        </View>
    </LinearGradient>
	</LinearGradient>
	)
}

export default ProgressStats