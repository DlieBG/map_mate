import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private router: Router,
    ) { }

    getUser(redirect: boolean = true): string | null {
        const user = window.localStorage.getItem('map_mate_user');

        if (redirect && !user)
            this.router.navigate(['/']);

        return user;
    }

    setUser(user: string) {
        window.localStorage.setItem('map_mate_user', user);
    }

    resetUser() {
        window.localStorage.removeItem('map_mate_user');
    }

}
