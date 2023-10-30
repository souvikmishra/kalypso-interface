import type {
	IChartApi,
	IPriceLine,
	IPriceScaleApi,
	ISeriesApi,
	ITimeScaleApi,
	SeriesType
} from 'lightweight-charts';
import type { PriceLineActionResult, PriceLineParams } from './lines';
import type { Reference } from './utils';
import type { PriceScaleActionResult, PriceScaleParams } from './price-scale';
import type { TimeScaleActionResult, TimeScaleParams } from './time-scale';
import type { SeriesActionResult, SeriesParams } from './series';

import { afterUpdate, getContext, onMount, setContext } from 'svelte';
import { series } from './series';
import { line } from './lines';
import { timeScale } from './time-scale';
import { priceScale } from './price-scale';

export type Context = IChartApi | ISeriesApi<SeriesType>;

export function context<T extends Context>(value: T): void;
export function context<T extends Context>(): T;
export function context<T extends Context>(value?: T): T | void {
	if (typeof value !== 'undefined') {
		setContext('lightweight-chart-context', value);
	} else {
		return getContext<T>('lightweight-chart-context');
	}
}

export function useSeriesEffect<T extends SeriesParams>(
	callback: () => [params: T, ref: Reference<ISeriesApi<T['type']>> | undefined]
): void {
	let subject: SeriesActionResult<T> | null = null;

	const api = context<IChartApi>();

	onMount(() => {
		const [params] = callback();
		subject = series(api, params);

		return () => {
			subject?.destroy();
			subject = null;
		};
	});

	afterUpdate(() => {
		const [params, ref] = callback();
		subject?.update(params);
		subject?.updateReference(ref);
	});
}

export function useLineEffect(
	callback: () => [params: PriceLineParams, ref: Reference<IPriceLine> | undefined]
): void {
	let subject: PriceLineActionResult | null = null;

	const api = context<ISeriesApi<SeriesType>>();

	onMount(() => {
		const [params] = callback();
		subject = line(api, params);

		return () => {
			subject?.destroy();
			subject = null;
		};
	});

	afterUpdate(() => {
		const [params, ref] = callback();
		subject?.update(params);
		subject?.updateReference(ref);
	});
}

export function useTimeScaleEffect(
	callback: () => [params: TimeScaleParams, ref: Reference<ITimeScaleApi> | undefined]
): void {
	let subject: TimeScaleActionResult | null = null;

	const api = context<IChartApi>();

	onMount(() => {
		const [params] = callback();
		subject = timeScale(api, params);

		return () => {
			subject?.destroy();
			subject = null;
		};
	});

	afterUpdate(() => {
		const [params, ref] = callback();
		subject?.update(params);
		subject?.updateReference(ref);
	});
}

export function usePriceScaleEffect(
	callback: () => [params: PriceScaleParams, ref: Reference<IPriceScaleApi> | undefined]
): void {
	let subject: PriceScaleActionResult | null = null;

	const api = context<IChartApi>();

	onMount(() => {
		const [params] = callback();
		subject = priceScale(api, params);

		return () => {
			subject?.destroy();
			subject = null;
		};
	});

	afterUpdate(() => {
		const [params, ref] = callback();
		subject?.update(params);
		subject?.updateReference(ref);
	});
}
