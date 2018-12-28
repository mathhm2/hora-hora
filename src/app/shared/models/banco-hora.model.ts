export interface BancoHora {
    id: string;
    data: string;
    horas: HorasRegistro;
    horasTrabalhas: string;
    saldoHora: string;
    uid: string;
}

export interface HorasRegistro {
    entrada: string;
    intervaloInicial: string;
    intervaloFinal: string;
    saida: string;
}
