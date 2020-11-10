import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./login/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "splash",
    loadChildren: () =>
      import("./login/splash/splash.module").then((m) => m.SplashPageModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
  {
    path: "level3",
    loadChildren: () =>
      import("./quiz/level3/level3.module").then((m) => m.Level3PageModule),
  },
  {
    path: "level1",
    loadChildren: () =>
      import("./quiz/level1/level1.module").then((m) => m.Level1PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
