import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedeemComponent } from './redeem/redeem.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'redeem',
                component: RedeemComponent
            },
        ]
    }
]