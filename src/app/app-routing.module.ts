import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "splash",
    pathMatch: "full",
  },
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  // {
  //   path: "home",
  //   loadChildren: () =>
  //     import("./home/home.module").then((m) => m.HomePageModule),
  // },
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
    path: "add-question",
    loadChildren: () =>
      import("./add-question/add-question.module").then(
        (m) => m.AddQuestionPageModule
      ),
  },

  // {
  //   path: "settings",
  //   loadChildren: () =>
  //     import("./settings/settings.module").then((m) => m.SettingsPageModule),
  // },
  // {
  //   path: "profile",
  //   loadChildren: () =>
  //     import("./profile/profile.module").then((m) => m.ProfilePageModule),
  // },
  // {
  //   path: "aboutus",
  //   loadChildren: () =>
  //     import("./aboutus/aboutus.module").then((m) => m.AboutusPageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
