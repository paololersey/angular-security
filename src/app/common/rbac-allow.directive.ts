import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { intersection } from 'lodash';

import { Subscription } from "rxjs";
import { User } from "../model/user";
import { AuthService } from "../services/auth.service";

@Directive({
    selector: "[rbacAllow]"
})
export class RbacAllowDirective implements OnDestroy {


    allowedRoles: string[];
    user: User;
    subscription: Subscription;

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService) {

        this.subscription = authService.user$.subscribe(
            user => {
                this.user = user;
                this.showIfUserAllowed();
            }
        )
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();

    }

    showIfUserAllowed() {
        // check if info from the user are available, and allowed roles are present
        if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.user) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed = intersection(this.allowedRoles, this.user.roles).length > 0

        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else{
            this.viewContainer.clear();
        }
    }

}