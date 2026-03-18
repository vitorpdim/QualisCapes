
<img width="1858" height="948" alt="015749" src="https://github.com/user-attachments/assets/16e098a3-9642-4889-b51d-9f60215df181" />

# Sistema QUALIS CAPES

Um protótipo de ferramenta fullstack para consulta e análise de classificações de periódicos científicos, desenvolvido como case técnico.

## Tecnologias utilizadas

**Backend:**
* Node.js & TypeScript
* Express.js
* Prisma ORM
* SQLite
* `csv-parser`

**Frontend:**
* React 18 & TypeScript
* Vite
* TailwindCSS 
* Lucide React
* Custom hooks & Service layer pattern

---

## Como Executar o projeto localmente

Para rodar este projeto, você precisará apenas do [Node.js](https://nodejs.org/) (versão 20 ou superior) instalado em sua máquina.

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/vitorpdim/QualisCapes.git
```

### Passo 2: Configurar e Rodar o Backend
Abra um terminal e navegue até a pasta do backend:
```bash
cd backend

# 1. Instalar as dependências
npm install

# 2. Criar a tabela no sqlite
npm run db:migrate

# 3. Popular o banco com dados do csv (são ~171 mil registros, aguarde a mensagem de sucesso)
npx tsx src/scripts/importCsv.ts

# 4. Inicie o servidor da API
npm run dev
```

### Passo 3: Configurar e Rodar o Frontend
Mantenha o terminal do backend rodando, abra **um novo terminal** e navegue até a pasta do frontend:
```bash
cd frontend

# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```
Pronto! Acesse **`http://localhost:5173`** no seu navegador para utilizar o sistema

---

## Funcionalidades entregues

1. **Busca facetada:** Filtros combinados por título, ISSN, área de avaliação e estrato QUALIS.
2. **Alta performance:** Paginação implementada na camada do banco de dados, o sistema busca dentre os 171.111 registros em milissegundos sem travar o navegador.
3. **Dashboards Estatísticos:** Gráficos de barras nativos exibindo a distribuição de periódicos por estrato, além de consolidadores comparativos.
4. **UX:** Interface responsiva, tratamento de estados de UI e paleta de cores condicional baseada na nota do periódico.
