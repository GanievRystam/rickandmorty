import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import chatReducer from './chat/chatSlice';

// Функция для загрузки состояния чата из localStorage
const loadChatState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) return undefined;
    const parsed = JSON.parse(serializedState);
    // Возвращаем только chat, остальное undefined
    return parsed && parsed.chat ? parsed.chat : undefined;
  } catch (e) {
    return undefined;
  }
};

// Создаём store без preloadedState
export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    chat: chatReducer,
  },
});

// После инициализации store, если есть сохранённый chat, диспатчим его в store
const preloadedChat = loadChatState();
if (preloadedChat) {
  // setMessages - экшен из chatSlice для установки сообщений
  // setLoading - экшен для установки isLoading
  // Импортировать их здесь:
  // import { setMessages, setLoading } from './chat/chatSlice';
  // Но чтобы избежать циклических импортов, можно сделать так:
  store.dispatch({
    type: 'chat/setMessages',
    payload: preloadedChat.messages || [],
  });
  store.dispatch({
    type: 'chat/setLoading',
    payload: preloadedChat.isLoading || false,
  });
}

// Функция для сохранения состояния чата в localStorage
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      chat: state.chat,
    });
    localStorage.setItem('chatState', serializedState);
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
};

// Подписка на изменения store и сохранение только состояния чата
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*
  === Как использовать в компоненте? ===

  1. Получить данные из store (например, сообщения чата):

    import { useSelector } from 'react-redux';
    const messages = useSelector((state: RootState) => state.chat.messages);

  2. Диспатчить экшены:

    import { useDispatch } from 'react-redux';
    import { addMessage } from './chat/chatSlice';

    const dispatch = useDispatch<AppDispatch>();
    dispatch(addMessage({ ... }));

  3. После обновления чата, состояние автоматически сохранится в localStorage.
     При следующей загрузке страницы чат восстановится из localStorage.

  4. Оберните приложение в ReduxProvider (см. ./Provider.tsx):

    import ReduxProvider from './store/Provider';

    <ReduxProvider>
      <App />
    </ReduxProvider>
*/