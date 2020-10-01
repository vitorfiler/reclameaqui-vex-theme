import { Reclamacao } from './reclamacao';
import { ArquivosReclamacao } from './arquivosReclamacao';

export class ConteudoReclamacao{
    Id: number;
    Conteudo: string;
    ReclamacaoId: number;
    FlagCliente: boolean;
    Reclamacao: Reclamacao;
}
export class ConteudoResposta{
    reclamacaoId: number;
    conteudo: string;
    flagCliente: Boolean;
}