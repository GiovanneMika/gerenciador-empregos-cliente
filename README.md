# 🌐 Gerenciador de Empregos - Cliente

> Parte cliente do projeto de gerenciamento de vagas da disciplina de Tecnologias Cliente Servidor

## 📋 Sobre o Projeto

Sistema web para gerenciamento de perfis de candidatos a vagas de emprego. O cliente se comunica com uma API REST desenvolvida em AdonisJS, permitindo que usuários:

- 📝 Cadastrem-se no sistema
- 🔐 Façam login seguro com JWT
- 👤 Visualizem e editem seus perfis
- 🗑️ Excluam suas contas
- ⚙️ **Configurem o servidor da API dinamicamente**

## 🚀 Configuração do Servidor

### Como Usar

1. **Abra qualquer página** (Login, Cadastro ou Painel)
2. **Clique em "⚙️ Configurar Servidor"**
3. **Digite a URL do servidor** da API
4. **Teste a conexão** antes de salvar
5. **Salve** e pronto!

### Exemplos de URLs Válidas

```
http://localhost:8000              # Servidor local
http://192.168.1.10:8000          # Servidor na rede local
http://26.13.125.160:8000         # Servidor remoto (Hamachi/Radmin VPN)
http://meuservidor.com:8000       # Servidor com domínio
```

### ⚠️ Importante

- ✅ Use `http://` ou `https://` no início
- ❌ **NÃO adicione** `/api` no final
- ✅ Configure uma vez e use em qualquer dispositivo
- ✅ A configuração fica salva no navegador (localStorage)

## 📂 Estrutura de Arquivos

```
gerenciador-empregos-cliente/
│
├── 📁 pages/                    # Páginas HTML
│   ├── login.html              # Página de login
│   ├── cadastro.html           # Página de cadastro
│   ├── painel.html             # Painel do usuário
│   ├── editar.html             # Editar perfil
│   └── config-server.html      # Configurar servidor da API
│
├── 📁 assets/                   # Recursos estáticos
│   ├── 📁 css/                 # Arquivos de estilo
│   │   ├── style.css           # Estilos globais
│   │   └── painel.css          # Estilos do painel
│   └── 📁 js/                  # Scripts JavaScript
│       └── api.js              # Comunicação com a API
│
├── 📁 docs/                     # Documentação
│   ├── GUIA-CONFIGURACAO.txt   # Guia rápido de configuração
│   └── CHANGELOG.md            # Histórico de alterações
│
├── 📄 index.html                # Página inicial (redireciona)
├── 📄 README.md                 # Este arquivo
└── 📄 LICENSE                   # Licença do projeto
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e design responsivo
- **JavaScript (ES6+)** - Lógica e comunicação com API
- **Fetch API** - Requisições HTTP
- **JWT** - Autenticação segura
- **LocalStorage** - Armazenamento de configurações
- **SessionStorage** - Gerenciamento de sessão

## 🔐 Sistema de Autenticação

### Fluxo de Login

1. Usuário envia credenciais (`username` + `password`)
2. API retorna um **token JWT** válido por 60 minutos
3. Token é armazenado no **sessionStorage**
4. Todas as requisições incluem o header: `Authorization: Bearer {token}`

### Proteção de Rotas

- ✅ Páginas protegidas verificam se há token válido
- ❌ Acesso negado redireciona para login
- 🔒 Cada usuário só pode ver/editar seu próprio perfil

## 📡 API - Endpoints Utilizados

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/users` | Criar novo usuário |
| `POST` | `/login` | Autenticar usuário |
| `GET` | `/users/{id}` | Ver dados do usuário |
| `PATCH` | `/users/{id}` | Atualizar dados |
| `DELETE` | `/users/{id}` | Deletar conta |
| `POST` | `/logout` | Fazer logout |

## 🎨 Funcionalidades

### ✅ Implementadas

- [x] Cadastro de usuários
- [x] Login com JWT
- [x] Visualização de perfil
- [x] Edição de perfil
- [x] Exclusão de conta
- [x] Logout
- [x] **Configuração dinâmica do servidor**
- [x] **Teste de conexão com servidor**
- [x] Validação de formulários
- [x] Mensagens de erro amigáveis
- [x] Design responsivo

### 🔄 Validações do Frontend

- Nome, username, email, senha obrigatórios no cadastro
- Username: apenas letras, números e underscore (`_`)
- Senha: apenas alfanumérico (sem caracteres especiais)
- Email: formato válido
- Campos opcionais: telefone, experiência, formação

## 🚀 Como Executar

### Opção 1: Abrir Diretamente no Navegador

```bash
# Clone o repositório
git clone https://github.com/GiovanneMika/gerenciador-empregos-cliente.git

# Entre na pasta
cd gerenciador-empregos-cliente

# Abra index.html no navegador (redireciona automaticamente)
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Opção 2: Usar um Servidor Local

```bash
# Python 3
python -m http.server 8080

# Node.js (com http-server instalado)
npx http-server -p 8080

# Acesse: http://localhost:8080/login.html
```

### Opção 3: Live Server (VS Code)

1. Instale a extensão **Live Server**
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## ⚙️ Configuração Inicial

1. **Configure o servidor da API**:
   - Acesse "⚙️ Configurar Servidor"
   - Digite a URL do servidor backend
   - Teste a conexão
   - Salve

2. **Crie uma conta**:
   - Vá em "Cadastre-se"
   - Preencha os dados
   - Clique em "Cadastrar"

3. **Faça login**:
   - Digite username e senha
   - Clique em "Entrar"

4. **Use o sistema**:
   - Veja seu perfil
   - Edite seus dados
   - Configure o servidor quando necessário

## 🐛 Solução de Problemas

### ❌ "Falha na conexão com o servidor"

**Possíveis causas:**
- Servidor da API não está rodando
- URL configurada está incorreta
- Firewall bloqueando a conexão
- Porta do servidor está errada

**Solução:**
1. Verifique se o servidor backend está rodando
2. Vá em "⚙️ Configurar Servidor"
3. Teste a conexão
4. Ajuste a URL se necessário

### ❌ "Invalid Token"

**Causa:** Token expirado (60 minutos)

**Solução:** Faça login novamente

### ❌ "Forbidden"

**Causa:** Tentando acessar perfil de outro usuário

**Solução:** Use apenas seu próprio perfil

## 📝 Regras de Negócio

- ✅ Username é **único** e **imutável** (não pode ser alterado)
- ✅ Email é **único** mas pode ser alterado
- ✅ Senha deve ser **alfanumérica** (sem caracteres especiais)
- ✅ Nome é convertido para **MAIÚSCULAS** automaticamente
- ✅ Token JWT expira em **60 minutos**
- ✅ Usuário só pode ver/editar/deletar **próprio perfil**

## 👥 Trabalho em Equipe

### Para usar o servidor de um colega:

1. **Colega 1** (servidor):
   ```bash
   # Descubra seu IP local
   ipconfig  # Windows
   ifconfig  # Linux/Mac
   
   # Inicie o servidor na porta 8000
   # Ex: Servidor rodando em 192.168.1.10:8000
   ```

2. **Colega 2** (cliente):
   - Acesse "⚙️ Configurar Servidor"
   - Digite: `http://192.168.1.10:8000`
   - Teste a conexão
   - Salve
   - Use o sistema normalmente!

### Com Hamachi/Radmin VPN:

1. Conecte-se à mesma rede virtual
2. Use o IP da VPN (ex: `http://26.13.125.160:8000`)
3. Configure no cliente
4. Pronto!

## 📚 Documentação da API

Para mais detalhes sobre a API, consulte a documentação completa do backend.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**GiovanneMika**
- GitHub: [@GiovanneMika](https://github.com/GiovanneMika)

---

⭐ **Tecnologias Cliente Servidor** - Gerenciador de Empregos
