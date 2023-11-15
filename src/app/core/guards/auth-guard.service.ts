import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }
    canActivate() {
        const isAuthorited = this.authService.isAuthorited();
        if (!isAuthorited) {
            this.authService.signOut();
            this.router.navigateByUrl("login");
        }
        return isAuthorited;
    }

}
