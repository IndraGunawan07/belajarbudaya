import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from '../auth-guard.service';

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../home/home.module").then((m) => m.HomePageModule),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "level1",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../quiz/level1/level1.module").then(
                (m) => m.Level1PageModule
              ),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../aboutus/aboutus.module").then(
                (m) => m.AboutusPageModule
              ),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../settings/settings.module").then(
                (m) => m.SettingsPageModule
              ),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(
                (m) => m.ProfilePageModule
              ),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "medals",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../medals/medals.module").then(
                (m) => m.MedalsPageModule
              ),
            canActivate: [AuthGuardService]
          },
        ],
      },
      {
        path: "explanation",
        loadChildren: () =>
          import("../quiz/explanation/explanation.module").then(
            (m) => m.ExplanationPageModule
          ),
        canActivate: [AuthGuardService]
      },
      {
        path: "level-clear",
        loadChildren: () =>
          import("../quiz/level-clear/level-clear.module").then(
            (m) => m.LevelClearPageModule
          ),
        canActivate: [AuthGuardService]
      },
      {
        path: "levellose",
        loadChildren: () =>
          import("../quiz/levellose/levellose.module").then(
            (m) => m.LevellosePageModule
          ),
        canActivate: [AuthGuardService]
      },
      { path: "", redirectTo: "/home", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
