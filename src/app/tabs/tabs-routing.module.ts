import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
          },
        ],
      },
      {
        path: "explanation",
        loadChildren: () =>
          import("../quiz/explanation/explanation.module").then(
            (m) => m.ExplanationPageModule
          ),
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
