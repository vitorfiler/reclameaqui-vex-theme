-- --------------------------------------------------------
-- Servidor:                     187.45.196.179
-- Versão do servidor:           5.7.17-13-log - Percona Server (GPL), Release 13, Revision fd33d43
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

USE `bd_reclameaqui`;

-- Copiando estrutura para tabela bd_reclameaqui.Arquivo
DROP TABLE IF EXISTS `Arquivo`;
CREATE TABLE IF NOT EXISTS `Arquivo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `NomeArquivo` varchar(200) NOT NULL,
  `CaminhoArquivo` varchar(200) NOT NULL,
  `IdReferencia` bigint(20) NOT NULL,
  `TipoArquivoId` bigint(20) NOT NULL,
  `TipoUploadId` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `ConteudoReclamacaoId` (`TipoArquivoId`) USING BTREE,
  KEY `TipoUploadId` (`TipoUploadId`),
  CONSTRAINT `FK_Arquivo_TipoArquivo` FOREIGN KEY (`TipoArquivoId`) REFERENCES `TipoArquivo` (`Id`),
  CONSTRAINT `FK_Arquivo_TipoUpload` FOREIGN KEY (`TipoUploadId`) REFERENCES `TipoUpload` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Arquivo: ~0 rows (aproximadamente)
DELETE FROM `Arquivo`;
/*!40000 ALTER TABLE `Arquivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `Arquivo` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Categoria
DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE IF NOT EXISTS `Categoria` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `NomeMenu` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `FlagMae` tinyint(4) NOT NULL,
  `Foto` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `Cor` varchar(7) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela bd_reclameaqui.Categoria: ~99 rows (aproximadamente)
DELETE FROM `Categoria`;
/*!40000 ALTER TABLE `Categoria` DISABLE KEYS */;
INSERT INTO `Categoria` (`Id`, `Nome`, `NomeMenu`, `FlagMae`, `Foto`, `Cor`) VALUES
	(5, 'Alimentos e Bebidas', 'AlimentosBebidas', 1, '', ''),
	(6, 'Bebidas', 'Bebidas', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/bebidas.jpg', ''),
	(7, 'Bebidas Alcóolicas', 'BebidasAlcoolicas', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/bebidasalcoolicas.jpg', ''),
	(8, 'Bomboniere', 'Bomboniere', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/bomboniere.jpg', ''),
	(9, 'Congelados', 'Congelados', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/congelados.jpg', ''),
	(10, 'Laticínios e Lácteos', 'LaticiniosLacteos', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/laticinioselacteos.jpg', ''),
	(11, 'Matinais', 'Matinais', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/matinais.jpg', ''),
	(12, 'Mercearia', 'Mercearia', 0, '/assets/img/backgrounds/imagens/AlimentoseBebidas/mercearia.jpg', ''),
	(13, 'Bancos e Cartões', 'BancosCartoes', 1, '', ''),
	(14, 'Bancos ', 'Bancos ', 0, '/assets/img/backgrounds/imagens/BancoseCartoes/bancos.jpg', ''),
	(15, 'Cartões de Benefícios', 'CartoesdeBeneficios', 0, '/assets/img/backgrounds/imagens/BancoseCartoes/cartoesdebeneficios.jpg', ''),
	(16, 'Cartões de Crédito', 'CartoesdeCredito', 0, '/assets/img/backgrounds/imagens/BancoseCartoes/cartoesdecredito.jpg', ''),
	(17, 'Consórcios', 'Consorcios', 0, '/assets/img/backgrounds/imagens/BancoseCartoes/consorcios.jpg', ''),
	(18, 'Financeiras', 'Financeiras', 0, '/assets/img/backgrounds/imagens/BancoseCartoes/financeiras.jpg', ''),
	(19, 'Beleza e Estética', 'BelezaEstetica', 1, '', ''),
	(20, 'Cabelos', 'Cabelos', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/cabelos.jpg', ''),
	(21, 'Corpo e Banho', 'CorpoBanho', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/corpoebanho.jpg', ''),
	(22, 'Higiene e Limpeza Pessoal', 'HigieneLimpezaPessoal', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/higieneelimpezapessoal.jpg', ''),
	(23, 'Mãos e Pés', 'MaosPes', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/maosepes.jpg', ''),
	(24, 'Maquiagem', 'Maquiagem', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/maquiagem.jpg', ''),
	(25, 'Perfumarias', 'Perfumarias', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/perfumarias.jpg', ''),
	(26, 'Suplementos Alimentares', 'SuplementosAlimentares', 0, '/assets/img/backgrounds/imagens/BelezaEstetica/suplementosalimentares.jpg', ''),
	(27, 'Casas e Construção', 'CasasConstrucao', 1, '', ''),
	(28, 'Chuveiros e Aquecedores', 'ChuveirosAquecedores', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/chuveiroseaquecedores.jpg', ''),
	(29, 'Ferramentas e Máquinas', 'FerramentasMaquinas', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/ferramentasemaquinas.jpg', ''),
	(30, 'Iluminação Elétrica', 'IluminacaoEletrica', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/iluminacaoeletrica.jpg', ''),
	(31, 'Louças e Metais', 'LoucasMetais', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/loucasemetais.jpg', ''),
	(32, 'Materiais de Construção', 'MateriaisConstrucao', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/materiaisdeconstrucao.jpg', ''),
	(33, 'Pisos e Laminados de Madeira', 'PisosLaminadosMadeira', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/pisoselaminadosdemadeira.jpg', ''),
	(34, 'Tintas e Acessórios', 'TintasAcessorios', 0, '/assets/img/backgrounds/imagens/CasasConstrucao/tintaseacessorios.jpg', ''),
	(35, 'Ecommerce', 'Ecommerce', 1, '', ''),
	(36, 'Calçados Femininos', 'CalcadosFemininos', 0, '/assets/img/backgrounds/imagens/Ecommerce/calcadosfemininos.jpg', ''),
	(37, 'Celulares e Smartphones', 'CelularesSmartphones', 0, '/assets/img/backgrounds/imagens/Ecommerce/celularesesmartphones.jpg', ''),
	(38, 'Eletrodomésticos', 'Eletrodomesticos', 0, '/assets/img/backgrounds/imagens/Ecommerce/eletrodomesticos.jpg', ''),
	(39, 'Eletroeletrônicos', 'Eletroeletronicos', 0, '/assets/img/backgrounds/imagens/Ecommerce/eletroeletronicos.jpg', ''),
	(40, 'Eletroportáteis', 'Eletroportateis', 0, '/assets/img/backgrounds/imagens/Ecommerce/eletroportateis.jpg', ''),
	(41, 'Informática', 'Informatica', 0, '/assets/img/backgrounds/imagens/Ecommerce/informatica.jpg', ''),
	(42, 'Moda Feminina', 'ModaFeminina', 0, '/assets/img/backgrounds/imagens/Ecommerce/modafeminina.jpg', ''),
	(43, 'Educação', 'Educacao', 1, '', ''),
	(44, 'Autoescolas', 'Autoescolas', 0, '/assets/img/backgrounds/imagens/Educacao/autoescolas.jpg', ''),
	(45, 'Cursos de Idiomas', 'CursosIdiomas', 0, '/assets/img/backgrounds/imagens/Educacao/cursosdeidiomas.jpg', ''),
	(46, 'Cursos para Vestibulares e Concursos', 'CursosVestibularesConcursos', 0, '/assets/img/backgrounds/imagens/Educacao/cursosparavestibulareconcursos.jpg', ''),
	(47, 'Cursos Técnicos e Profissionalizantes', 'CursosTecnicosProfissionalizantes', 0, '/assets/img/backgrounds/imagens/Educacao/cursostecnicoseprofissionalizantes.jpg', ''),
	(48, 'Escolas', 'Escolas', 0, '/assets/img/backgrounds/imagens/Educacao/escolas.jpg', ''),
	(49, 'Livros', 'Livros', 0, '/assets/img/backgrounds/imagens/Educacao/livros.jpg', ''),
	(50, 'Universidades e Faculdades', 'UniversidadesFaculdades', 0, '/assets/img/backgrounds/imagens/Educacao/universidadesefaculdades.jpg', ''),
	(51, 'Mãe e Bebê', 'MaeBebe', 1, '', ''),
	(52, 'Acessórios para Bebê', 'AcessoriosBebe', 0, '/assets/img/backgrounds/imagens/MaeBebe/acessoriosparabebe.jpg', ''),
	(53, 'Artigos para Bebê', 'ArtigosBebe', 0, '/assets/img/backgrounds/imagens/MaeBebe/artigosparabebe.jpg', ''),
	(54, 'Brinquedos e  Jogos', 'BrinquedosJogos', 0, '/assets/img/backgrounds/imagens/MaeBebe/brinquedosejogos.jpg', ''),
	(55, 'Buffet Infantil', 'BuffetInfantil', 0, '/assets/img/backgrounds/imagens/MaeBebe/buffetinfantil.jpg', ''),
	(56, 'Corpo e Banho Infantil', 'CorpoBanhoInfantil', 0, '/assets/img/backgrounds/imagens/MaeBebe/corpoebanhoinfantil.jpg', ''),
	(57, 'Móveis Infantis', 'MoveisInfantis', 0, '/assets/img/backgrounds/imagens/MaeBebe/moveisinfantis.jpg', ''),
	(58, 'Troca de Fraldas', 'TrocaFraldas', 0, '/assets/img/backgrounds/imagens/MaeBebe/trocadefraldas.jpg', ''),
	(59, 'Moda', 'Moda', 1, '', ''),
	(60, 'Acessórios de Vestuário', 'AcessoriosVestuario', 0, '/assets/img/backgrounds/imagens/Moda/acessoriosdevestuario.jpg', ''),
	(61, 'Bolsas e Malas', 'BolsasMalas', 0, '/assets/img/backgrounds/imagens/Moda/bolsasemalas.jpg', ''),
	(62, 'Calçados Femininos', 'CalcadosFemininos', 0, '/assets/img/backgrounds/imagens/Moda/cacadosfemininos.jpg', ''),
	(63, 'Calçados Masculinos', 'CalcadosMasculinos', 0, '/assets/img/backgrounds/imagens/Moda/calcadosmasculinos.jpg', ''),
	(64, 'Moda Feminina', 'ModaFeminina', 0, '/assets/img/backgrounds/imagens/Moda/modafeminina.jpg', ''),
	(65, 'Moda Masculina', 'ModaMasculina', 0, '/assets/img/backgrounds/imagens/Moda/modamasculina.jpg', ''),
	(66, 'Relógios', 'Relogios', 0, '/assets/img/backgrounds/imagens/Moda/relogios.jpg', ''),
	(67, 'Móveis e Decoração', 'MoveisDecoracao', 1, '', ''),
	(68, 'Colchões', 'Colchoes', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/colchoes.jpg', ''),
	(69, 'Decoração', 'Decoracao', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/decoracao.jpg', ''),
	(70, 'Móveis em Geral', 'MoveisGeral', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/moveisemgeral.jpg', ''),
	(71, 'Móveis Modulados', 'MoveisModulados', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/moveismodulados.jpg', ''),
	(72, 'Móveis Planejados', 'MoveisPlanejados', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/moveisplanejados.jpg', ''),
	(73, 'Papel de parede e Adesivos', 'PapelParedeAdesivos', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/papeldeparedeeadesivos.jpg', ''),
	(74, 'Persianas e Cortinas', 'PersianasCortinas', 0, '/assets/img/backgrounds/imagens/MoveisDecoracao/persianasecortinas.jpg', ''),
	(75, 'Saúde', 'Saude', 1, '', ''),
	(76, 'Clínicas Médicas', 'ClinicasMedicas', 0, '/assets/img/backgrounds/imagens/Saude/clinicasmedicas.jpg', ''),
	(77, 'Equipamentos Médicos e Odontológicos', 'EquipamentosMedicosOdontologicos', 0, '/assets/img/backgrounds/imagens/Saude/equipamentosmedicoseodonto.jpg', ''),
	(78, 'Exames Laboratoriais e Imagem', 'ExamesLaboratoriaisImagem', 0, '/assets/img/backgrounds/imagens/Saude/exameslabeimagem.jpg', ''),
	(79, 'Farmácias', 'Farmacias', 0, '/assets/img/backgrounds/imagens/Saude/farmacias.jpg', ''),
	(80, 'Hospitais', 'Hospitais', 0, '/assets/img/backgrounds/imagens/Saude/hospitais.jpg', ''),
	(81, 'Indústria Farmaceutica', 'IndustriaFarmaceutica', 0, '/assets/img/backgrounds/imagens/Saude/industriafarmaceutica.jpg', ''),
	(82, 'Planos de Saúde', 'PlanosSaude', 0, '/assets/img/backgrounds/imagens/Saude/planosdesaude.jpg', ''),
	(83, 'Telefonia, TV e Internet', 'TelefoniaTVInternet', 1, '', ''),
	(84, 'Provedores e Servidores de Internet', 'ProvedoresServidoresInternet', 0, '/assets/img/backgrounds/imagens/TelefoniaTVInternet/provedoreservdeinternet.jpg', ''),
	(85, 'Telefonia Celular', 'TelefoniaCelular', 0, '/assets/img/backgrounds/imagens/TelefoniaTVInternet/telefoniacelular.jpg', ''),
	(86, 'Telefonia Fixa', 'TelefoniaFixa', 0, '/assets/img/backgrounds/imagens/TelefoniaTVInternet/telefoniafixa.jpg', ''),
	(87, 'Tv por Assinatura', 'TvAssinatura', 0, '/assets/img/backgrounds/imagens/TelefoniaTVInternet/tvporassinatura.jpg', ''),
	(88, 'Turismo e Lazer', 'TurismoLazer', 1, '', ''),
	(89, 'Agencias de Viagens', 'AgenciasViagens', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/agenciasdeviagens.jpg', ''),
	(90, 'Aluguel de Carros', 'AluguelCarros', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/alugueldecarros.jpg', ''),
	(91, 'Companhias Aéreas', 'CompanhiasAereas', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/companhiasaereas.jpg', ''),
	(92, 'Empresas de Ingressos', 'EmpresasIngressos', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/empresasdeingressos.jpg', ''),
	(93, 'Parques de diversão', 'ParquesDiversao', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/parquesdediversao.jpg', ''),
	(94, 'Redes de Hotéis', 'RedesHoteis', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/redesdehoteis.jpg', ''),
	(95, 'Resorts', 'Resorts', 0, '/assets/img/backgrounds/imagens/TurismoeLazer/resorts.jpg', ''),
	(96, 'Veículos e Acessórios', 'VeiculosAcessorios', 1, '', ''),
	(97, 'Acessórios para Carros', 'AcessoriosCarros', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/acessoriosparacarros.jpg', ''),
	(98, 'Acessórios para Motos', 'AcessoriosMotos', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/acessoriosparamotos.jpg', ''),
	(99, 'Autopeças', 'Autopecas', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/autopecas.jpg', ''),
	(100, 'Concessionárias de Carros', 'ConcessionariasCarros', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/concessionariasdecarros.jpg', ''),
	(101, 'Fabricantes de Carros', 'FabricantesCarros', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/fabricantesdecarros.jpg', ''),
	(102, 'Lojas de Carros', 'LojasCarros', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/lojasdecarros.jpg', ''),
	(103, 'Pneus', 'Pneus', 0, '/assets/img/backgrounds/imagens/VeículoseAcessorios/pneus.jpg', '');
/*!40000 ALTER TABLE `Categoria` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.CategoriaMaeFilha
DROP TABLE IF EXISTS `CategoriaMaeFilha`;
CREATE TABLE IF NOT EXISTS `CategoriaMaeFilha` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `CategoriaIdFilha` bigint(20) NOT NULL,
  `CategoriaIdMae` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.CategoriaMaeFilha: ~86 rows (aproximadamente)
DELETE FROM `CategoriaMaeFilha`;
/*!40000 ALTER TABLE `CategoriaMaeFilha` DISABLE KEYS */;
INSERT INTO `CategoriaMaeFilha` (`Id`, `CategoriaIdFilha`, `CategoriaIdMae`) VALUES
	(1, 6, 5),
	(2, 7, 5),
	(3, 8, 5),
	(4, 9, 5),
	(5, 10, 5),
	(6, 11, 5),
	(7, 12, 5),
	(8, 14, 13),
	(9, 15, 13),
	(10, 16, 13),
	(11, 17, 13),
	(12, 18, 13),
	(13, 20, 19),
	(14, 21, 19),
	(15, 22, 19),
	(16, 23, 19),
	(17, 24, 19),
	(18, 25, 19),
	(19, 26, 19),
	(20, 28, 27),
	(21, 29, 27),
	(22, 30, 27),
	(23, 31, 27),
	(24, 32, 27),
	(25, 33, 27),
	(26, 34, 27),
	(27, 36, 35),
	(28, 37, 35),
	(29, 38, 35),
	(30, 39, 35),
	(31, 40, 35),
	(32, 41, 35),
	(33, 42, 35),
	(34, 44, 43),
	(35, 45, 43),
	(36, 46, 43),
	(37, 47, 43),
	(38, 48, 43),
	(39, 49, 43),
	(40, 50, 43),
	(41, 52, 51),
	(42, 53, 51),
	(43, 54, 51),
	(44, 55, 51),
	(45, 56, 51),
	(46, 57, 51),
	(47, 58, 51),
	(48, 60, 59),
	(49, 61, 59),
	(50, 62, 59),
	(51, 63, 59),
	(52, 64, 59),
	(53, 65, 59),
	(54, 66, 59),
	(55, 68, 67),
	(56, 69, 67),
	(57, 70, 67),
	(58, 71, 67),
	(59, 72, 67),
	(60, 73, 67),
	(61, 74, 67),
	(62, 76, 75),
	(63, 77, 75),
	(64, 78, 75),
	(65, 79, 75),
	(66, 80, 75),
	(67, 81, 75),
	(68, 82, 75),
	(69, 84, 83),
	(70, 85, 83),
	(71, 86, 83),
	(72, 87, 83),
	(73, 89, 88),
	(74, 90, 88),
	(75, 91, 88),
	(76, 92, 88),
	(77, 93, 88),
	(78, 94, 88),
	(79, 95, 88),
	(80, 97, 96),
	(81, 98, 96),
	(82, 99, 96),
	(83, 100, 96),
	(84, 101, 96),
	(85, 102, 96),
	(86, 103, 96);
/*!40000 ALTER TABLE `CategoriaMaeFilha` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Cliente
DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE IF NOT EXISTS `Cliente` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(200) NOT NULL,
  `DataNascimento` date NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `Genero` varchar(20) NOT NULL,
  `Celular` varchar(15) NOT NULL,
  `EnderecoId` bigint(20) DEFAULT NULL,
  `Email` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `EnderecoId` (`EnderecoId`),
  CONSTRAINT `FKEnderecoCliente` FOREIGN KEY (`EnderecoId`) REFERENCES `Endereco` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Cliente: ~9 rows (aproximadamente)
DELETE FROM `Cliente`;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` (`Id`, `Nome`, `DataNascimento`, `CPF`, `Genero`, `Celular`, `EnderecoId`, `Email`) VALUES
	(1, 'Vitor Nunes', '2020-08-11', '00000000000', 'o', '12312311231', 21, 'pabo@alvimsolutions.com.br'),
	(2, 'lalalala', '1233-08-01', '11111111111', 'M', '1111111', 3, 'string'),
	(4, 'qewqe', '1844-08-01', '11111111111', 'string', 'string', 4, 'string'),
	(5, 'qewqe', '1844-08-01', '11111111111', 'string', 'string', 5, 'string'),
	(6, 'qewqe', '1844-08-01', '11111111111', 'string', 'string', 6, 'string'),
	(7, 'DUan', '1844-08-01', '11111111111', 'M', '123123', 7, '1312312'),
	(8, 'Vitor_teste', '1844-08-01', '33333333333', 'M', '123213', 8, '123123'),
	(11, 'string', '2020-08-02', 'string', 'string', 'string', 11, 'string'),
	(12, 'string', '2020-08-02', 'string', 'string', 'string', 12, 'string'),
	(13, 'asdasdsad', '2020-08-02', '11111111111', 'string', '123123', 13, '123123'),
	(14, 'nome', '2020-08-04', 'cpf', 'string', 'celular', 14, 'email'),
	(15, 'nome', '2020-08-04', 'cpf', 'string', 'celular', 15, 'email'),
	(16, 'Amanda Tereza Maria Mendonça Solto de Freitas Micherie ', '2020-08-12', '45675365499', 'o', '3898455535', 22, 'AmandaTerezaMariaMendoncaSoltodeFreitasMicherie@gmail.com'),
	(17, 'Amanda Tereza Maria Mendonça Solto de Freitas Micherie ', '2020-08-12', '45675365499', 'o', '3898455535', NULL, 'AmandaTerezaMariaMendoncaSoltodeFreitasMicherie@gmail.com');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.ConteudoReclamacao
DROP TABLE IF EXISTS `ConteudoReclamacao`;
CREATE TABLE IF NOT EXISTS `ConteudoReclamacao` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ReclamacaoId` bigint(20) NOT NULL,
  `Conteudo` text NOT NULL,
  `DataEnvio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FlagCliente` tinyint(4) NOT NULL DEFAULT '0',
  `DataSave` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `ReclamacaoId` (`ReclamacaoId`),
  CONSTRAINT `FkConteudoReclamacao` FOREIGN KEY (`ReclamacaoId`) REFERENCES `Reclamacao` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.ConteudoReclamacao: ~3 rows (aproximadamente)
DELETE FROM `ConteudoReclamacao`;
/*!40000 ALTER TABLE `ConteudoReclamacao` DISABLE KEYS */;
INSERT INTO `ConteudoReclamacao` (`Id`, `ReclamacaoId`, `Conteudo`, `DataEnvio`, `FlagCliente`, `DataSave`) VALUES
	(38, 43, 'Em 2001, Maurício Vargas teve um problema com uma companhia aérea e perdeu um importante negócio. Ele não encontrou um canal para expor sua insatisfação e alertar outros consumidores, com isso, teve a ideia de criar o Reclame AQUI! \n\nA empresa que começou com reclamações dos familiares e amigos em um pequeno escritório em Campo Grande, Mato Grosso do Sul, hoje é um dos sites mais acessados do Brasil!\n\nDiariamente, mais de 600 mil pessoas pesquisam as reputações das empresas antes de realizar uma compra, contratar um serviço ou resolver um problema.', '0001-01-01 00:00:00', 0, '2020-08-05 14:44:16'),
	(39, 44, 'Em 2001, Maurício Vargas teve um problema com uma companhia aérea e perdeu um importante negócio. Ele não encontrou um canal para expor sua insatisfação e alertar outros consumidores, com isso, teve a ideia de criar o Reclame AQUI! \n\nA empresa que começou com reclamações dos familiares e amigos em um pequeno escritório em Campo Grande, Mato Grosso do Sul, hoje é um dos sites mais acessados do Brasil!\n\nDiariamente, mais de 600 mil pessoas pesquisam as reputações das empresas antes de realizar uma compra, contratar um serviço ou resolver um problema.', '0001-01-01 00:00:00', 0, '2020-08-05 14:45:10'),
	(40, 45, 'Em 2001, Maurício Vargas teve um problema com uma companhia aérea e perdeu um importante negócio. Ele não encontrou um canal para expor sua insatisfação e alertar outros consumidores, com isso, teve a ideia de criar o Reclame AQUI! \n\nA empresa que começou com reclamações dos familiares e amigos em um pequeno escritório em Campo Grande, Mato Grosso do Sul, hoje é um dos sites mais acessados do Brasil!\n\nDiariamente, mais de 600 mil pessoas pesquisam as reputações das empresas antes de realizar uma compra, contratar um serviço ou resolver um problema.', '0001-01-01 00:00:00', 0, '2020-08-05 14:46:25');
/*!40000 ALTER TABLE `ConteudoReclamacao` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Empresa
DROP TABLE IF EXISTS `Empresa`;
CREATE TABLE IF NOT EXISTS `Empresa` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(200) NOT NULL,
  `Site` varchar(200) DEFAULT NULL,
  `CNPJ` varchar(14) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Email2` varchar(200) DEFAULT NULL,
  `Responsavel` varchar(200) DEFAULT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `CelularResponsavel` varchar(20) DEFAULT NULL,
  `EnderecoId` bigint(20) DEFAULT NULL,
  `CategoriaId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `EnderecoId` (`EnderecoId`),
  KEY `CategoriaId` (`CategoriaId`),
  CONSTRAINT `FKCategoriaEmpresa` FOREIGN KEY (`CategoriaId`) REFERENCES `Categoria` (`Id`),
  CONSTRAINT `FKEnderecoEmpresa` FOREIGN KEY (`EnderecoId`) REFERENCES `Endereco` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Empresa: ~3 rows (aproximadamente)
DELETE FROM `Empresa`;
/*!40000 ALTER TABLE `Empresa` DISABLE KEYS */;
INSERT INTO `Empresa` (`Id`, `Nome`, `Site`, `CNPJ`, `Email`, `Email2`, `Responsavel`, `Telefone`, `CelularResponsavel`, `EnderecoId`, `CategoriaId`) VALUES
	(1, 'Empresa Teste LTDA', 'epa', '0001', 'pablo@alvimsolutions.com.br', '000@oi', 'epa', NULL, NULL, 10, 90),
	(2, 'Empresa Teste LTDA 2', 'teste.com.br', '0002', 'pablo@alvimsolutions.com.br', NULL, 'Aopa', NULL, NULL, 10, 89),
	(3, 'Empresa Teste EIRELLI', 'eirelli.com.br', '0003', 'pablo@alvimsolutions.com.br', NULL, 'EOTCHAN', NULL, NULL, 1, 13);
/*!40000 ALTER TABLE `Empresa` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Endereco
DROP TABLE IF EXISTS `Endereco`;
CREATE TABLE IF NOT EXISTS `Endereco` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Logradouro` varchar(250) NOT NULL,
  `Numero` varchar(10) NOT NULL,
  `Complemento` varchar(20) DEFAULT NULL,
  `Bairro` varchar(50) NOT NULL,
  `Cidade` varchar(70) NOT NULL,
  `UF` varchar(70) NOT NULL,
  `CEP` varchar(9) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Endereco: ~14 rows (aproximadamente)
DELETE FROM `Endereco`;
/*!40000 ALTER TABLE `Endereco` DISABLE KEYS */;
INSERT INTO `Endereco` (`Id`, `Logradouro`, `Numero`, `Complemento`, `Bairro`, `Cidade`, `UF`, `CEP`) VALUES
	(1, 'Rua da mae Joana', '3345', 'Casa das Primas', 'Voyer', 'Cassino', 'PT', '00000-666'),
	(2, 'Rua da mae Joana', '3345', 'Casa das Primas', 'Voyer', 'Cassino', 'PT', '00000-666'),
	(3, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(4, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(5, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(6, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(7, 'string', 'string', 'string', 'string', 'asaf', 'MG', 'string'),
	(8, 'string', 'string', 'string', 'string', 'AVas', 'AC', 'string'),
	(10, 'epa', 'epa', 'epa', 'epa', 'epa', 'epa', 'epa'),
	(11, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(12, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(13, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(14, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(15, 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
	(20, 'teste', 'este', 'tete', 'tet', 'etet', 'etet', 'tet'),
	(21, 'asdasdsadasdasdasdasd', 'teste', 'teasdasd', 'asdasd', 'dasd', 'sdasd', 'dasd'),
	(22, 'string', 'string', 'string', 'string', 'string', 'string', 'string');
/*!40000 ALTER TABLE `Endereco` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Login
DROP TABLE IF EXISTS `Login`;
CREATE TABLE IF NOT EXISTS `Login` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(200) NOT NULL,
  `Senha` varchar(200) NOT NULL,
  `ClienteId` bigint(20) DEFAULT NULL,
  `EmpresaId` bigint(20) DEFAULT NULL,
  `Perfil` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Usuario` (`Usuario`),
  KEY `ClienteId` (`ClienteId`),
  KEY `EmpresaId` (`EmpresaId`),
  CONSTRAINT `FKLoginCliente` FOREIGN KEY (`ClienteId`) REFERENCES `Cliente` (`Id`),
  CONSTRAINT `FKLoginEmpresa` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Login: ~4 rows (aproximadamente)
DELETE FROM `Login`;
/*!40000 ALTER TABLE `Login` DISABLE KEYS */;
INSERT INTO `Login` (`Id`, `Usuario`, `Senha`, `ClienteId`, `EmpresaId`, `Perfil`) VALUES
	(6, 'clienteteste', '123', 1, NULL, 1),
	(14, 'empresateste', '123', NULL, 1, 2),
	(17, 'clienteteste1', '321', 4, NULL, 1),
	(18, 'empresateste1', '321', NULL, 1, 1),
	(19, 'manda', 'epapirulito', 17, NULL, 1);
/*!40000 ALTER TABLE `Login` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Rating
DROP TABLE IF EXISTS `Rating`;
CREATE TABLE IF NOT EXISTS `Rating` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `NotaRating` int(11) NOT NULL,
  `NotaSolucao` int(11) NOT NULL,
  `FlagVoltariaNegocios` tinyint(4) NOT NULL,
  `ReclamacaoId` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `ReclamacaoId` (`ReclamacaoId`),
  CONSTRAINT `FKRatingReclamacao` FOREIGN KEY (`ReclamacaoId`) REFERENCES `Reclamacao` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Rating: ~3 rows (aproximadamente)
DELETE FROM `Rating`;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
INSERT INTO `Rating` (`Id`, `NotaRating`, `NotaSolucao`, `FlagVoltariaNegocios`, `ReclamacaoId`) VALUES
	(2, 7, 3, 0, 43),
	(3, 10, 7, 1, 42),
	(4, 8, 9, 1, 44),
	(6, 9, 8, 0, 45);
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Reclamacao
DROP TABLE IF EXISTS `Reclamacao`;
CREATE TABLE IF NOT EXISTS `Reclamacao` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(50) DEFAULT NULL,
  `ClienteId` bigint(20) NOT NULL,
  `EmpresaId` bigint(20) NOT NULL,
  `StatusId` bigint(20) DEFAULT NULL,
  `FlagCovid` tinyint(4) DEFAULT '0',
  `TelContato` varchar(12) NOT NULL,
  `TelContato2` varchar(12) DEFAULT NULL,
  `DataAbertura` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DataEncerramento` datetime DEFAULT NULL,
  `DataInicioTratativa` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ClienteId` (`ClienteId`),
  KEY `EmpresaId` (`EmpresaId`),
  KEY `StatusId` (`StatusId`),
  CONSTRAINT `FKClienteReclamacao` FOREIGN KEY (`ClienteId`) REFERENCES `Cliente` (`Id`),
  CONSTRAINT `FkEmpresaReclamacao` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa` (`Id`),
  CONSTRAINT `FkStatusId` FOREIGN KEY (`StatusId`) REFERENCES `Status` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Reclamacao: ~4 rows (aproximadamente)
DELETE FROM `Reclamacao`;
/*!40000 ALTER TABLE `Reclamacao` DISABLE KEYS */;
INSERT INTO `Reclamacao` (`Id`, `Titulo`, `ClienteId`, `EmpresaId`, `StatusId`, `FlagCovid`, `TelContato`, `TelContato2`, `DataAbertura`, `DataEncerramento`, `DataInicioTratativa`) VALUES
	(42, 'Reclamação Teste', 1, 1, 1, 0, '34992760020', NULL, '2020-08-05 14:27:13', '0001-01-01 00:00:00', '0001-01-01 00:00:00'),
	(43, 'Reclamação Teste', 1, 2, 1, 0, '34992760020', NULL, '2020-08-05 14:44:16', '0001-01-01 00:00:00', '0001-01-01 00:00:00'),
	(44, 'Reclamação Teste', 1, 3, 1, 0, '34992760020', NULL, '2020-08-05 14:45:09', '0001-01-01 00:00:00', '0001-01-01 00:00:00'),
	(45, 'Reclamação Teste', 1, 1, 1, 0, '34992760020', NULL, '2020-08-05 14:46:25', '0001-01-01 00:00:00', '0001-01-01 00:00:00');
/*!40000 ALTER TABLE `Reclamacao` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.Status
DROP TABLE IF EXISTS `Status`;
CREATE TABLE IF NOT EXISTS `Status` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.Status: ~4 rows (aproximadamente)
DELETE FROM `Status`;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
INSERT INTO `Status` (`Id`, `Descricao`) VALUES
	(1, 'Aguardando Análise'),
	(2, 'Iniciada'),
	(3, 'Improcedente'),
	(4, 'Respondido'),
	(5, 'Finalizada'),
	(6, 'Cancelada');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.TipoArquivo
DROP TABLE IF EXISTS `TipoArquivo`;
CREATE TABLE IF NOT EXISTS `TipoArquivo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.TipoArquivo: ~2 rows (aproximadamente)
DELETE FROM `TipoArquivo`;
/*!40000 ALTER TABLE `TipoArquivo` DISABLE KEYS */;
INSERT INTO `TipoArquivo` (`Id`, `Descricao`) VALUES
	(1, 'Imagens'),
	(2, 'Documentos'),
	(3, 'Arquivos');
/*!40000 ALTER TABLE `TipoArquivo` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_reclameaqui.TipoUpload
DROP TABLE IF EXISTS `TipoUpload`;
CREATE TABLE IF NOT EXISTS `TipoUpload` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela bd_reclameaqui.TipoUpload: ~2 rows (aproximadamente)
DELETE FROM `TipoUpload`;
/*!40000 ALTER TABLE `TipoUpload` DISABLE KEYS */;
INSERT INTO `TipoUpload` (`Id`, `Descricao`) VALUES
	(1, 'Reclamacao'),
	(2, 'Cliente'),
	(3, 'Empresa');
/*!40000 ALTER TABLE `TipoUpload` ENABLE KEYS */;

-- Copiando estrutura para view bd_reclameaqui.VW_MELHORESRATING
DROP VIEW IF EXISTS `VW_MELHORESRATING`;
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `VW_MELHORESRATING` (
	`NotaRating` DECIMAL(16,4) NULL,
	`NotaSolucao` DECIMAL(16,4) NULL,
	`FlagVoltariaNegocios` DECIMAL(10,4) NULL,
	`Id` BIGINT(20) NOT NULL,
	`Nome` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Copiando estrutura para view bd_reclameaqui.VW_MELHORESSOLUCAO
DROP VIEW IF EXISTS `VW_MELHORESSOLUCAO`;
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `VW_MELHORESSOLUCAO` (
	`NotaRating` DECIMAL(16,4) NULL,
	`NotaSolucao` DECIMAL(16,4) NULL,
	`FlagVoltariaNegocios` DECIMAL(10,4) NULL,
	`Id` BIGINT(20) NOT NULL,
	`Nome` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Copiando estrutura para view bd_reclameaqui.VW_PIORESRATING
DROP VIEW IF EXISTS `VW_PIORESRATING`;
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `VW_PIORESRATING` (
	`NotaRating` DECIMAL(16,4) NULL,
	`NotaSolucao` DECIMAL(16,4) NULL,
	`FlagVoltariaNegocios` DECIMAL(10,4) NULL,
	`Id` BIGINT(20) NOT NULL,
	`Nome` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Copiando estrutura para view bd_reclameaqui.VW_PIORESSOLUCAO
DROP VIEW IF EXISTS `VW_PIORESSOLUCAO`;
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `VW_PIORESSOLUCAO` (
	`NotaRating` DECIMAL(16,4) NULL,
	`NotaSolucao` DECIMAL(16,4) NULL,
	`FlagVoltariaNegocios` DECIMAL(10,4) NULL,
	`Id` BIGINT(20) NOT NULL,
	`Nome` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Copiando estrutura para view bd_reclameaqui.VW_MELHORESRATING
DROP VIEW IF EXISTS `VW_MELHORESRATING`;
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `VW_MELHORESRATING`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `VW_MELHORESRATING` AS select (avg(`RT`.`NotaRating`) * 10) AS `NotaRating`,(avg(`RT`.`NotaSolucao`) * 10) AS `NotaSolucao`,(avg(`RT`.`FlagVoltariaNegocios`) * 100) AS `FlagVoltariaNegocios`,`E`.`Id` AS `Id`,`E`.`Nome` AS `Nome` from ((`Rating` `RT` join `Reclamacao` `RE` on((`RT`.`ReclamacaoId` = `RE`.`Id`))) join `Empresa` `E` on((`RE`.`EmpresaId` = `E`.`Id`))) group by `E`.`Id` order by `NotaRating` desc limit 10;

-- Copiando estrutura para view bd_reclameaqui.VW_MELHORESSOLUCAO
DROP VIEW IF EXISTS `VW_MELHORESSOLUCAO`;
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `VW_MELHORESSOLUCAO`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `VW_MELHORESSOLUCAO` AS select (avg(`RT`.`NotaRating`) * 10) AS `NotaRating`,(avg(`RT`.`NotaSolucao`) * 10) AS `NotaSolucao`,(avg(`RT`.`FlagVoltariaNegocios`) * 100) AS `FlagVoltariaNegocios`,`E`.`Id` AS `Id`,`E`.`Nome` AS `Nome` from ((`Rating` `RT` join `Reclamacao` `RE` on((`RT`.`ReclamacaoId` = `RE`.`Id`))) join `Empresa` `E` on((`RE`.`EmpresaId` = `E`.`Id`))) group by `E`.`Id` order by `NotaSolucao` desc limit 10;

-- Copiando estrutura para view bd_reclameaqui.VW_PIORESRATING
DROP VIEW IF EXISTS `VW_PIORESRATING`;
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `VW_PIORESRATING`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `VW_PIORESRATING` AS select (avg(`RT`.`NotaRating`) * 10) AS `NotaRating`,(avg(`RT`.`NotaSolucao`) * 10) AS `NotaSolucao`,(avg(`RT`.`FlagVoltariaNegocios`) * 100) AS `FlagVoltariaNegocios`,`E`.`Id` AS `Id`,`E`.`Nome` AS `Nome` from ((`Rating` `RT` join `Reclamacao` `RE` on((`RT`.`ReclamacaoId` = `RE`.`Id`))) join `Empresa` `E` on((`RE`.`EmpresaId` = `E`.`Id`))) group by `E`.`Id` order by `NotaRating` limit 10;

-- Copiando estrutura para view bd_reclameaqui.VW_PIORESSOLUCAO
DROP VIEW IF EXISTS `VW_PIORESSOLUCAO`;
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `VW_PIORESSOLUCAO`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `VW_PIORESSOLUCAO` AS select (avg(`RT`.`NotaRating`) * 10) AS `NotaRating`,(avg(`RT`.`NotaSolucao`) * 10) AS `NotaSolucao`,(avg(`RT`.`FlagVoltariaNegocios`) * 100) AS `FlagVoltariaNegocios`,`E`.`Id` AS `Id`,`E`.`Nome` AS `Nome` from ((`Rating` `RT` join `Reclamacao` `RE` on((`RT`.`ReclamacaoId` = `RE`.`Id`))) join `Empresa` `E` on((`RE`.`EmpresaId` = `E`.`Id`))) group by `E`.`Id` order by `NotaSolucao` limit 10;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
