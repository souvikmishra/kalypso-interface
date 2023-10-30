export type ITableColumn<T> = {
	key: string | number;
	title: string;
	value: (row: T) => string | number;
	class?: string | ((row: T, rowIndex?: number, colIndex?: number) => string | null);
	sortable?: boolean;
	rounded?: boolean;
	// searchValue?: (row: T) => string | number;
	// filterOptions?: ((row: T) => any) | any[];
	// filterValue?: ((row: T, searchTerm?: string) => string) | ((row: T) => boolean);
	// filterPlaceholder?: string;
	headerClass?: string;
	// headerFilterClass?: string;
	renderValue?: (row: T) => any;
	// renderComponent?: any; // svelte component
	// hideFilterHeader?: boolean;
};

export type ITableColumns<T> = ITableColumn<T>[];

export type IRowClassName<T> = null | string | ((T, rowIndex) => string | null);
