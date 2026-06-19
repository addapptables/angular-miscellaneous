# Changelog

All notable changes to this project will be documented in this file.

## [v7.0.1] - 2026-06-19

Highlights
- SCSS modernization for Angular/Material 19: migrated all theme styles off the
  deprecated Sass legacy API to the modern module system (`@use` / `@forward`).
- Removed every Sass deprecation warning (`@import`, `global-builtin`,
  `color-functions`, division `/`) emitted when consuming the themes under
  Angular Material 19. Verified: all six themes compile with **0 warnings**.
- Replaced the `mat-palette` / `mat-light-theme` / `angular-material-theme`
  legacy Material theming (removed in Material 19) with the M2 API
  (`mat.m2-define-palette`, `mat.m2-define-light-theme`).
- Bootstrap-style grid (`@craftsjs/core`): broke the Bootstrap 4 circular
  dependency between `_functions.scss` and `_variables.scss` so the grid can use
  pure `@use`; converted `map-get`→`map.get`, `darken`/`lighten`→`color.adjust`,
  `/`→`math.div`, etc. The grid is now also published as compiled CSS at
  `@craftsjs/core/craftsjs-grid.theme.css`.
- Fixed `@craftsjs/menu-admin` which relied on global scope leakage from the
  grid (`$border-radius`, `media-breakpoint-down`); it is now self-contained.
- Build pipeline: replaced `scss-bundle` (which does not understand `@use`)
  with a `sass`-based step that ships theme partial trees and compiles the grid
  to CSS (`compile-scss.js`).
- Documentation: README theming sections updated to the modern `@use` + M2 API.

Upgrade instructions
1. Install the v7.0.1 packages:

```bash
npm i @craftsjs/menu-admin@7.0.1 @craftsjs/core@7.0.1 @craftsjs/alert@7.0.1 @craftsjs/modal@7.0.1 @craftsjs/notifier@7.0.1 @craftsjs/card@7.0.1 @craftsjs/perfect-scrollbar@7.0.1 @craftsjs/ngrx-action@7.0.1
```

2. Update your theme setup to the modern Sass module + Material M2 API (see each
   package README). Replace `@import '~@angular/material/theming'` /
   `mat-palette` / `mat-light-theme` with `@use '@angular/material' as mat;` and
   `mat.m2-define-*`. The grid is now `@use '@craftsjs/core/craftsjs-grid.theme.css'`.

## [v7.0.0] - 2026-06-18

Highlights
- Compatibility: Upgraded the workspace and all libraries to Angular v19 (this release is the v7 line).
- Toolchain: Angular 19.2, Angular CLI 19.2, ng-packagr 19.2, TypeScript 5.6, zone.js 0.15, rxjs 7.8.
- Dependencies: `@angular/material`/`@angular/cdk` 19, `@ngrx/store` 19, `@ngx-translate/core` 16.
- Library peers bumped to `>= 19.0.0 < 20.0.0` and `rxjs >= 7.4.0 < 8.0.0`; all `@craftsjs/*` packages bumped to 7.0.0.
- Cleanup: removed legacy tooling (tslint, codelyzer, protractor, jasminewd2, eslint-plugin-deprecation) and the obsolete `enableIvy` / `ngcc` references.

Upgrade instructions
1. Install the v7 packages (compatible with Angular v19):

```bash
npm i @craftsjs/menu-admin@7.x @craftsjs/core@7.x @craftsjs/alert@7.x @craftsjs/modal@7.x @craftsjs/notifier@7.x @craftsjs/card@7.x @craftsjs/perfect-scrollbar@7.x @craftsjs/ngrx-action@7.x
```

2. Ensure your app runs on Angular 19, TypeScript 5.6 and rxjs 7.

## [v6.0.0] - 2025-08-20

Highlights
- Compatibility: Updated packages and documentation for Angular v18 (this release is the v6 line).
- Menu behavior: when one menu-group opens, others are closed (menu-group/menu.service updates).
- Documentation: README files updated across packages to reflect the new version mapping.

Commits included
- a3c9016 2025-08-20 — feat: update documentation (#52)
- e9e8563 2025-08-20 — Feature/update angular version (#51)
- 64f394f 2023-03-03 — feat: solved problem modal

Files changed (high level)
- README.md (root)
- package.json
- projects/craftsjs/*/README.md (alert, core, menu-admin, modal, notifier, perfect-scrollbar, card, ngrx-action)
- projects/craftsjs/*/package.json updates
- projects/craftsjs/menu-admin/src/lib/components/menu-items-link/components/menu-group/menu-group.component.ts
- projects/craftsjs/menu-admin/src/lib/services/menu.service.ts
- several theme scss files

Notes
- Tag `v6.0.0` has been created and pushed to origin.
- If you want a GitHub Release entry, you can copy the section above into the release body.

Upgrade instructions
1. Install the v6 packages (compatible with Angular v18):

```bash
npm i @craftsjs/menu-admin@6.x @craftsjs/core@6.x @craftsjs/alert@6.x @craftsjs/modal@6.x @craftsjs/notifier@6.x @craftsjs/card@6.x @craftsjs/perfect-scrollbar@6.x @craftsjs/ngrx-action@6.x
```

2. Build the libraries locally (if developing):

```powershell
yarn build:libs
```

3. Verify menu behavior: opening a group closes other open groups (desktop view). For mobile behaviour no change.

If you want, I can also:
- Create a release branch `release/v6.0.0`.
- Draft a GitHub Release using the tag `v6.0.0` (requires GH token).
