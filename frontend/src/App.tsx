import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Loading...</div>;
  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={auth.isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
