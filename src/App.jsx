import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import ChatList from "./components/Chats/ChastList";
import ChatRoom from "./components/Chats/ChatRoom";
import Login from "./components/Auth/Login"; // ✅ Path yang benar
import Register from "./components/Auth/Register"; // ✅ Path yang benar
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <ChatList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
  );
}

export default App;
