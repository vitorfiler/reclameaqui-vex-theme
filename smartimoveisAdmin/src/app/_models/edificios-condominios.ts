import { Endereco } from './endereco';

export class EdificiosCondominios{
    id: number;
    nome: string;
    zelador: string;   
    referencia: string;  
    telefone1: string; 
    telefone2: string; 
    celular1: string; 
    celular2: string; 
    enderecos: Endereco;
    flagAtivo: boolean;
}