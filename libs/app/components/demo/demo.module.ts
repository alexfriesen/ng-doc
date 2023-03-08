import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgDocCodeModule} from '@ng-doc/app/components/code';
import {NgDocDemoDisplayerModule} from '@ng-doc/app/components/demo-displayer';
import {NgDocIconModule, NgDocTabGroupModule, NgDocTextModule} from '@ng-doc/ui-kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {NgDocDemoComponent} from './demo.component';

@NgModule({
	declarations: [NgDocDemoComponent],
	imports: [
		CommonModule,
		NgDocTabGroupModule,
		NgDocCodeModule,
		NgDocIconModule,
		NgDocTextModule,
		PolymorpheusModule,
		NgDocDemoDisplayerModule,
	],
	exports: [NgDocDemoComponent],
})
export class NgDocDemoModule {}
