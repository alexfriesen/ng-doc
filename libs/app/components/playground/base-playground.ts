import {
	ChangeDetectorRef,
	Directive,
	inject,
	Input,
	OnInit,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { Constructor, extractFunctionDefaults } from '@ng-doc/core';
import { NgDocPlaygroundConfig } from '@ng-doc/core/interfaces';

import { NgDocPlaygroundComponent } from './playground.component';

/**
 * Base class for playgrounds components.
 */
@Directive()
export abstract class NgDocBasePlayground implements Pick<NgDocPlaygroundConfig, 'data'>, OnInit {
	static readonly selector: string = 'unknown';
	abstract readonly playground?: Type<any>;
	abstract readonly viewContainerRef?: ViewContainerRef;
	abstract readonly configData: Record<string, unknown>;

	@Input()
	properties: Record<string, any> = {};

	@Input()
	actionData: Record<string, unknown> = {};

	@Input()
	content: any = {};

	defaultValues: Record<string, unknown> = {};

	private playgroundContainer: NgDocPlaygroundComponent = inject(NgDocPlaygroundComponent);
	private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	protected constructor(private playgroundInstance?: Constructor<unknown>) {
		this.changeDetectorRef.detach();
	}

	ngOnInit(): void {
		/*
		 * Extract default values from playground properties. We do this in `ngOnInit` because in this case
		 * input values provided from the template are not initialized yet, and we can read default values instead.
		 */
		if (this.playground) {
			this.defaultValues = Object.keys(this.playground).reduce(
				(values: Record<string, unknown>, key: string) => {
					if (this.playground) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						values[key] = this.playground[key];
					}

					return values;
				},
				{},
			);
		} else if (this.playgroundInstance) {
			const defaults = extractFunctionDefaults(this.playgroundInstance.prototype.transform);

			this.defaultValues = Object.keys(this.playgroundContainer.properties ?? {}).reduce(
				(def: Record<string, unknown>, key: string, i: number) => {
					// we do +1 because the first argument is the `value` of the transform function
					def[key] = defaults[i + 1];

					return def;
				},
				{},
			);
		} else {
			throw new Error('Playground is not defined or initialized');
		}

		if (!this.playgroundContainer.defaultValues) {
			this.playgroundContainer.defaultValues = this.defaultValues;
		}

		/*
             This is a hack just to wait for the playground container to be initialized and only then
             attach the change detector to have correct inputs values.
         */
		Promise.resolve().then(() => {
			this.changeDetectorRef.reattach();
		});
	}

	get data(): any {
		return Object.assign({}, this.configData, this.actionData);
	}
}
