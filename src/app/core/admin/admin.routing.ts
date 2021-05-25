import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { IventoryListComponent } from './iventory-list/iventory-list.component';
import { IventoryItemManagementComponent } from './iventory-item-management/iventory-item-management.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'redemption',
                component: RedemptionComponent
            },
            {
                path: 'iventory',
                children: [
                    {
                        path: 'list',
                        component: IventoryListComponent
                    },
                    {
                        path: 'item-management',
                        component: IventoryItemManagementComponent
                    }
                ]
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    }
                ]
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ]
    }
]