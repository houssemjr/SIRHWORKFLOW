// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    // Check if user is logged in
    if (!this.authService.isUserLoggedIn()) {
      // If not logged in, redirect to the login page
      return this.router.createUrlTree(['/login']);
    }
    
    // Check if the route has data containing expected roles
    const expectedRoles = route.data['expectedRoles'] as string[]; // Type assertion here
    if (expectedRoles && !this.authService.userHasRoles(expectedRoles)) {
      console.log(expectedRoles);
      // If user doesn't have the required roles for this route, redirect to unauthorized page
      return this.router.createUrlTree(['/unauthorized']);
    }
    
    // If the user is logged in and has the required roles, allow access
    return true;
  }
}
