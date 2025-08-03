import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
const TodoInput = () => {
	const {colors} = useTheme();
	const HomeStyle = createHomeStyles(colors);
	const [newTodo, setNewTodo] = useState('');
    const addTodo = useMutation(api.todos.addTodos);
	const handleAddTodos = async () => {
		if (newTodo.trim()){
			try{
                await addTodo({text: newTodo.trim()});
                setNewTodo('');
			}catch(error){
                console.error("Error adding todo:", error);
				Alert.alert("Error", "Failed to add todo. Please try again.");
            }

		}
	}
	return (
	<View style = {HomeStyle.inputSection}>
		<View style = {HomeStyle.inputWrapper}>
			<TextInput
			style = {HomeStyle.input}
			placeholder = 'what needs to be done?'
			value = {newTodo}
			onChangeText = {setNewTodo}
			onSubmitEditing = {handleAddTodos}
			placeholderTextColor = {colors.textMuted}
			/>
			<TouchableOpacity onPress = {handleAddTodos} activeOpacity = {0.8} disabled = {!newTodo.trim()}>
                <LinearGradient colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[HomeStyle.addButton,!newTodo.trim() && HomeStyle.addButtonDisabled]}>
                    <Ionicons name="add" size={24} color="#ffffff" />
                </LinearGradient>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput