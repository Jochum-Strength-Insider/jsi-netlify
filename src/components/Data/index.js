import React, { useReducer, useRef, useEffect, useState } from 'react';

const initialState = [
   {
      name: "test 1",
      id: 0,
      complete: false
   },
   {
      name: "test 2",
      id: 1,
      complete: false
   },
   {
      name: "test 3",
      id: 2,
      complete: false
   },
]

//eslint-disable-next-line
const Todo = (props) => {
   //hooks must be declare at the top level of our application.
   // hooks can only be called from react functions
   // Don’t call Hooks inside loops, conditions, or nested functions.
   // Don’t call Hooks from regular JavaScript functions.

   const inputRef = useRef();

   const [todos, dispatch] = useReducer(todoReducer, initialState);

   const completedTodos = todos.filter(todo => todo.complete);

   useEffect(() => {
      //runs on every render the optional dependency changes
      document.title = `${completedTodos.length} Complete!`;

      // function cleanup called on unmount
      return function cleanup() {
         document.title = "title";
      }

      //only run the effect if completedTodos.lenght changes
   }, [completedTodos.length])

   //useEffect(()=>{something; return cleanup function(){something}}, [only update if something])

   // Hooks must also be called in order they are declared because of this you can't use a hook within a condition statement. If a hook must be conditional use the condition within the useEffect / hook call.
   // useEffect(function persistForm() {
   //    // 👍 We're not breaking the first rule anymore
   //    if (name !== '') {
   //       localStorage.setItem('formData', name);
   //    }
   // });

   const addTodo = (event) => {
      event.preventDefault();
      dispatch({
         type: "ADD_TODO",
         name: inputRef.current.value,
         complete: false,
      });
      inputRef.current.value = "";
   }

   const toggleComplete = (id) => {
      dispatch({ type: "TOGGLE_COMPLETE", id })
   }

   const deleteTodo = (id) => {
      dispatch({ type: "DELETE_TODO", id });
   }

   return (
      <div className="todo-input">
         <form onSubmit={addTodo}>
            {todos.map((todo) => (
               <div key={todo.id}>
                  <div className="todo-name" style={{ textDecoration: todo.complete ? "line-through" : "none" }} onClick={() => toggleComplete(todo.id)}>{todo.name}{todo.id}</div>
                  <div className="todo-delete" onClick={() => deleteTodo(todo.id)}>
                     &times;
                  </div>
               </div>
            ))}
            <input ref={inputRef} type="search" id="add-todo" placeholder="Add Todo..." />
         </form>
      </div>
   )
}

//custom hooks - this can be stored separately and reused across the codebase.
// Custom hooks should always start with "use"
const useDocumentTitle = title => {
   useEffect(() => {
      document.title = title;
   }, [title])
}

// example

// import React, { useState, useEffect } from 'react';
// function useFriendStatus(friendID) {
//    const [isOnline, setIsOnline] = useState(null);
//    useEffect(() => {
//       function handleStatusChange(status) {
//          setIsOnline(status.isOnline);
//       }
//       ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//       return () => {
//          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//       };
//    });
//    return isOnline;
// }

//eslint-disable-next-line
const Counter = () => {
   const [count, setCount] = React.useState(0);
   const increment = () => setCount(count + 1);
   const decrement = () => setCount(count - 1);

   useDocumentTitle(count);

   return (
      <div>
         <h4>counter: {count}</h4>
         <button onClick={increment}>+</button>
         <button onClick={decrement}>-</button>
      </div>
   )
}

const todoReducer = (state, action) => {
   switch (action.type) {
      case 'ADD_TODO': {
         return (action.name.length)
            ? [...state, {
               id: state.length ? Math.max(...state.map(todo => todo.id)) + 1 : 0,
               name: action.name,
               complete: false
            }]
            : state;

      }
      case 'TOGGLE_COMPLETE': {
         return state.map((item) =>
            item.id === action.id
               ? { ...item, complete: !item.complete }
               : item
         )
      }
      case 'DELETE_TODO': {
         return state.filter((item) =>
            item.id !== action.id
         )
      }

      default: {
         return state;
      }
   }
}


const dataFetchReducer = (state, action) => {
   switch (action.type) {
      case "FETCH_INIT":
         console.log("INIT");
         return { ...state, isLoading: true, isError: false };
      case "FETCH_SUCCESS":
         console.log("Success", action.payload);
         return { ...state, isLoading: false, isError: false, data: action.payload };
      case "FETCH_FAILURE":
         console.log("Failure");
         return { ...state, isLoading: false, isError: true };
      default:
         throw new Error();
   }
};

const useDataReducer = (initialUrl, initialData) => {
   const [url, setUrl] = useState(initialUrl);

   const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
   })

   useEffect(() => {
      let didCancel = false;

      const fetchData = async () => {
         dispatch({ type: 'FETCH_INIT' });

         try {
            const result = await fetch(url);
            const json = result.json();
            const data = await json.then(data => data);
            if (!didCancel) {
               dispatch({ type: 'FETCH_SUCCESS', payload: data })
            }
         } catch (error) {
            if (!didCancel) {
               dispatch({ type: 'FETCH_FAILURE' });
            }
         }
      };
      fetchData();

      return () => {
         didCancel = true;
      }
   }, [url]);

   return [state, setUrl];
}

// const useData = (initialUrl, initialData) => {
//    const [data, setData] = useState(initialData);
//    const [url, setUrl] = useState(initialUrl);
//    const [isLoading, setIsLoading] = useState(false);
//    const [isError, setIsError] = useState(false);
//    useEffect(() => {
//       const fetchData = async () => {
//          setIsError(false);
//          setIsLoading(true);
//          try {
//             const result = await fetch(url);
//             const data = result.json()
//             data.then(data => setData(data));
//          } catch (error) {
//             setIsError(true);
//          }
//          setIsLoading(false);
//       };
//       fetchData();
//    }, [url]);
//    return [{ data, isLoading, isError }, setUrl];
// }

// Fetching data with hooks
//eslint-disable-next-line
const Data = () => {
   // const [data, setData] = React.useState({ hits: [] });
   const [query, setQuery] = React.useState("redux");
   // const [url, setUrl] = React.useState("https://hn.algolia.com/api/v1/search?query=redux");
   // const [isLoading, setIsLoading] = React.useState(false);
   // const [isError, setIsError] = React.useState(false);

   const [{ data, isLoading, isError }, doFetch] = useDataReducer(
      'https://hn.algolia.com/api/v1/search?query=redux',
      { hits: [] },
   );

   // useEffect(() => {
   //    console.log("useEffect triggered");
   //    setIsError(false);
   //    setIsLoading(true);

   //    try {
   //       fetch(url)
   //          .then(response => response.json())
   //          .then(json => {
   //             setData(json);
   //             setIsLoading(false);
   //          });
   //    } catch {
   //       setIsError(true);
   //       setIsLoading(false);
   //    }

   //    // forgetting the [] creates a really nasty bug where the fetch is called on every component update
   //    // aka after every fetch call
   //    // aka forever
   //    // using an empty array is similar to componentDidMount()
   // }, [url]);

   return (
      <>
         <form onSubmit={(e) => {
            // setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
            doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
            e.preventDefault();
         }}
         >
            <input
               type="text"
               value={query}
               onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
         </form>

         {isLoading ?
            <div>Loading...</div> : (<ul>
               {data.hits.map(item => (
                  <li key={item.objectID}>
                     <a href={item.url}>{item.title}</a>
                  </li>
               ))}
            </ul>)}

         {isError && <div>Something went wrong ...</div>}
      </>
   )
}

export default Data;
