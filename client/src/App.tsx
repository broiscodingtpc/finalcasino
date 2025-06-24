import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Casino from "@/pages/casino";
import Whitepaper from "@/pages/whitepaper";
import Legal from "@/pages/legal";
import AboutToken from "@/pages/about-token";
import IsThisGambling from "@/pages/is-this-gambling";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/casino" component={Casino} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/legal" component={Legal} />
      <Route path="/about-token" component={AboutToken} />
      <Route path="/is-this-gambling" component={IsThisGambling} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
