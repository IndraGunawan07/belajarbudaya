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
  //   path: "level3",
  //   loadChildren: () =>
  //     import("./quiz/level3/level3.module").then((m) => m.Level3PageModule),
  // },
  // {
  //   path: "aboutus",
  //   loadChildren: () =>
  //     import("./aboutus/aboutus.module").then((m) => m.AboutusPageModule),
  // },
  // {
  //   path: "explanation",
  //   loadChildren: () =>
  //     import("./quiz/explanation/explanation.module").then(
  //       (m) => m.ExplanationPageModule
  //     ),
  // },
  // {
  //   path: "level-clear",
  //   loadChildren: () =>
  //     import("./quiz/level-clear/level-clear.module").then(
  //       (m) => m.LevelClearPageModule
  //     ),
  // },
  // {
  //   path: "levellose",
  //   loadChildren: () =>
  //     import("./quiz/levellose/levellose.module").then(
  //       (m) => m.LevellosePageModule
  //     ),
  // },
  // {
  //   path: 'level2',
  //   loadChildren: () => import('./quiz/level2/level2.module').then( m => m.Level2PageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
