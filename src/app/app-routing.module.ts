import { BlogCollectionComponent } from './blog-collection/blog-collection.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { LoginComponent } from './login/login.component';
import { DefineRoleComponent } from './define-role/define-role.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CanReadGuard } from './guards/can-read.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'content',
    component: BlogCollectionComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'secret',
    component: CreateBlogComponent,
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
