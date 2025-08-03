import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useQuery } from 'convex/react';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
	const { colors } = useTheme();
	const HomeStyles = createHomeStyles(colors);
	const todos = useQuery(api.todos.getTodos);
	const completedTodos = todos ? todos.filter(todo => todo.isCompleted).length : 0;
	const totalTodos = todos ? todos.length : 0;
	const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

	return (
		<View style={HomeStyles.header}>
			<View style={HomeStyles.titleContainer}>
				<LinearGradient colors={colors.gradients.primary} style={HomeStyles.iconContainer}>
					<Ionicons name="flash-outline" size={28} color="#ffffff" />
				</LinearGradient>

				<View style={HomeStyles.titleTextContainer}>
					<Text style = {HomeStyles.title}>Today&apos; s Tasks 👀</Text>
					<Text style={HomeStyles.subtitle}>{completedTodos} of {totalTodos} completed</Text>
				</View>
			</View>

			{true && (
				<View style={HomeStyles.progressContainer}>
					<View style={HomeStyles.progressBarContainer}>
						<View style={HomeStyles.progressBar}>
							<LinearGradient
								colors={colors.gradients.success}
								style={[HomeStyles.progressFill, { width: `${progress}%` }]}
							/>
						</View>
						<Text style={HomeStyles.progressText}>{Math.round(progress)}%</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default Header;
