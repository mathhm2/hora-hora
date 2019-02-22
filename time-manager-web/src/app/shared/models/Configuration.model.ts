export interface Configuration {
    _id: string;
    days: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
    };
    journey: string;
    userId: string;
}
