----- Requisitos funcionais (RF):

RF01: O sistema deve permitir a importação/carga inicial dos dados a partir do arquivo CSV da CAPES

RF02: O sistema deve listar todas as áreas disponíveis na base

RF03: O usuer deve poder buscar periódicos por >> Título ou >> ISSN

RF04: O user deve poder filtrar os resultados por estrato QUALIS (A1, A2, B1, B2, B3, B4, B5, C) e por area de avaliação

RF05: O sistema deve apresentar os resultados em uma tabela paginada ou com scroll infinito 

RF06: O sistema deve exibir um resumo estatístico (gráfico ou tabela) mostrando a contagem de periódicos por estrato em uma determinada area

------ Requisitos não funcionais (RNF):

RNF01: O backend vai ser construído em Node.js com TypeScript, seguindo OOP estrito

RNF02: O banco de dados relacional escolhido vai ser SQLite, visando facilidade de setup e portabilidade para o avaliador do case

RNF03: O frontend será em React (via Vite) com tailwindCSS

RNF04: A comunicação entre front e back sera utilizada API RESTful
