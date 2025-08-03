import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getTodos = query({
	args: {},
    handler: async (ctx) => {
	const todos = await ctx.db.query('todos').order('desc').collect();
	return todos;
}});


export const addTodos = mutation({
    args:{text:v.string()},
	handler: async(ctx,args) => {
		const todoId = await ctx.db.insert('todos', {
			text: args.text,
			isCompleted: false
		});
		return todoId;
	},
});

export const toggleTodos = mutation({
	args: {id: v.id('todos')},
	handler: async (ctx, args) => {
		const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new Error('Todo not found');
        }
		await ctx.db.patch(args.id, {
			isCompleted: !todo.isCompleted
        });
	},
});

export const deleteTodos = mutation({
	args: {id: v.id('todos')},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const updateTodos = mutation({
	args: {
		id: v.id('todos'),
        text:v.string(),},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, {
			text: args.text,
		});
	},
});

export const deleteAllTodos = mutation({
	handler: async (ctx, args) => {
		const todos = await ctx.db.query('todos').collect();

		for(const todo of todos){
            await ctx.db.delete(todo._id);
		}
        return {deleteCount: todos.length}
	},
});


export const toggleTodo = mutation({
	args: { id: v.id('todos') },
	handler: async (ctx, args) => {
		const todo = await ctx.db.get(args.id);
		if (!todo) {
			throw new Error('Todo not found');
		}
		await ctx.db.patch(args.id, {
			isCompleted: !todo.isCompleted
		});
	},
})
