export interface BankHour {
    _id: string;
    date: string;
    hours: {
        startJourney: string;
        pauseJourney: string;
        backJourney: string;
        endJourney: string;
    };
    lack: boolean;
    workedHours: string;
    balanceHours: any;
    userId: string;
}
