# 🛠️ Especificación Técnica de la API y Funciones

Este documento detalla los contratos de comunicación entre el frontend y el backend, definiendo los prototipos de las funciones, sus parámetros y los valores de retorno.

## 1. Convención de Nomenclatura y Estándares

Todas las funciones de servicio siguen el patrón: `verb + Entity + Action`.
Ejemplo: `pawnService.createPawn()`

### Estándar de Retorno
Casi todas las funciones públicas devuelven una `Promise` que resuelve en un `ApiResponse<T>`, definido como:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  error: {
    message: string;
    code: string;
  } | null;
  timestamp: string;
}
```

---

## 2. Prototipos de Métodos por Módulo

### 2.1 Módulo de Autenticación (`auth.service.ts`)

| Método | Parámetros | Retorno | Descripción |
| :--- | :--- | :--- | :--- |
| `login` | `LoginRequest` | `Promise<ApiResponse<AuthResponse>>` | Autentica al empleado y devuelve tokens. |
| `refresh` | `RefreshRequest` | `Promise<ApiResponse<AuthResponse>>` | Renueva el access token usando el refresh token. |
| `logout` | `token: string` | `Promise<ApiResponse<void>>` | Invalida el token en el servidor. |

### 2.2 Módulo de Empeños (`pawn.service.ts`)

| Método | Parámetros | Retorno | Descripción |
| :--- | :--- | :--- | :--- |
| `findAll` | `Pageable, Filters` | `Promise<ApiResponse<Page<PawnResponse>>>` | Lista empeños con paginación y filtros. |
| `findByGlobalId` | `globalId: string` | `Promise<ApiResponse<PawnResponse>>` | Obtiene detalle de un empeño específico. |
| `createAgile` | `CreateAgilePawnRequest` | `Promise<ApiResponse<PawnResponse>>` | Crea Cliente, Artículo y Empeño en una sola transacción. |
| `registerPayment` | `globalId: string, PawnPaymentRequest` | `Promise<ApiResponse<PawnPaymentResponse>>` | Registra el pago de una cuota. |
| `markAsReturned` | `globalId: string` | `Promise<ApiResponse<PawnResponse>>` | Cambia estado a RETIRADO. |
| `markAsLost` | `globalId: string` | `Promise<ApiResponse<PawnResponse>>` | Cambia estado a PERDIDO (Admin). |

### 2.3 Módulo de Inventario (`article.service.ts`)

| Método | Parámetros | Retorno | Descripción |
| :--- | :--- | :--- | :--- |
| `findAll` | `Pageable, SearchParams` | `Promise<ApiResponse<Page<ArticleResponse>>>` | Lista artículos con filtros de categoría y stock. |
| `create` | `CreateArticleRequest` | `Promise<ApiResponse<ArticleResponse>>` | Registra un nuevo artículo en inventario. |
| `updateStock` | `globalId: string, StockAdjustRequest` | `Promise<ApiResponse<ArticleResponse>>` | Suma o resta unidades al stock. |

### 2.4 Módulo de Clientes (`client.service.ts`)

| Método | Parámetros | Retorno | Descripción |
| :--- | :--- | :--- | :--- |
| `findBySearch` | `term: string, Pageable` | `Promise<ApiResponse<Page<ClienteResponse>>>` | Busca clientes por nombre, cédula o email. |
| `create` | `CreateClienteRequest` | `Promise<ApiResponse<ClienteResponse>>` | Registra un nuevo cliente. |
| `update` | `globalId: string, UpdateClienteRequest` | `Promise<ApiResponse<ClienteResponse>>` | Actualiza datos personales del cliente. |

---

## 3. Detalle de Parámetros y Valores de Retorno (Ejemplos Críticos)

### Caso: `createAgile`
**Parámetros de entrada (`CreateAgilePawnRequest`):**
- `clienteFirstName`: string (Obligatorio)
- `clienteCedula`: string (Opcional)
- `articleName`: string (Obligatorio)
- `articlePrice`: number (Obligatorio)
- `pawnPrice`: number (Obligatorio)
- `installmentCount`: integer (Obligatorio)
- `pawnDate`: date (Obligatorio)
- `returnDate`: date (Obligatorio)

**Valor de Retorno (`ApiResponse<PawnResponse>`):**
- `success`: true/false
- `data`: Objeto `PawnResponse` que incluye el `globalId` generado y el estado inicial `ACTIVO`.
- `message`: "Empeño creado exitosamente".
