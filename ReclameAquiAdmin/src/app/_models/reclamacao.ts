import { ConteudoReclamacao } from './conteudoReclamacao';

export class Reclamacao{
    Id: number;
    Titulo: string;
    ClienteId: number;
    EmpresaId: number;
    StatusId: number;
    FlagCovid: boolean;
    DataAbertura: string;
    DataEncerramento: string;
    DataInicioTratativa: string;
    TelContato: string;
    TelContato2: string;
}

export class ReclamacaoTabela{
    Id: number;
    Titulo: string;
    Status: string;
    StatusId: string;
    StatusCor: string;
    Empresa: number;
    DataAbertura: string;
    Arquivos: [];
}

export class ReclamacaoFeedEmpresa{
    Foto: string;
    TempoDecorrido: string;
    NomeEmpresa: string;
    Titulo: string;
    Email: string;
    DsStatus: string;
    StatusCor: string;
    Body: String;
    StatusId: number;
    IdReclamacao: number;
    NomeReclamante: string;
    Arquivos: [];
    NomeArquivos: [];
}