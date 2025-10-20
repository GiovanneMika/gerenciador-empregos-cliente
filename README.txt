================================================================================
    GERENCIADOR DE EMPREGOS - CLIENTE
    Sistema de Gerenciamento de Candidatos a Vagas
================================================================================

SOBRE O PROJETO
--------------------------------------------------------------------------------
Sistema web desenvolvido para a disciplina de Tecnologias Cliente Servidor.
Permite o gerenciamento completo de perfis de candidatos a vagas de emprego.

TECNOLOGIAS UTILIZADAS:
  - Frontend: HTML5, CSS3, JavaScript ES6+
  - Backend: Laravel 12 (API REST)
  - Autenticacao: JWT (JSON Web Token)
  - Armazenamento: LocalStorage, SessionStorage


FUNCIONALIDADES PRINCIPAIS
--------------------------------------------------------------------------------
[x] Cadastro de usuarios com validacao de dados
[x] Login seguro com autenticacao JWT
[x] Visualizacao de perfil completo
[x] Edicao de dados pessoais
[x] Exclusao de conta
[x] Configuracao dinamica do servidor (sem editar codigo!)
[x] Suporte a multiplos ambientes (local, rede, VPN, nuvem)
[x] Design responsivo e moderno


COMO EXECUTAR O PROJETO
================================================================================

PRE-REQUISITOS:
--------------------------------------------------------------------------------
1. Backend Laravel 12 rodando (veja repositorio do backend)
2. Navegador web moderno (Chrome, Firefox, Edge, Safari)
3. (Opcional) Servidor HTTP local


OPCAO 1: ABRIR DIRETAMENTE NO NAVEGADOR
--------------------------------------------------------------------------------
1. Clone o repositorio:
   git clone https://github.com/GiovanneMika/gerenciador-empregos-cliente.git

2. Entre na pasta:
   cd gerenciador-empregos-cliente

3. Abra o arquivo index.html no navegador:
   - Windows: start index.html
   - macOS: open index.html
   - Linux: xdg-open index.html


OPCAO 2: USAR SERVIDOR HTTP LOCAL (RECOMENDADO)
--------------------------------------------------------------------------------

COM PYTHON:
  python -m http.server 8080
  Acesse: http://localhost:8080

COM NODE.JS:
  npm install -g http-server
  http-server -p 8080
  Acesse: http://localhost:8080

COM PHP:
  php -S localhost:8080
  Acesse: http://localhost:8080


OPCAO 3: VS CODE LIVE SERVER
--------------------------------------------------------------------------------
1. Instale a extensao "Live Server" no VS Code
2. Clique com botao direito em index.html
3. Selecione "Open with Live Server"
4. O navegador abrira automaticamente


CONFIGURACAO INICIAL
================================================================================

PASSO 1: CONFIGURAR O SERVIDOR BACKEND
--------------------------------------------------------------------------------
Na primeira vez que acessar o sistema:

1. Voce sera redirecionado para a tela de Login
2. Clique em "Configurar Servidor" (canto inferior direito)
3. Digite a URL do seu servidor Laravel:

   Exemplos:
   - http://localhost:8000           (Servidor local)
   - http://192.168.1.10:8000        (Servidor na rede local)
   - http://26.13.125.160:8000       (Servidor via VPN)
   - https://api.exemplo.com         (Servidor em producao)

4. Clique em "Testar Conexao" para verificar
5. Se aparecer "Conexao bem-sucedida!", clique em "Salvar"

IMPORTANTE: NAO adicione /api no final da URL!


PASSO 2: CRIAR SUA CONTA
--------------------------------------------------------------------------------
1. Na tela de login, clique em "Cadastre-se"
2. Preencha os dados:
   - Nome Completo (obrigatorio)
   - Username (obrigatorio, unico, imutavel)
   - Senha (obrigatorio, apenas alfanumerico)
   - Email (opcional, mas recomendado)
   - Telefone (opcional)
   - Experiencia (opcional)
   - Formacao (opcional)
3. Clique em "Cadastrar"
4. Voce sera redirecionado para o login


PASSO 3: FAZER LOGIN E USAR O SISTEMA
--------------------------------------------------------------------------------
1. Digite seu username e senha
2. Clique em "Entrar"
3. Voce sera levado ao Painel do Usuario
4. A partir dai voce pode:
   - Editar seus dados
   - Deletar sua conta
   - Fazer logout


ESTRUTURA DO PROJETO
================================================================================

gerenciador-empregos-cliente/
|
+-- pages/                      # Paginas HTML
|   +-- login.html              # Tela de login
|   +-- cadastro.html           # Tela de cadastro
|   +-- painel.html             # Painel do usuario
|   +-- editar.html             # Edicao de perfil
|   +-- config-server.html      # Configuracao do servidor
|
+-- assets/                     # Recursos estaticos
|   +-- css/                    # Arquivos de estilo
|   |   +-- style.css           # Estilos globais
|   |   +-- painel.css          # Estilos do painel
|   |   +-- config-server.css   # Estilos da configuracao
|   +-- js/                     # Scripts JavaScript
|       +-- api.js              # Comunicacao com a API
|
+-- docs/                       # Documentacao adicional
|   +-- GUIA-CONFIGURACAO.txt   # Guia rapido
|   +-- CHANGELOG.md            # Historico de versoes
|
+-- index.html                  # Pagina inicial
+-- README.md                   # Documentacao completa
+-- README.txt                  # Este arquivo
+-- .gitignore                  # Arquivos ignorados
+-- LICENSE                     # Licenca MIT


API - ENDPOINTS DO LARAVEL
================================================================================

Metodo | Rota          | Descricao                  | Autenticacao
-------|---------------|----------------------------|--------------
POST   | /users        | Criar novo usuario         | Nao
POST   | /login        | Autenticar usuario         | Nao
GET    | /users/{id}   | Obter dados do usuario     | Sim
PATCH  | /users/{id}   | Atualizar dados            | Sim
DELETE | /users/{id}   | Deletar conta              | Sim
POST   | /logout       | Invalidar token (logout)   | Sim


VALIDACOES E REGRAS
================================================================================

CADASTRO DE USUARIO:
Campo       | Obrigatorio | Regras
------------|-------------|------------------------------------------
Nome        | Sim         | Minimo 3 caracteres
Username    | Sim         | Unico, apenas letras/numeros/underscore
Senha       | Sim         | Apenas alfanumerico (sem especiais)
Email       | Nao         | Unico, formato valido
Telefone    | Nao         | Livre
Experiencia | Nao         | Livre
Formacao    | Nao         | Livre


REGRAS DE NEGOCIO:
- Username e unico e NAO PODE ser alterado apos criacao
- Email e unico mas pode ser alterado
- Nome e convertido para MAIUSCULAS automaticamente pelo backend
- Senha deve ser alfanumerica (Laravel valida)
- Token JWT expira em 60 minutos


SOLUCAO DE PROBLEMAS
================================================================================

ERRO: "Falha na conexao com o servidor"
--------------------------------------------------------------------------------
Possiveis causas:
- Backend Laravel nao esta rodando
- URL do servidor configurada incorretamente
- Firewall bloqueando a porta
- CORS nao configurado no Laravel

Solucao:
1. Verifique se o Laravel esta rodando:
   php artisan serve
   
2. Va em "Configurar Servidor"
3. Clique em "Testar Conexao"
4. Ajuste a URL se necessario
5. Verifique as configuracoes de CORS no Laravel


ERRO: "Invalid Token" ou "Unauthenticated"
--------------------------------------------------------------------------------
Causa: Token JWT expirado (valido por 60 minutos)

Solucao: Faca logout e login novamente


ERRO: "403 Forbidden"
--------------------------------------------------------------------------------
Causa: Tentando acessar ou editar perfil de outro usuario

Solucao: Voce so pode visualizar/editar seu proprio perfil


ERRO: "CORS Policy"
--------------------------------------------------------------------------------
Causa: Backend Laravel sem CORS configurado

Solucao no Backend Laravel (config/cors.php):
'paths' => ['*'],
'allowed_origins' => ['*'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],


TRABALHO EM EQUIPE / COLABORACAO
================================================================================

CENARIO 1: SERVIDOR LOCAL (MESMA MAQUINA)
--------------------------------------------------------------------------------
Backend Laravel:
  php artisan serve
  # Servidor rodando em: http://localhost:8000

Frontend (cliente):
  Configure: http://localhost:8000


CENARIO 2: SERVIDOR NA REDE LOCAL (LAN)
--------------------------------------------------------------------------------
Maquina 1 (Backend Laravel):
  # Descubra seu IP local
  ipconfig           # Windows
  ip addr show       # Linux
  ifconfig           # macOS
  
  # Exemplo de IP: 192.168.1.10
  
  # Inicie o Laravel permitindo conexoes externas
  php artisan serve --host=0.0.0.0 --port=8000

Maquina 2 (Frontend Cliente):
  1. Abra o sistema no navegador
  2. Va em "Configurar Servidor"
  3. Digite: http://192.168.1.10:8000
  4. Teste e salve


CENARIO 3: VIA VPN (HAMACHI / RADMIN VPN)
--------------------------------------------------------------------------------
Maquina 1 (Backend):
  # Conecte-se a VPN
  # Descubra o IP da VPN (ex: 26.13.125.160)
  
  php artisan serve --host=26.13.125.160 --port=8000

Maquina 2 (Frontend):
  1. Conecte-se a mesma rede VPN
  2. Configure: http://26.13.125.160:8000


CENARIO 4: SERVIDOR EM PRODUCAO (NUVEM)
--------------------------------------------------------------------------------
Backend em servidor (Heroku, DigitalOcean, AWS, etc.)
Exemplo: https://api.meuapp.com

Configure no frontend: https://api.meuapp.com


CONFIGURACAO DO BACKEND LARAVEL
================================================================================

REQUISITOS DO BACKEND:
- PHP 8.2+
- Laravel 12
- MySQL 8.0+ ou PostgreSQL 13+
- Composer

CONFIGURACOES ESSENCIAIS (.env do Laravel):
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8080,127.0.0.1:8080


EXEMPLO DE USUARIO (JSON)
================================================================================
{
  "id": 1,
  "username": "joao123",
  "name": "JOAO SILVA",
  "email": "joao@email.com",
  "phone": "11999998888",
  "experience": "5 anos em desenvolvimento web",
  "education": "Bacharelado em Ciencia da Computacao",
  "created_at": "2025-10-20T10:30:00.000000Z",
  "updated_at": "2025-10-20T10:30:00.000000Z"
}


DESIGN E INTERFACE
================================================================================

PALETA DE CORES:
- Primary:   #667eea -> #764ba2 (Gradiente Roxo)
- Success:   #4facfe -> #00f2fe (Gradiente Azul)
- Danger:    #fc8181 -> #f56565 (Gradiente Vermelho)
- Info:      #4299e1 (Azul)
- Secondary: #718096 -> #4a5568 (Gradiente Cinza)

RECURSOS VISUAIS:
- Animacoes suaves e modernas
- Gradientes vibrantes
- Design totalmente responsivo
- Interface acessivel e intuitiva
- Sombras e profundidade


LICENCA
================================================================================
Este projeto esta sob a licenca MIT.
Veja o arquivo LICENSE para mais detalhes.


AUTOR
================================================================================
GiovanneMika
GitHub: https://github.com/GiovanneMika


CONTEXTO ACADEMICO
================================================================================
Disciplina: Tecnologias Cliente Servidor
Projeto: Sistema de Gerenciamento de Candidatos a Vagas
Semestre: 2025.1


DOCUMENTACAO ADICIONAL
================================================================================
- GUIA-CONFIGURACAO.txt - Guia rapido de configuracao
- CHANGELOG.md - Historico de versoes e alteracoes
- README.md - Documentacao completa em Markdown


================================================================================
Desenvolvido com dedicacao para a disciplina de Tecnologias Cliente Servidor
================================================================================
