 # 01: ----- Analisei o enunciado e comecei a etruturar os planos de requisitos
 # Mapeei referencias (Benchmarking) para criar uma interface superior à original

    1. Plataforma sucupira:
    2. Scimago journal & country rank
    3. Google scholar metrics

 # 02: ----- Analisando o CSV identifiquei a formatação (ISSN, Título, Área de avaliação, Estrato)
 # Pra manter a performance e semplicidade de setup do SQLite, modelarei diretamente

   Ao invés de criar um sistema complexo com tabelas separadas pra "Áreas" e "Periódicos" e fazer
   varios joins (já que os dados do CSV são planos), vou criar uma única tabela otimizada chamada "Periodico"

 # 03: ----- Modificando e fazendo preparações de ambiente inicializei os arquivos essenciais
 # Instalei os pacotes e os frameworks
   
   na pasta backend instalei e iniciei o prisma (CLI) e o prisma client. Inicializei o Prisma já configurado para SQLite utilizando " npx prisma init --datasource-provider sqlite " e "traduzi"
   a classe Periodico para linguagem do banco de dados
   - Para criar a tabela fisica utilizei o prisma para criar o arquivo, uma pasta migrations 
   e o arquivo dev.db com: " npx prisma migrate dev --name init_periodicos_table "
   


# =============
#  DECISÕES 
# =============

# Uso de TypeScript com OOP Estrita

- Contexto: O projeto exige alta qualidade de código, manutenibilidade, e possuo familiaridade com a linguagem
- Decisão: Adotarei TS tanto no front quanto no back
- Justificativa: Ajuda na previsibilidade, facilita a modelagem do domínio (exemplo: periodico, AreaAvaliacao) e reduz erros em tempo de execução

# Estratégia de versionamento (git flow simplificado)

- Contexto: O projeto precisa de um histórico limpo e organizado, separando código em desenvolvimento 
de código pronto para produção.
- Decisão: Adotarei duas branches principais: main (código estável/produção) e develop (integração), novas funcionalidades sairão de develop (ex: feat/database-setup).
- Justificativa: Evita quebrar a aplicação principal durante minha construção, facilita o code review e demonstra boas práticas de CI/CD e trabalho


# ORM e DB (Prisma + SQLite)

- Contexto: O projeto precisa de um banco de dados relacional e de uma forma segura de interagir com ele via código, assim  não sera necessario instalar serviços para rodar o projeto (como Postgres).
- Decisão: Adotei o SQLite como banco físico e o Prisma ORM para a comunicação 
# ------------------------------------------------------------------------------------------------------  
  Adicionei @@index nas colunas issn e titulo pois como a base da CAPES é grande e o requisito (RF03) é buscar por esses campos, os índices garantirão que a busca seja EXTREMAMENTE rapida
# ------------------------------------------------------------------------------------------------------
- Justificativa: O SQLite reside em um único arquivo local (portabilidade extrema). O Prisma integra perfeitamente com TypeScript, entregando tipagem estrita desde a consulta no banco até a resposta da API.

- Dei downgroad no prisma