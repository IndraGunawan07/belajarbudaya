import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getLoggedInStatus();
    if (user === false) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
