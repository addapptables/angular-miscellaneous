const path = require('path');
const fs = require('fs');
const sass = require('sass');

// Modern SCSS packaging.
//
// The previous pipeline relied on `scss-bundle`, which flattens an `@import`
// graph into a single file. That tool does NOT understand the modern Sass
// module system (`@use` / `@forward`), so it can no longer be used now that the
// themes have been migrated off the deprecated Sass/Material legacy API.
//
// New strategy:
//  - "mixin" themes (card, alert, menu, notifier, modal) are published as a
//    tree of partials. The entry file `@use`s/`@forward`s its siblings, so the
//    partials must travel with the package for the consumer to resolve them.
//  - the Bootstrap grid (core) is ALSO published as partials (so consumers can
//    `@use`/`@forward` the mixins) and, additionally, compiled to a flat
//    `craftsjs-grid.theme.css` for consumers that only need the generated
//    utility classes.

const repoRoot = __dirname;

// Themes shipped as partial trees. `root` is the folder whose SCSS tree is
// copied verbatim into `dest`.
//
//  - `mixinThemes` only need their *.theme.scss / _mixins.scss partials.
//  - the grid ships its entire SCSS tree (functions/variables/mixins/utilities)
//    because the entry `@forward`s/`@use`s every partial by name.
const partialThemes = [
  { root: 'projects/craftsjs/card/src/lib', dest: 'dist/craftsjs/card', all: false },
  { root: 'projects/craftsjs/alert/src/lib', dest: 'dist/craftsjs/alert', all: false },
  { root: 'projects/craftsjs/menu-admin/src/lib', dest: 'dist/craftsjs/menu-admin', all: false },
  { root: 'projects/craftsjs/notifier/src/lib', dest: 'dist/craftsjs/notifier', all: false },
  { root: 'projects/craftsjs/modal/src/lib', dest: 'dist/craftsjs/modal', all: false },
  { root: 'projects/craftsjs/core/src/lib/styles/grid', dest: 'dist/craftsjs/core', all: true },
];

// Themes that additionally compile to flat CSS (classes, not mixins).
const cssThemes = [
  {
    entry: 'projects/craftsjs/core/src/lib/styles/grid/_craftsjs-grid.theme.scss',
    out: 'dist/craftsjs/core/craftsjs-grid.theme.css',
  },
];

function isThemeFile(file) {
  return file.endsWith('.theme.scss') || file === '_mixins.scss';
}

function copyThemeTree(absRoot, absDest, all) {
  const entries = fs.readdirSync(absRoot, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(absRoot, entry.name);
    if (entry.isDirectory()) {
      copyThemeTree(src, path.join(absDest, entry.name), all);
    } else if (entry.isFile() && (all ? entry.name.endsWith('.scss') : isThemeFile(entry.name))) {
      fs.mkdirSync(absDest, { recursive: true });
      fs.copyFileSync(src, path.join(absDest, entry.name));
    }
  }
}

function bootstrap() {
  let failed = false;

  // 1) Copy partial trees.
  for (const theme of partialThemes) {
    const absRoot = path.resolve(repoRoot, theme.root);
    const absDest = path.resolve(repoRoot, theme.dest);
    try {
      copyThemeTree(absRoot, absDest, theme.all);
      console.log(`Copied SCSS partials: ${theme.root} -> ${theme.dest}`);
    } catch (err) {
      failed = true;
      console.error(`Failed copying ${theme.root}: ${err.message}`);
    }
  }

  // 2) Compile flat CSS themes.
  for (const theme of cssThemes) {
    const absEntry = path.resolve(repoRoot, theme.entry);
    const absOut = path.resolve(repoRoot, theme.out);
    try {
      const result = sass.compile(absEntry, {
        loadPaths: [path.resolve(repoRoot, 'node_modules')],
        style: 'expanded',
      });
      fs.mkdirSync(path.dirname(absOut), { recursive: true });
      fs.writeFileSync(absOut, result.css);
      console.log(`Compiled CSS: ${theme.entry} -> ${theme.out}`);
    } catch (err) {
      failed = true;
      console.error(`Failed compiling ${theme.entry}: ${err.message}`);
    }
  }

  if (failed) {
    process.exitCode = 1;
    console.error('compile-scss completed with errors');
  } else {
    console.log('compile-scss completed');
  }
}

bootstrap();
