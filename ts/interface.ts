export interface TypeInterface {
	(value: any): string;
}

export interface DataInterface {
	(type: string): any
}

export interface PropertyInterface {
	type?: string;
	[propName: string]: string | SchemaInterface;
}

export interface SchemaInterface {
	type: string;
	items?: PropertyInterface | PropertyInterface[];
	required?: string[];
}

export interface RecordInterface {
	(
		schema: SchemaInterface,
		errors: string,
		isConsole: boolean,
		isRecord: boolean,
		callback?: any
	): void
}

export interface InitTempObj {
	[propName: string]: any;
}