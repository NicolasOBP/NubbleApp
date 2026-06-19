# NubbleApp

Aplicativo mobile de rede social desenvolvido em **React Native**, inspirado em plataformas como Instagram. O projeto foi construído durante o **curso profissionalizante de React Native da [Coffstack](https://coffstack.com.br)**, seguindo boas práticas de arquitetura, tipagem, testes e qualidade de código aplicadas em produção.

---

## Sobre o projeto

O **Nubble** é uma rede social focada em conexões reais. O app permite que usuários:

- Criem conta, façam login e recuperem senha
- Visualizem um feed de posts com scroll infinito
- Publiquem fotos capturadas pela câmera ou selecionadas da galeria
- Curtam, favoritem e comentem publicações
- Busquem outros usuários e acessem seus perfis
- Sigam e deixem de seguir pessoas
- Gerenciem perfil, e-mail e senha
- Recebam notificações push e naveguem diretamente para telas relevantes
- Alternem entre tema claro, escuro ou automático (sistema)

O fluxo completo cobre **onboarding**, **autenticação**, **área logada com abas** e diversas telas modais/stack para funcionalidades secundárias.

Durante o curso, o app consome um **backend próprio fornecido pela Coffstack**, executado localmente via **Docker**. Essa integração full-stack permitiu trabalhar com autenticação JWT, upload de imagens, paginação e demais fluxos reais de uma API REST — além de desenvolver conhecimento prático em **Docker como ambiente de backend** (subir containers, expor portas, conectar o app mobile ao serviço local).

---

## Backend e Docker

O NubbleApp não funciona isoladamente: ele se comunica com a **Nubble API**, um backend REST desenvolvido para o curso e disponibilizado em container Docker.

| Aspecto               | Detalhe                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------ |
| **Base URL**          | `http://127.0.0.1:3333/` (configurada em `src/api/apiConfig.ts`)                           |
| **Execução**          | Backend rodando em Docker durante o desenvolvimento                                        |
| **Integração mobile** | No Android, a porta é exposta ao emulador/dispositivo via `npm run art:3333` (ADB reverse) |

### O que o backend cobre

- Autenticação (login, cadastro, refresh token, recuperação de senha)
- CRUD de posts com upload de imagens
- Comentários, reações (curtidas/favoritos) e sistema de follow
- Busca de usuários e validação assíncrona (username/e-mail disponíveis)
- Notificações push (integração com Firebase no app)

### Aprendizado com Docker

A utilização do backend containerizado ao longo do curso proporcionou familiaridade com conceitos de **Docker aplicados ao backend**, como:

- Subir e gerenciar o serviço da API via containers
- Entender o mapeamento de portas entre host e container
- Conectar o app React Native (emulador ou dispositivo físico) a um backend local
- Manter um ambiente de desenvolvimento reproduzível e isolado da máquina host

---

## Tecnologias

### Core

| Tecnologia                                   | Versão | Uso                                          |
| -------------------------------------------- | ------ | -------------------------------------------- |
| [React Native](https://reactnative.dev)      | 0.82.1 | Framework mobile                             |
| [React](https://react.dev)                   | 19.1.1 | Biblioteca de UI                             |
| [TypeScript](https://www.typescriptlang.org) | 5.8.x  | Tipagem estática                             |
| [Expo](https://expo.dev)                     | 54.x   | Módulos nativos (ex.: manipulação de imagem) |
| Node.js                                      | ≥ 20   | Runtime de desenvolvimento                   |
| [Docker](https://www.docker.com)             | —      | Execução do backend Nubble API em container  |

### Navegação

| Biblioteca                       | Uso                                                    |
| -------------------------------- | ------------------------------------------------------ |
| `@react-navigation/native`       | Container de navegação                                 |
| `@react-navigation/native-stack` | Stack navigator (Auth, App, Onboarding)                |
| `@react-navigation/bottom-tabs`  | Tab bar principal (Home, Novo Post, Favoritos, Perfil) |
| `react-native-screens`           | Otimização de telas nativas                            |
| `react-native-safe-area-context` | Safe areas e insets                                    |

### Estado e dados

| Biblioteca              | Uso                                            |
| ----------------------- | ---------------------------------------------- |
| `@tanstack/react-query` | Cache, queries, mutations e paginação infinita |
| `zustand`               | Estado global leve (toast, histórico de busca) |
| `axios`                 | Cliente HTTP e interceptors                    |
| `react-hook-form`       | Gerenciamento de formulários                   |
| `@hookform/resolvers`   | Integração de validadores com react-hook-form  |
| `zod`                   | Schemas e validação de formulários             |

### UI e design system

| Biblioteca                | Uso                                          |
| ------------------------- | -------------------------------------------- |
| `@shopify/restyle`        | Design system tipado (cores, spacing, temas) |
| `react-native-svg`        | Ícones SVG customizados                      |
| `react-native-bootsplash` | Splash screen nativa                         |

### Armazenamento local

| Biblioteca                                  | Uso                                                 |
| ------------------------------------------- | --------------------------------------------------- |
| `react-native-mmkv`                         | Storage de alta performance (credenciais, settings) |
| `@react-native-async-storage/async-storage` | Implementação alternativa de storage                |

### Multimídia e permissões

| Biblioteca                              | Uso                                                   |
| --------------------------------------- | ----------------------------------------------------- |
| `react-native-vision-camera`            | Captura de fotos para publicação                      |
| `@react-native-camera-roll/camera-roll` | Acesso à galeria de fotos                             |
| `expo-image-manipulator`                | Compressão e preparo de imagens para upload           |
| `react-native-permissions`              | Solicitação de permissões (câmera, notificação, etc.) |

### Notificações

| Biblioteca                         | Uso                      |
| ---------------------------------- | ------------------------ |
| `@react-native-firebase/app`       | Core do Firebase         |
| `@react-native-firebase/messaging` | Push notifications (FCM) |

### Utilitários

| Biblioteca | Uso                                       |
| ---------- | ----------------------------------------- |
| `date-fns` | Formatação e manipulação de datas         |
| `lodash`   | Utilitários (alias `underscore` no Babel) |

### Qualidade de código e testes

| Biblioteca                               | Uso                                     |
| ---------------------------------------- | --------------------------------------- |
| `eslint` + `@react-native/eslint-config` | Linting                                 |
| `eslint-plugin-import`                   | Ordenação de imports                    |
| `@tanstack/eslint-plugin-query`          | Regras para React Query                 |
| `eslint-plugin-testing-library`          | Regras para testes                      |
| `prettier`                               | Formatação de código                    |
| `husky`                                  | Git hooks                               |
| `jest`                                   | Test runner                             |
| `@testing-library/react-native`          | Testes de componentes e integração      |
| `msw`                                    | Mock Service Worker para APIs em testes |

---

## Arquitetura

O projeto adota uma **arquitetura em camadas** inspirada em Clean Architecture e Domain-Driven Design, organizada dentro de `src/`:

```
src/
├── api/           # Configuração Axios, interceptors e adapters genéricos de paginação
├── assets/        # Ícones SVG, imagens e recursos visuais
├── brand/         # Identidade visual (logo)
├── Components/    # Componentes reutilizáveis de UI (Design System)
├── domain/        # Regras de negócio por domínio (Auth, Post, User, Follow, etc.)
├── form/          # Utilitários de formulário (validação assíncrona)
├── hooks/         # Hooks globais da aplicação
├── infra/         # Infraestrutura compartilhada (paginação, query keys)
├── routes/        # Navegação (stacks, tabs, tipos)
├── screens/       # Telas da aplicação (auth, app, onboarding)
├── service/       # Serviços transversais (auth, storage, toast, notificações)
├── templates/     # Templates de tela reutilizáveis
├── theme/         # Tema Restyle (cores, spacing, dark/light)
├── types/         # Tipos globais (ex.: paginação)
├── utils/         # Funções utilitárias
└── test/          # Setup Jest, MSW server, test-utils
```

### Camada de domínio (`domain/`)

Cada domínio segue o mesmo padrão de organização:

```
domain/Post/
├── postApi.ts        # Chamadas HTTP brutas (contrato da API)
├── postAdapter.ts    # Transformação API → modelo de domínio
├── postService.ts    # Orquestração (api + adapter)
├── postTypes.ts      # Tipos do domínio e da API
├── useCases/         # Hooks customizados (usePostList, usePostCreate, etc.)
└── index.ts          # Barrel export
```

**Domínios implementados:**

- **Auth** — login, cadastro, logout, refresh token, edição de senha, recuperação de senha
- **Post** — listagem paginada, criação, busca por ID
- **PostComment** — listagem, criação e remoção de comentários
- **PostReaction** — curtidas e favoritos com UI otimista
- **User** — perfil, busca, atualização, token de notificação
- **Follow** — seguir, deixar de seguir, listas de seguidores/seguindo

### Padrão Adapter

A API retorna dados em snake_case e formatos específicos do backend. Os **adapters** convertem esses dados para modelos de domínio tipados e legíveis:

```typescript
// postAdapter.ts — converte PostAPI → Post
function toPost(postAPI: PostAPI): Post {
  return {
    id: postAPI.id,
    text: postAPI.text,
    author: {
      /* ... */
    },
    reactionCount: parseInt(postAPI.meta.like_count, 10),
    // ...
  };
}
```

O `apiAdapter` generaliza a conversão de respostas paginadas (`PageAPI` → `Page<T>`).

### Camada de serviços (`service/`)

Serviços transversais que não pertencem a um domínio específico:

| Serviço           | Responsabilidade                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `authCredentials` | Context API para credenciais, persistência e interceptor HTTP                                                  |
| `storage`         | Abstração de storage com injeção de dependência (`MMKVStorage`, `AsyncStorage`, `inMemoryStorage` para testes) |
| `toast`           | Feedback visual (implementações Context e Zustand)                                                             |
| `notification`    | Firebase Cloud Messaging — token, deep linking via push                                                        |
| `permission`      | Permissões nativas (Android/iOS)                                                                               |
| `multimedia`      | Galeria, compressão e preparo de imagens para upload                                                           |
| `settings`        | Tema, splash screen, status bar                                                                                |
| `searchHistory`   | Histórico de buscas persistido com Zustand                                                                     |

### Infraestrutura (`infra/`)

- **`usePaginatedList`** — hook genérico de paginação infinita com `@tanstack/react-query` (`useInfiniteQuery`)
- **`QueryKeys`** — enum centralizado de chaves de cache
- **`useMutation`** — hook legado (substituído por React Query)

---

## Padrões e técnicas

### Inversão de dependência (Storage)

O storage é abstraído por uma interface e injetado na inicialização do app:

```typescript
// App.tsx
initializeStorate(MMKVStorage);
```

Isso permite trocar a implementação (MMKV, AsyncStorage ou in-memory nos testes) sem alterar o restante do código.

### Autenticação com refresh token

O `AuthCredentialsProvider` gerencia credenciais via Context API. Um **interceptor Axios** trata respostas `401`:

1. Tenta renovar o token com o refresh token
2. Reexecuta a requisição original com o novo token
3. Se falhar, remove as credenciais e redireciona para login

### React Query como camada de dados

- **Queries** para leitura (feed, perfil, comentários, busca)
- **Mutations** para escrita (login, criar post, reagir, seguir)
- **Invalidação de cache** após mutations (ex.: reagir a um post invalida `PostList`)
- **Paginação infinita** via `useInfiniteQuery` encapsulado em `usePaginatedList`

### UI otimista

Reações (curtir/favoritar) atualizam a interface imediatamente e revertem em caso de erro:

```typescript
function reactToPost() {
  toggleReactionState(); // UI otimista
  mutate(); // mutation em background
}
```

### Formulários tipados

Combinação de **react-hook-form + zod + componentes Form\***:

```typescript
const { control, handleSubmit } = useForm<LoginSchema>({
  resolver: zodResolver(loginSchema),
  mode: 'onChange',
});

<FormTextInput control={control} name="email" label="E-mail" />;
```

Schemas Zod ficam co-localizados com suas telas (`loginSchema.ts`, `signUpSchema.ts`, etc.).

### Validação assíncrona

Campos como username e e-mail são validados no servidor com debounce:

- `useDebounce` (1500ms) → `useValidationQuery` → React Query
- Impede submissão enquanto a validação está em andamento (`useAsyncValidation`)

### Design System com Restyle

Componentes base (`Box`, `Text`, `Button`, `Screen`) consomem o tema Restyle:

- Tokens de **spacing** (`s4`, `s8`, `s16`…)
- Tokens de **cores** com suporte a dark/light theme
- **Button presets** (`primary`, `outline`, `ghost`, `gray`) com estados disabled
- Tipagem forte via `ThemeColor`, `Theme`, `BoxProps`

### Navegação tipada

Tipos de rota definidos por stack (`AppStackParamList`, `AuthStackParamList`, etc.) com helpers:

```typescript
type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;
```

Roteamento condicional via `useRoute()`:

```
Loading → (credenciais carregando)
Onboarding → (primeiro acesso)
Auth → (não autenticado)
App → (autenticado)
```

### Path aliases

Imports limpos configurados no Babel (`babel-plugin-module-resolver`) e TypeScript (`tsconfig.json`):

```
@components  @hooks  @routes  @screens  @domain  @service
@api  @infra  @theme  @assets  @templates  @form  @utils  @test
```

### Templates reutilizáveis

Telas com estrutura similar usam templates:

- **`UserListTemplate`** — listas paginadas de usuários (seguidores/seguindo)
- **`ProfileTemplate`** — layout de perfil de usuário

### Componentes destacados

| Componente                            | Função                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| `Screen`                              | Layout base com safe area, keyboard avoiding, scroll           |
| `InfinityScrollList`                  | FlatList com paginação infinita, pull-to-refresh e empty state |
| `PostItem`                            | Card de post (imagem, ações, autor)                            |
| `FormTextInput` / `FormPasswordInput` | Inputs integrados ao react-hook-form                           |
| `PermissionManager`                   | Wrapper que solicita permissões nativas                        |
| `Toast`                               | Notificações temporárias na tela                               |

---

## Funcionalidades por módulo

### Autenticação (`screens/auth/`)

| Tela                   | Descrição                                            |
| ---------------------- | ---------------------------------------------------- |
| `LoginScreen`          | Login com e-mail e senha                             |
| `SignUpScreen`         | Cadastro com validação assíncrona de username/e-mail |
| `ForgotPasswordScreen` | Solicitação de nova senha                            |
| `SuccessScreen`        | Feedback genérico de sucesso (reutilizável)          |

### App principal (`screens/app/`)

| Tela                                      | Descrição                                        |
| ----------------------------------------- | ------------------------------------------------ |
| `HomeScreen`                              | Feed de posts com scroll infinito                |
| `NewPostScreen`                           | Seleção de foto da galeria                       |
| `CameraScreen`                            | Captura de foto com `react-native-vision-camera` |
| `PublishPostScreen`                       | Publicação de post com legenda                   |
| `FavoriteScreen`                          | Posts favoritados                                |
| `MyProfileScreen`                         | Perfil do usuário logado                         |
| `ProfileScreen`                           | Perfil de outro usuário                          |
| `PostCommentScreen`                       | Comentários de um post                           |
| `SearchScreen`                            | Busca de usuários com histórico persistido       |
| `SettingsScreen`                          | Configurações da conta                           |
| `DarkModeScreen`                          | Preferência de tema (claro/escuro/sistema)       |
| `EditProfileScreen`                       | Edição de nome, username e bio                   |
| `EditEmailScreen`                         | Alteração de e-mail                              |
| `EditPasswordScreen`                      | Alteração de senha                               |
| `MyFollowersScreen` / `MyFollowingScreen` | Listas de seguidores e seguindo                  |

### Onboarding (`screens/onboarding/`)

Fluxo introdutório de 3 páginas apresentando o app, exibido apenas no primeiro acesso.

---

## App root (`App.tsx`)

O ponto de entrada configura todos os providers globais:

```tsx
<AuthCredentialsProvider>
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
        <Routes />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  </QueryClientProvider>
</AuthCredentialsProvider>
```

- **`AuthCredentialsProvider`** — sessão do usuário e interceptor HTTP
- **`QueryClientProvider`** — React Query
- **`SafeAreaProvider`** — safe areas
- **`ThemeProvider`** — tema Restyle (dark/light dinâmico via `useAppColorScheme`)
- **`Routes`** — roteamento condicional
- **`Toast`** — feedback global (Zustand, sem provider)

---

## Testes

### Estratégia

- **Testes unitários** — hooks, utils, use cases de domínio
- **Testes de componente** — Button, PasswordInput, PostBottom
- **Testes de integração** — SearchScreen, PostCommentScreen (com MSW)

### Ferramentas

- **Jest** com preset `react-native`
- **Testing Library** para renderização e interação
- **MSW (Mock Service Worker)** — mock de endpoints HTTP em testes de integração
- **`test-utils.tsx`** — wrappers customizados (`wrapAllProviders`, `wrapScreenProviders`, `renderScreen`)
- **`inMemoryStorage`** — storage em memória para testes isolados

### Arquivos de teste

```
src/
├── Components/Button/__tests__/Button.test.tsx
├── Components/PasswordInput/__tests__/PasswordInput.test.tsx
├── Components/PostItem/components/__tests__/PostBottom.test.tsx
├── domain/Auth/useCases/__tests__/useAuthSignIn.test.ts
├── domain/PostReaction/__tests__/useReactToPost.test.ts
├── hooks/__tests__/useAppSafeArea.test.ts
├── infra/hooks/__tests__/usePaginatedList.test.ts
├── screens/app/SearchScreen/__tests__/integration/SearchScreen.test.tsx
├── screens/app/PostCommentScreen/__tests__/integration/PostCommentScreen.test.tsx
└── utils/__tests__/ (errorUtils, stringUtils, dateUtils)
```

### Scripts

```bash
npm run test       # Executa todos os testes
npm run coverage   # Executa testes com relatório de cobertura
```

---

## Pre-commit (Husky)

O projeto utiliza **[Husky](https://typicode.github.io/husky/)** para garantir qualidade antes de cada commit. O hook `.husky/pre-commit` executa automaticamente:

```bash
npm run lint        # ESLint em todo o projeto
npx tsc --noEmit    # Verificação de tipos TypeScript
npm run test        # Suite de testes Jest
```

O script `"prepare": "husky"` no `package.json` instala os hooks automaticamente após `npm install`.

> Nenhum commit passa sem lint limpo, tipos válidos e testes passando.

---

## Como executar

### Pré-requisitos

- Node.js ≥ 20
- [Docker](https://docs.docker.com/get-docker/) instalado (para subir o backend Nubble API)
- Ambiente React Native configurado ([documentação oficial](https://reactnative.dev/docs/set-up-your-environment))
- Backend Nubble API rodando em Docker (padrão: `http://127.0.0.1:3333/`)

### Instalação

```bash
npm install
# ou
yarn install
```

### Desenvolvimento

```bash
# Iniciar Metro bundler
npm start

# Android
npm run android

# iOS (requer pod install na primeira vez)
cd ios && bundle exec pod install && cd ..
npm run ios
```

### Scripts úteis

| Script             | Descrição                                |
| ------------------ | ---------------------------------------- |
| `npm start`        | Inicia o Metro bundler                   |
| `npm run reset`    | Inicia Metro com cache limpo             |
| `npm run android`  | Build e execução no Android              |
| `npm run ios`      | Build e execução no iOS                  |
| `npm run lint`     | Executa ESLint                           |
| `npm run lintfix`  | ESLint com auto-fix                      |
| `npm run tsx`      | Verificação de tipos (`tsc --noEmit`)    |
| `npm run test`     | Executa testes                           |
| `npm run coverage` | Testes com cobertura                     |
| `npm run art:3333` | Redireciona porta 3333 via ADB (Android) |

---

## Estrutura de navegação

```
Routes (NavigationContainer)
├── LoadingScreen          → enquanto carrega credenciais
├── OnboardingStack        → primeiro acesso
│   └── OnboardingScreen
├── AuthStack              → não autenticado
│   ├── LoginScreen
│   ├── SignUpScreen
│   ├── ForgotPasswordScreen
│   └── SuccessScreen
└── AppStack               → autenticado
    ├── AppTabNavigator
    │   ├── HomeScreen
    │   ├── NewPostScreen
    │   ├── FavoriteScreen
    │   └── MyProfileScreen
    ├── CameraScreen
    ├── PublishPostScreen
    ├── PostCommentScreen
    ├── ProfileScreen
    ├── SearchScreen
    ├── SettingsScreen
    ├── DarkModeScreen
    ├── EditProfileScreen
    ├── EditEmailScreen
    ├── EditPasswordScreen
    ├── MyFollowersScreen
    └── MyFollowingScreen
```

---

## Créditos

Projeto desenvolvido como parte do **curso profissionalizante de React Native da Coffstack**, aplicando conceitos de arquitetura limpa, tipagem forte, testes automatizados, design system e boas práticas de desenvolvimento mobile em um app completo de rede social — integrado a um backend próprio executado via **Docker**, o que também contribuiu para o aprendizado de containerização e execução de serviços backend em ambiente local.
