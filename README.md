# 🌐 Gerenciador de Empregos - Cliente

> Interface web para gerenciamento completo de vagas de emprego e candidatos  
> **Frontend:** HTML5, CSS3, JavaScript ES6+  
> **Backend:** Laravel 12 REST API

---

## 📋 Sobre o Projeto

Sistema web desenvolvido para a disciplina de **Tecnologias Cliente Servidor**, permitindo o gerenciamento completo de:
- 👥 **Perfis de Candidatos** - Usuários que se candidatam a vagas
- 🏢 **Perfis de Empresas** - Empresas que publicam vagas
- 💼 **Vagas de Emprego** - Publicação e gerenciamento de oportunidades
- 📝 **Candidaturas** - Acompanhamento de aplicações

### 🎯 Funcionalidades Principais

#### **👤 Para Usuários (Candidatos)**
- 📝 **Cadastro com validação** de dados pessoais
- 🔐 **Login seguro** com autenticação JWT
- 👤 **Gerenciamento de perfil** (visualizar, editar, excluir)
- 🔍 **Busca avançada de vagas** com filtros (título, área, localização)
- 💼 **Candidatura a vagas** com formulário personalizado
- 📬 **Acompanhamento de candidaturas** com feedback das empresas
- 🚪 **Logout seguro** com invalidação de token

#### **🏢 Para Empresas**
- 📝 **Cadastro de empresa** com dados completos
- 🔐 **Login seguro** com autenticação JWT
- 🏪 **Gerenciamento de perfil** da empresa
- 💼 **Criação e publicação de vagas** com validação
- ✏️ **Edição de vagas** (apenas as próprias)
- 🗑️ **Exclusão de vagas** (com proteção contra vagas ativas)
- 👥 **Visualização de candidatos** que se inscreveram
- 💬 **Envio de feedback** aos candidatos
- 🚪 **Logout seguro** com invalidação de token

#### **⚙️ Geral**
- 🌐 **Configuração dinâmica do servidor** (sem editar código!)
- 🌐 **Suporte a múltiplos ambientes** (local, rede, VPN, nuvem)
- 📱 **Design responsivo** e moderno
- 📊 **Resposta visível no Network** do navegador (requisições HTTP)
- 🎨 **Interface intuitiva** com validações em tempo real

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

1. **Backend Laravel 12** rodando (veja instruções no repositório do backend)
2. Navegador web moderno (Chrome, Firefox, Edge, Safari)
3. *(Opcional)* Servidor HTTP local

### 🔧 Instalação e Execução

#### **Opção 1: Abrir Diretamente no Navegador**

```bash
# 1. Clone o repositório
git clone https://github.com/GiovanneMika/gerenciador-empregos-cliente.git

# 2. Entre na pasta
cd gerenciador-empregos-cliente

# 3. Abra o arquivo index.html no navegador
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### **Opção 2: Servidor HTTP Local (Recomendado)**

**Com Python:**
```bash
# Python 3.x
python -m http.server 8080

# Acesse: http://localhost:8080
```

**Com Node.js:**
```bash
# Instalar http-server globalmente (apenas uma vez)
npm install -g http-server

# Executar servidor
http-server -p 8080

# Acesse: http://localhost:8080
```

**Com PHP:**
```bash
php -S localhost:8080

# Acesse: http://localhost:8080
```

#### **Opção 3: VS Code Live Server**

1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente

---

## ⚙️ Configuração Inicial

### 1️⃣ **Configure o Servidor Backend**

Na primeira vez que acessar o sistema:

1. Você será redirecionado para a tela de **Seleção de Login**
2. Clique em **"⚙️ Configurar Servidor"**
3. Digite a URL do seu servidor Laravel:
   ```
   http://localhost:8000        # Servidor local
   http://192.168.1.10:8000    # Servidor na rede local
   http://26.13.125.160:8000   # Servidor via VPN (Hamachi/Radmin)
   https://api.exemplo.com     # Servidor em produção
   ```
4. Clique em **"🧪 Testar Conexão"** para verificar
5. Se aparecer ✅ **"Conexão bem-sucedida!"**, clique em **"💾 Salvar"**

> ⚠️ **Importante:** NÃO adicione `/api` no final da URL!

### 2️⃣ **Escolha o Tipo de Usuário**

Na tela de seleção de login:

```
┌─────────────────────────────┐
│  Escolha seu tipo de login: │
├─────────────────────────────┤
│  👤 Login como Usuário      │
│  🏢 Login como Empresa      │
└─────────────────────────────┘
```

### 3️⃣ **Crie sua Conta (Usuário)**

Se for candidato:

1. Na tela de login, clique em **"Cadastre-se"**
2. Preencha os dados:
   - **Nome Completo** (obrigatório, 3+ caracteres)
   - **Username** (obrigatório, único, imutável)
   - **Senha** (obrigatório, apenas alfanumérico)
   - **Email** (opcional, único, válido)
   - **Telefone** (opcional)
   - **Experiência** (opcional)
   - **Formação** (opcional)
3. Clique em **"Cadastrar"**
4. Você será redirecionado para o login

### 4️⃣ **Crie sua Conta (Empresa)**

Se for empresa:

1. Na tela de login, clique em **"Registrar Empresa"**
2. Preencha os dados:
   - **Nome da Empresa** (obrigatório, único)
   - **Ramo de Negócio** (obrigatório)
   - **Username** (obrigatório, único)
   - **Senha** (obrigatório, apenas alfanumérico)
   - **Email** (obrigatório, único, válido)
   - **Telefone** (opcional)
   - **Endereço** (rua, número, cidade, estado)
3. Clique em **"Registrar"**
4. Você será redirecionado para o login da empresa

### 5️⃣ **Faça Login e Use o Sistema**

1. Digite seu **username** e **senha**
2. Clique em **"Entrar"**
3. Você será levado ao **Painel correspondente**

---

## 📂 Estrutura do Projeto

```
gerenciador-empregos-cliente/
│
├── 📁 pages/                      # Páginas HTML
│   ├── login-selection.html       # Seleção de tipo de login
│   ├── login.html                 # Login de usuário
│   ├── company-login.html         # Login de empresa
│   ├── cadastro.html              # Cadastro de usuário
│   ├── company-register.html      # Cadastro de empresa
│   ├── painel.html                # Painel do usuário
│   ├── company-panel.html         # Painel da empresa
│   ├── editar.html                # Edição de perfil (usuário)
│   ├── company-edit.html          # Edição de perfil (empresa)
│   ├── job-search.html            # Busca de vagas
│   ├── job-detail.html            # Detalhes e candidatura em vaga
│   ├── my-applications.html       # Minhas candidaturas (usuário)
│   ├── job-create.html            # Criar nova vaga (empresa)
│   ├── job-edit.html              # Editar vaga (empresa)
│   ├── my-jobs.html               # Minhas vagas (empresa)
│   ├── job-applicants.html        # Candidatos da vaga (empresa)
│   ├── config-server.html         # Configuração do servidor
│   └── stress-test.html           # Teste de carga (desenvolvimento)
│
├── 📁 assets/                     # Recursos estáticos
│   ├── 📁 css/                    # Arquivos de estilo
│   │   ├── style.css              # Estilos globais
│   │   ├── painel.css             # Estilos do painel
│   │   └── config-server.css      # Estilos da configuração
│   └── 📁 js/                     # Scripts JavaScript
│       ├── api.js                 # Comunicação com API (usuários)
│       ├── company-api.js         # Comunicação com API (empresas)
│       └── jobs-api.js            # Comunicação com API (vagas)
│
├── 📁 docs/                       # Documentação adicional
│   ├── GUIA-CONFIGURACAO.txt      # Guia rápido de configuração
│   └── CHANGELOG.md               # Histórico de alterações
│
├── 📄 index.html                  # Página inicial (redireciona)
├── 📄 README.md                   # Este arquivo
├── 📄 README.txt                  # Versão em texto plano
├── 📄 .gitignore                  # Arquivos ignorados pelo Git
└── 📄 LICENSE                     # Licença MIT
```
│   ├── 📁 css/                 # Arquivos de estilo
│   │   ├── style.css           # Estilos globais (login, cadastro, config)
│   │   ├── painel.css          # Estilos do painel e edição
│   │   └── config-server.css   # Estilos da configuração
│   └── 📁 js/                  # Scripts JavaScript
│       └── api.js              # Módulo de comunicação com a API
│
├── 📁 docs/                     # Documentação adicional
│   ├── GUIA-CONFIGURACAO.txt   # Guia rápido de configuração
│   └── CHANGELOG.md            # Histórico de alterações
│
├── 📄 index.html                # Página inicial (redireciona automaticamente)
├── 📄 README.md                 # Este arquivo
├── 📄 README.txt                # Versão em texto plano
├── 📄 .gitignore                # Arquivos ignorados pelo Git
└── 📄 LICENSE                   # Licença MIT
```

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilização moderna com gradientes, animações e responsividade
- **JavaScript ES6+** - Lógica, validações e comunicação com API

### **Recursos Web**
- **Fetch API** - Requisições HTTP assíncronas
- **LocalStorage** - Armazenamento persistente (configuração do servidor)
- **SessionStorage** - Armazenamento temporário (tokens JWT)

### **Backend (Separado)**
- **Laravel 12** - Framework PHP para API REST
- **MySQL/PostgreSQL** - Banco de dados
- **JWT** - Autenticação via tokens (60 minutos de validade)

---

## 🔐 Sistema de Autenticação

### **Fluxo de Login - Usuário**

```
Usuario -> POST /login -> Backend -> Retorna JWT Token
         -> Salva no SessionStorage
         -> Redireciona para Painel
```

### **Fluxo de Login - Empresa**

```
Empresa -> POST /login -> Backend -> Retorna JWT Token
        -> Salva no SessionStorage
        -> Redireciona para Painel da Empresa
```

### **Proteção de Rotas**

- ✅ Todas as requisições autenticadas incluem: `Authorization: Bearer {token}`
- ✅ Token JWT expira em **60 minutos** - após isso, login novamente
- ✅ Cada usuário acessa apenas seu próprio perfil
- ✅ Cada empresa acessa apenas suas próprias vagas
- 🔒 Tentativas de acessar dados alheios retornam **403 Forbidden**

---

## 📡 API - Endpoints do Laravel

### **Autenticação**

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `POST` | `/login` | Login (usuário/empresa) | ❌ Não |
| `POST` | `/logout` | Logout | ✅ Sim |

### **Usuários (Candidatos)**

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `POST` | `/users` | Criar novo usuário | ❌ Não |
| `GET` | `/users/{id}` | Obter dados do usuário | ✅ Sim |
| `PATCH` | `/users/{id}` | Atualizar usuário | ✅ Sim |
| `DELETE` | `/users/{id}` | Deletar usuário | ✅ Sim |

### **Empresas**

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `POST` | `/companies` | Criar empresa | ❌ Não |
| `GET` | `/companies/{id}` | Obter dados da empresa | ✅ Sim |
| `PATCH` | `/companies/{id}` | Atualizar empresa | ✅ Sim |
| `DELETE` | `/companies/{id}` | Deletar empresa | ✅ Sim |

### **Vagas de Emprego**

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `GET` | `/jobs` | Listar todas as vagas | ❌ Não |
| `POST` | `/jobs` | Criar nova vaga | ✅ Sim (Empresa) |
| `GET` | `/jobs/{id}` | Obter detalhes da vaga | ❌ Não |
| `PATCH` | `/jobs/{id}` | Atualizar vaga | ✅ Sim (Dono) |
| `DELETE` | `/jobs/{id}` | Deletar vaga | ✅ Sim (Dono) |
| `POST` | `/companies/{id}/jobs` | Listar vagas da empresa | ✅ Sim |

### **Candidaturas**

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `POST` | `/jobs/{id}/apply` | Candidatar a vaga | ✅ Sim (Usuário) |
| `GET` | `/users/{id}/applications` | Minhas candidaturas | ✅ Sim |
| `PATCH` | `/applications/{id}` | Enviar feedback | ✅ Sim (Empresa) |
| `GET` | `/jobs/{id}/applicants` | Candidatos da vaga | ✅ Sim (Dono) |

---

## 🎨 Validações e Regras

**Cadastro de Usuário**

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| Nome | ✅ Sim | Mínimo 3 caracteres |
| Username | ✅ Sim | Único, apenas letras/números/underscore |
| Senha | ✅ Sim | Apenas alfanumérico (sem especiais) |
| Email | ❌ Não | Único, formato válido |
| Telefone | ❌ Não | Livre |
| Experiência | ❌ Não | Livre |
| Formação | ❌ Não | Livre |

**Cadastro de Empresa**

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| Nome | ✅ Sim | Único, mínimo 3 caracteres |
| Ramo | ✅ Sim | Seleção de opções |
| Username | ✅ Sim | Único, apenas letras/números/underscore |
| Senha | ✅ Sim | Apenas alfanumérico |
| Email | ✅ Sim | Único, formato válido |
| Telefone | ❌ Não | Formato brasileiro |
| Endereço | ✅ Sim | Rua, número, cidade, estado |

**Publicação de Vaga**

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| Título | ✅ Sim | 3-150 caracteres |
| Área | ✅ Sim | Seleção de 24 áreas |
| Descrição | ✅ Sim | 10-5000 caracteres |
| Localização | ✅ Sim | Estado + Cidade |
| Salário | ❌ Não | Numérico, > 0 |

**Regras de Negócio**

- 🔒 **Username** é único e **não pode ser alterado** após criação
- 📧 **Email** é único mas pode ser alterado
- 🔤 **Nome** é convertido para MAIÚSCULAS automaticamente
- 🔑 **Senha** deve ser alfanumérica (validada pelo Laravel)
- ⏱️ **Token JWT** expira em 60 minutos
- 📝 **Vagas ativas** não podem ser deletadas
- 👥 **Feedback** enviado pela empresa aparece nas candidaturas do usuário

---

## 🌟 Recursos Especiais

### **Visualização no Network do Navegador**

✅ Todas as requisições HTTP aparecem no **Network** do navegador (F12)  
✅ Corpo da requisição (Request) está visível  
✅ Resposta (Response) está visível  
✅ Tempo de execução é rastreável  

Isso é importante para **auditoria e avaliação**.

### **Delay nos Redirecionamentos**

✅ Redirecionamentos aguardam **500ms** para garantir que a requisição apareça no Network  
✅ Implementado via função `navigateAfterApiCall()`  

---

## 🌐 Tipos de Usuário e Fluxos

### **Fluxo do Usuário (Candidato)**

```
Seleção Login
     ↓
Cadastro ou Login (Usuário)
     ↓
Painel do Usuário
     ├─ Buscar Vagas
     │  └─ Ver Detalhes e Candidatar
     ├─ Minhas Candidaturas
     │  └─ Ver Feedback da Empresa
     ├─ Editar Perfil
     ├─ Deletar Conta
     └─ Logout
```

### **Fluxo da Empresa**

```
Seleção Login
     ↓
Cadastro ou Login (Empresa)
     ↓
Painel da Empresa
     ├─ Minhas Vagas
     │  ├─ Criar Vaga
     │  ├─ Editar Vaga
     │  ├─ Excluir Vaga
     │  └─ Ver Candidatos
     │     └─ Enviar Feedback
     ├─ Editar Perfil
     ├─ Deletar Empresa
     └─ Logout
```

---

## 📋 Solução de Problemas

### ❌ **Erro: "Falha na conexão com o servidor"**

**Possíveis causas:**
- Backend Laravel não está rodando
- URL do servidor configurada incorretamente
- Firewall bloqueando a porta
- CORS não configurado no Laravel

**Solução:**
1. Verifique se o Laravel está rodando: `php artisan serve`
2. Vá em **"⚙️ Configurar Servidor"**
3. Clique em **"🧪 Testar Conexão"**
4. Ajuste a URL se necessário

### ❌ **Erro: "Invalid Token" ou "Unauthenticated"**

**Causa:** Token JWT expirado (válido por 60 minutos)
**Solução:** Faça **logout** e **login** novamente

### ❌ **Erro: "403 Forbidden"**

**Causa:** Tentando acessar dados/vagas de outro usuário/empresa
**Solução:** Você só pode acessar seus próprios dados

### ❌ **Erro: "CORS Policy"**

**Causa:** Backend Laravel sem CORS configurado
**Solução no Backend:**
```php
// config/cors.php
'paths' => ['*'],
'allowed_origins' => ['*'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

### ❌ **Vagas não aparecem em "Minhas Vagas"**

**Causa:** Dados não carregaram corretamente
**Solução:**
1. Abra o **Console** (F12)
2. Verifique se há erros
3. Clique em **"🔄 Atualizar"**

---

## 🤝 Trabalho em Equipe / Colaboração

### **Cenário 1: Servidor Local (mesma máquina)**

```bash
# Backend
php artisan serve
# http://localhost:8000

# Frontend
# Configure: http://localhost:8000
```

### **Cenário 2: Servidor na Rede Local (LAN)**

**Máquina 1 (Backend):**
```bash
# IP Local: 192.168.1.10
php artisan serve --host=0.0.0.0 --port=8000
```

**Máquina 2 (Frontend):**
- Configure: `http://192.168.1.10:8000`

### **Cenário 3: Via VPN (Hamachi / Radmin)**

**Máquina 1 (Backend):**
```bash
# IP VPN: 26.13.125.160
php artisan serve --host=26.13.125.160 --port=8000
```

**Máquina 2 (Frontend):**
- Configure: `http://26.13.125.160:8000`

### **Cenário 4: Servidor em Produção (Nuvem)**

```bash
# Backend em servidor (Heroku, DigitalOcean, AWS, etc.)
https://api.meuapp.com

# Frontend Configure:
https://api.meuapp.com
```

---

## � Estrutura de Dados

### **Modelo de Usuário**

```json
{
  "id": 1,
  "username": "joao123",
  "name": "JOÃO SILVA",
  "email": "joao@email.com",
  "phone": "11999998888",
  "experience": "5 anos em desenvolvimento",
  "education": "Bacharelado em CC",
  "created_at": "2025-10-20T10:30:00Z",
  "updated_at": "2025-10-20T10:30:00Z"
}
```

### **Modelo de Empresa**

```json
{
  "id": 1,
  "username": "empresa123",
  "name": "Empresa XYZ",
  "business": "Tecnologia",
  "email": "contato@empresa.com",
  "phone": "1133334444",
  "street": "Rua das Flores",
  "number": 123,
  "city": "São Paulo",
  "state": "SP",
  "created_at": "2025-10-20T10:30:00Z"
}
```

### **Modelo de Vaga**

```json
{
  "job_id": 1,
  "company_id": 1,
  "title": "Desenvolvedor Full Stack",
  "area": "Tecnologia da Informação",
  "description": "Procuramos um desenvolvedor...",
  "state": "SP",
  "city": "São Paulo",
  "salary": 5000.00,
  "contact": "rh@empresa.com",
  "created_at": "2025-10-20T10:30:00Z"
}
```

### **Modelo de Candidatura**

```json
{
  "application_id": 1,
  "user_id": 1,
  "job_id": 1,
  "status": "pending",
  "feedback": "Obrigado pela candidatura...",
  "created_at": "2025-10-20T10:30:00Z",
  "updated_at": "2025-10-20T10:30:00Z"
}
```

---

## 🔧 Configuração do Backend Laravel

### **Requisitos do Backend**

- PHP 8.2+
- Laravel 12
- MySQL 8.0+ ou PostgreSQL 13+
- Composer

### **Endpoints Necessários**

O backend Laravel deve implementar os endpoints listados na seção **📡 API - Endpoints do Laravel** acima.

### **Configurações Essenciais**

```env
# .env do Laravel
APP_URL=http://localhost:8000

# Configurar CORS
SANCTUM_STATEFUL_DOMAINS=localhost:8080,127.0.0.1:8080
```

**Solução:**
- Faça **logout** e **login** novamente
- Um novo token será gerado

### ❌ **Erro: "403 Forbidden"**

**Causa:** Tentando acessar ou editar perfil de outro usuário

**Solução:**
- Você só pode visualizar/editar seu próprio perfil

### ❌ **Campos não salvam ao editar**

**Causa:** Campos vazios ou formato inválido

**Solução:** Verifique o Console (F12) para mensagens de erro

---

## 🎨 Design e Interface

### **Paleta de Cores**

- **Primary:** `#667eea` → `#764ba2` (Gradiente Roxo)
- **Success:** `#4facfe` → `#00f2fe` (Gradiente Azul)
- **Danger:** `#fc8181` → `#f56565` (Gradiente Vermelho)
- **Info:** `#4299e1` (Azul)
- **Secondary:** `#718096` → `#4a5568` (Gradiente Cinza)

### **Recursos Visuais**

- ✨ Animações suaves e modernas
- 🎨 Gradientes vibrantes
- 📱 Design totalmente responsivo
- ♿ Interface acessível e intuitiva
- 🌙 Sombras e profundidade

---

## 🔄 Fluxo de Requisições HTTP

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │ Requisição HTTP
       ├─ Método (GET, POST, PATCH, DELETE)
       ├─ URL (http://localhost:8000/...)
       ├─ Headers (Authorization: Bearer token)
       └─ Body (JSON com dados)
       │
       ↓ [Network - F12 mostra tudo]
       │
┌──────────────────┐
│  Laravel API     │
├──────────────────┤
│ - Validação      │
│ - Autenticação   │
│ - Lógica         │
│ - Banco de Dados │
└──────┬───────────┘
       │ Resposta HTTP
       ├─ Status (200, 201, 400, 401, 403, 404, etc)
       ├─ Headers (Content-Type, etc)
       └─ Body (JSON com resultado)
       │
       ↓ [Network mostra resposta completa]
       │
┌─────────────┐
│   Cliente   │ ← Processa resposta
└─────────────┘
```

---

## � Dicas de Desenvolvimento

### **Para Testar a API**

1. Abra o **DevTools** (F12)
2. Vá até a aba **"Network"**
3. Realize uma ação (login, cadastro, busca, etc)
4. Clique na requisição na lista
5. Veja:
   - **Request** - O que foi enviado
   - **Response** - O que você recebeu
   - **Status** - Code HTTP (200, 201, 400, 401, etc)

### **Para Debugar Problemas**

1. Abra o **Console** (F12)
2. Procure por erros em vermelho
3. Verifique os logs com `console.log()`
4. Verifique o **Network** para ver se a requisição chegou

### **Validações do Frontend**

- ✅ Todos os campos obrigatórios são validados
- ✅ Feedback visual de erros
- ✅ Desabilitação de botão durante requisição
- ✅ Loading indicators

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**GiovanneMika**  
📧 GitHub: [@GiovanneMika](https://github.com/GiovanneMika)

---

## 🎓 Contexto Acadêmico

**Disciplina:** Tecnologias Cliente Servidor  
**Projeto:** Sistema de Gerenciamento de Vagas de Emprego  
**Semestre:** 2025.1

---

## 📖 Documentação Adicional

- 📘 [GUIA-CONFIGURACAO.txt](docs/GUIA-CONFIGURACAO.txt) - Guia rápido
- 📗 [CHANGELOG.md](docs/CHANGELOG.md) - Histórico de versões
- 📕 [README.txt](README.txt) - Versão texto plano

---

⭐ **Desenvolvido com dedicação para a disciplina de Tecnologias Cliente Servidor**
