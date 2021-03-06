export interface Configuration {
    _id: string;
    days: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        fourth: boolean;
        fifth: boolean;
        friday: boolean;
        saturday: boolean;
    };
    journey: string;
    userId: string;
}
