import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorPublicPage from "./pages/CreatorPublicPage";
import SuccessStory from "./pages/SuccessStory";
import SuccessStories from "./pages/SuccessStories";
import CreatorDirectory from "./pages/CreatorDirectory";
import CoursesCatalog from "./pages/CoursesCatalog";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/creators" element={<CreatorDirectory />} />
          <Route path="/stories" element={<SuccessStories />} />
          <Route path="/courses" element={<CoursesCatalog />} />
          <Route path="/creator/:creatorId" element={<CreatorPublicPage />} />
          <Route path="/public/:creatorId" element={<CreatorPublicPage />} />
          <Route path="/story/:storyId" element={<SuccessStory />} />
          <Route path="/course/:courseSlug" element={<CourseDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
