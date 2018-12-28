export interface Configuracao {
    diasUlteis: DiasSemana;
    jornada: string;
    uid: string;
}

export interface DiasSemana {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    domingo: boolean;
}
