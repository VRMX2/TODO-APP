// ─── Imports ──────────────────────────────────────────────
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { createHomeStyles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/TodoInput';
import EmptyState from '@/components/EmptyState';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import useTheme from '@/hooks/useTheme';


// ─── Types ────────────────────────────────────────────────
type Todo = Doc<'todos'>;


// ─── Component ────────────────────────────────────────────
export default function Index() {
  const { colors } = useTheme();
  const HomeStyle = createHomeStyles(colors);

  const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
  const [editingText, setEditingText] = useState('');

  const todos = useQuery(api.todos.getTodos);
  const deleteTodo = useMutation(api.todos.deleteTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const updateTodo = useMutation(api.todos.updateTodos);

  const isLoading = todos === undefined;

  // ─── Handlers ──────────────────────────────────────────────
  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = async () => {
    if (editingId && editingText.trim()) {
      try {
        await updateTodo({ id: editingId, text: editingText.trim() });
        setEditingId(null);
        setEditingText('');
      } catch (error) {
        console.error('Error updating todo:', error);
        Alert.alert('Error', 'Failed to update todo. Please try again.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleDeleteTodo = async (id: Id<'todos'>) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTodo({ id }),
        },
      ]
    );
  };

  // ─── Render Single Todo Item ──────────────────────────────
  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={HomeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={HomeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Checkbox */}
          <TouchableOpacity
            style={HomeStyle.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                HomeStyle.checkboxInner,
                { borderColor: item.isCompleted ? 'transparent' : colors.border },
              ]}
            >
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>

          {/* Todo Content */}
          {isEditing ? (
            <View style={HomeStyle.editContainer}>
              <TextInput
                style={HomeStyle.editInput}
                value={editingText}
                onChangeText={setEditingText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={HomeStyle.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={HomeStyle.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={HomeStyle.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={HomeStyle.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={HomeStyle.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={HomeStyle.todoTextContainer}>
              <Text
                style={[
                  HomeStyle.todoText,
                  item.isCompleted && {
                    textDecorationLine: 'line-through',
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>
              <View style={HomeStyle.todoActions}>
                <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={HomeStyle.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={HomeStyle.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  // ─── Loading State ───────────────────────────────────────
  if (isLoading) return <LoadingSpinner />;

  // ─── Render Screen ───────────────────────────────────────
  return (
    <LinearGradient colors={colors.gradients.background} style={HomeStyle.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={HomeStyle.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
			data = {todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id.toString()}
          style={HomeStyle.todoList}
          contentContainerStyle={HomeStyle.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
