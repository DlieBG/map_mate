import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    getUser(): string | null {
        return window.localStorage.getItem('map_mate_user');
    }

    setUser(user: string) {
        window.localStorage.setItem('map_mate_user', user);
    }

    resetUser() {
        window.localStorage.removeItem('map_mate_user');
    }

}
