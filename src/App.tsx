
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Plants from "./pages/Plants";
import PlantDetail from "./pages/PlantDetail";
import Techniques from "./pages/Techniques";
import Community from "./pages/Community";
import Challenges from "./pages/Challenges";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import PlantIdentification from "./pages/PlantIdentification";
import GardenPlanner from "./pages/GardenPlanner";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/core';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

const App = () => {
  // Handle back button for mobile apps
  useEffect(() => {
    const handleBackButton = () => {
      // Custom back button logic here
      console.log("Back button pressed");
    };

    if (window.Capacitor) {
      CapacitorApp.addListener('backButton', handleBackButton);
    }

    return () => {
      if (window.Capacitor) {
        CapacitorApp.removeAllListeners();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route 
              path="/plants" 
              element={
                <PrivateRoute>
                  <Plants />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/plants/:id" 
              element={
                <PrivateRoute>
                  <PlantDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/techniques" 
              element={
                <PrivateRoute>
                  <Techniques />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/community" 
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/challenges" 
              element={
                <PrivateRoute>
                  <Challenges />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/journal" 
              element={
                <PrivateRoute>
                  <Journal />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/identify" 
              element={
                <PrivateRoute>
                  <PlantIdentification />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/garden-planner" 
              element={
                <PrivateRoute>
                  <GardenPlanner />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
