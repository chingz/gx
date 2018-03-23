import * as moment from 'moment';

export default class Repository {
    public static map(values: any): Repository {
        return new Repository(
            values.name,
            values.full_name,
            moment(values.updated_at),
        );
    }

    constructor(
        public name: string,
        public fullName: string,
        public lastUpdateAt: moment.Moment,
    ) {}

    getLastUpdate = () => this.lastUpdateAt.fromNow();
}
