import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//for getting the data we use query but for the rest methods we use mutation
export const apiSlice = createApi({
    reducerPath: "api", // unique key to store reducer state, its a default 
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes:['Todos'],
    endpoints:(builder)=>({
        //its a get method ,we're getting all of the todos
        getTodos:builder.query({
            // query:()=>'/todos',---->this is an anonymous function
            query:()=>'/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodo:builder.mutation({
            //the todo present below is the new todo we're receiving and now we're posting that data to the db
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo:builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice


/*In RTK Query, tagTypes, providesTags, and invalidatesTags are used to define cache behavior and relationships between queries and mutations. They are part of the caching configuration that allows you to customize how data is stored and invalidated in the cache.

tagTypes:

tagTypes are used to define custom tag types that can be associated with queries or mutations.
You can use tagTypes to group related queries and mutations together, enabling more granular cache management.*/

/*providesTags:it is used when we're receiving the data

providesTags is used to specify the tags associated with the data returned by a query or mutation.
When a query or mutation returns data, RTK Query automatically associates the specified tags with that data in the cache.*/

/*invalidatesTags:it is used when the cached data is needed to ube updated after the post 

invalidatesTags is used to specify the tags that should be invalidated when a mutation is executed.
When a mutation is executed, RTK Query automatically invalidates the specified tags in the cache, ensuring that any data associated with those tags is removed or updated as needed.*/

/*You can use providesTags and invalidatesTags in your queries and mutations to define cache relationships and manage cache invalidation behavior.*/