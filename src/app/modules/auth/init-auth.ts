import { AuthService } from "./services/auth.service";

export function initApp(authService: AuthService) {
  return () => {
    if (!authService.isAuthenticated()) {
      authService.logout();
    }
  };
}
