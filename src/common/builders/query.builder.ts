import { TimezoneUtil } from '../utils/timezone.util';

export interface DateRangeFilter {
  $gte?: Date;
  $lte?: Date;
}

export interface NumberRangeFilter {
  $gte?: number;
  $lte?: number;
}

export interface StringFilter {
  $regex?: string;
  $options?: string;
}

export interface ArrayFilter<T> {
  $in: T[];
}

export type MongoFilter =
  | string
  | number
  | boolean
  | Date
  | DateRangeFilter
  | NumberRangeFilter
  | StringFilter
  | ArrayFilter<any>
  | Record<string, any>;

export interface MongoQuery {
  [field: string]: MongoFilter;
}

export class QueryBuilder {
  private query: MongoQuery = {};

  constructor(baseQuery: MongoQuery = {}) {
    this.query = { ...baseQuery };
  }

  addDateRange(field: string, from?: string, to?: string): this {
    if (from || to) {
      const dateFilter = TimezoneUtil.createDateRangeFilter(from, to);
      if (dateFilter) {
        this.query[field] = dateFilter;
      }
    }
    return this;
  }

  addStringFilter(field: string, value?: string, exact = false): this {
    if (value) {
      this.query[field] = exact
        ? value
        : ({ $regex: value, $options: 'i' } as StringFilter);
    }
    return this;
  }

  addArrayFilter<T>(field: string, values?: T[]): this {
    if (values && values.length > 0) {
      this.query[field] = { $in: values } as ArrayFilter<T>;
    }
    return this;
  }

  addNumberRange(field: string, min?: number, max?: number): this {
    if (min !== undefined || max !== undefined) {
      const numberFilter: NumberRangeFilter = {};
      if (min !== undefined) {
        numberFilter.$gte = min;
      }
      if (max !== undefined) {
        numberFilter.$lte = max;
      }
      this.query[field] = numberFilter;
    }
    return this;
  }

  addExactMatch(field: string, value?: string | number | boolean | Date): this {
    if (value !== undefined && value !== null && value !== '') {
      this.query[field] = value;
    }
    return this;
  }

  addCustomFilter(customQuery: MongoQuery): this {
    this.query = { ...this.query, ...customQuery };
    return this;
  }

  build(): MongoQuery {
    return this.query;
  }
}
