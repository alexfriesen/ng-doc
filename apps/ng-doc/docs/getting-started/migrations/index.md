# {{ NgDocPage.title }}

This page contains information about migrating from previous versions of NgDoc to the current
version.

## Migration to >= v16.13

In v16.13.0 all NgModules were removed. Application configuration was changed.
This was done to simplify API and add more flexibility to the application, now Application will
use only components that YOU provided and nothing else which will reduce the size of the final
bundle for applications that don't use all features of NgDoc or want to customize it.

Now you can replace page components such as breadcrumbs, page navigation at the bottom of the page,
or table of contents with your own components, or even remove them completely.

NgDoc's schematics now also support standalone applications.

- `NgDocSidebarModule`, `NgDocNavbarModule` were removed, now you need to import
  `NgDocSidebarComponent`, `NgDocNavbarComponent`.
- `NgDocModule`, `NgDocUiKitRootModule` were removed, all configurations can
  be provided by using `provideNgDocApp` function.
- `NgDocGeneratedModule` was removed, now you need to use `provideNgDocContext` function to provide
  context of the generated documentation.
- `provideMainPageProcessor` and `providePageSkeleton` functions were added, now you must use them to
  provide default or your own page processors and page skeleton components.

Please see updated `*GettingStartedInstallation#configuring-application` articles for more information how your
application should be configured.

###

## Migrating to >= v16.3

In v16.3.0, new standalone pages were introduced. Now you don't need `ng-doc.dependencies.ts` file
or `NgModule` anymore, all dependencies can be imported directly in the `ng-doc.page.ts` file.

To migrate from previous versions, you need to run the following command:

```bash
ng g @ng-doc/builder:standalone-pages-migration
```

This command will remove `ng-doc.dependencies.ts` file and update all `ng-doc.page.ts` files
by importing all dependencies directly.
