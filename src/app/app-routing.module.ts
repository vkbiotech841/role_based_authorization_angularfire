import { DefineRoleComponent } from './define-role/define-role.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';
import { CanReadGuard } from './guards/can-read.guard';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'content',
    component: SubscriberPageComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'secret',
    component: SuperSecretComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'content/blog-details/:blogId',
    component: BlogDetailsComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'define-role',
    component: DefineRoleComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
