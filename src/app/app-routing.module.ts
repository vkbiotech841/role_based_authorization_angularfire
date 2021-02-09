import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';
import { CanReadGuard } from './can-read.guard';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { AdminGuard } from './admin.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
