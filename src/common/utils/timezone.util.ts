import { DateRangeFilter } from '../builders/query.builder';

export class TimezoneUtil {
  private static readonly UTC_OFFSET_HOURS = -6;

  static convertToUTC(dateString: string, endOfDay = false): Date {
    const localDate = new Date(
      dateString + (endOfDay ? 'T23:59:59.999' : 'T00:00:00.000'),
    );

    const utcDate = new Date(
      localDate.getTime() - this.UTC_OFFSET_HOURS * 60 * 60 * 1000,
    );

    return utcDate;
  }

  static convertFromUTC(utcDate: Date): Date {
    return new Date(utcDate.getTime() + this.UTC_OFFSET_HOURS * 60 * 60 * 1000);
  }

  static getCurrentLocalTime(): Date {
    return this.convertFromUTC(new Date());
  }

  static formatToLocalTimezone(utcDate: Date): string {
    const localDate = this.convertFromUTC(utcDate);
    return localDate.toISOString().replace('Z', '-06:00');
  }

  static createDateRangeFilter(
    fromDate?: string,
    toDate?: string,
  ): DateRangeFilter | null {
    const filter: DateRangeFilter = {};

    if (fromDate) {
      filter.$gte = this.convertToUTC(fromDate, false);
    }

    if (toDate) {
      filter.$lte = this.convertToUTC(toDate, true);
    }

    return Object.keys(filter).length > 0 ? filter : null;
  }
}
