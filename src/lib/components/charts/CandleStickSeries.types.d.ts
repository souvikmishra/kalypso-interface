import type {
	CandlestickSeriesPartialOptions,
	ISeriesApi,
	SeriesDataItemTypeMap,
	SeriesMarker,
	Time
} from 'lightweight-charts';
import type { Reference } from './helpers/utils';

export interface $$PROPS extends CandlestickSeriesPartialOptions {
	ref?: Reference<ISeriesApi<'Candlestick'>>;
	data: SeriesDataItemTypeMap['Candlestick'][];
	reactive?: boolean;
	markers?: SeriesMarker<Time>[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {}
