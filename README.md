VM DOCS

Sistema para gerenciamento e automação de documentos escaneados.
O objetivo do VM DOCS é facilitar a extração, visualização e exportação de informações contidas em termos/documentos no formato PDF, reduzindo trabalhos manuais repetitivos.

Esse software está sendo utilizado na Eletrobras para fins de automatização de processos

---

🚀 Funcionalidades

Upload de documentos em PDF.

Extração automática dos dados dos documentos PDF.

Exibição dos dados em tabelas organizadas.

Exportação dos dados processados (CSV, XLSX, etc.).

Autenticação via JWT.

Listagem de todos os usuários cadastrados (área administrativa).

Estrutura pensada para suportar multiusuário no futuro.



---

🛠️ Tecnologias Utilizadas

Frontend: React / Next.js

Estilização: Tailwind CSS/Shadcn UI

Autenticação: JWT

Banco de dados: MySQL

Extração de dados: AWS Textract

Testes: Cypress, Jest

Outros: Context API, React Query, Toastify



---

📂 Estrutura do Projeto (MVVM)

/src
  /features
   /view
   /model
   /modelView
  /Context
  /Hooks
  /shared
  /pages
  /services
  /styles
  /utils

---

📦 Como Rodar o Projeto

1. Clone o repositório:

git clone https://github.com/seu-usuario/vm-docs.git
cd vm-docs


2. Instale as dependências:

npm install
# ou
yarn install


3. Configure as variáveis de ambiente no arquivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:8080


4. Rode o servidor de desenvolvimento:

npm run dev
# ou
yarn dev


5. Acesse no navegador:

http://localhost:3000




---

✅ Roadmap

[x] Upload de PDF

[x] Extração automática dos dados

[x] Exportação em planilhas

[x] Login JWT

[ ] Multiusuário (Organizações)

[ ] Dashboard com métricas

[ ] Integração com APIs externas
