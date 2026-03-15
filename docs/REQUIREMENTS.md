 # 01: ----- Analisei o enunciado e comecei a etruturar os planos de requisitos
 # Mapeei referencias (Benchmarking) para criar uma interface superior à original

    1. Plataforma sucupira:
    2. Scimago journal & country rank
    3. Google scholar metrics

 # 02: ----- Analisando o CSV identifiquei a formatação (ISSN, Título, Área de avaliação, Estrato)
 # Pra manter a performance e semplicidade de setup do SQLite, modelarei diretamente

   Ao invés de criar um sistema complexo com tabelas separadas pra "Áreas" e "Periódicos" e fazer
   varios joins (já que os dados do CSV são planos), vou criar uma única tabela otimizada chamada "Periodico"
   
   

# =============
#  DECISÕES 
# =============

# Uso de TypeScript com OOP Estrita

- Contexto: O projeto exige alta qualidade de código e manutenibilidade, e tenho familiaridade com a linguagem
- Decisão: Adotarei TS tanto no front quanto no back
- Justificativa: Ajuda na previsibilidade, facilita a modelagem do domínio (exemplo: periodico, AreaAvaliacao) e reduz erros em tempo de execução

# Estratégia de versionamento (git flow simplificado)

- Contexto: O projeto precisa de um histórico limpo e organizado, separando código em desenvolvimento 
de código pronto para produção.
- Decisão: Adotarei duas branches principais: main (código estável/produção) e develop (integração), novas funcionalidades sairão de develop (ex: feat/database-setup).
- Justificativa: Evita quebrar a aplicação principal durante minha construção, facilita o code review e demonstra boas práticas de CI/CD e trabalho

