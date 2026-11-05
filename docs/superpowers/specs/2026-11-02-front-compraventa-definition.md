# 📘 Documento de Definición de Software (SDD): Sistema FrontCompraVenta

**Fecha:** 2026-11-02
**Versión:** 1.0.0
**Estado:** Borrador para Revisión
**Arquitecto:** Claude AI & Marcel Diaz

---

## 1. 🎯 Descripción General del Proyecto
El sistema **FrontCompraVenta** es una aplicación web profesional diseñada para gestionar las operaciones de una Casa de Empeños. Sirve como la interfaz principal para que empleados y administradores gestionen clientes, inventario, contratos de empeño, ventas y compras, conectándose a un backend profesional en Spring Boot.

### 1.1 Objetivos
- Proporcionar una interfaz segura, responsiva e intuitiva.
- Automatizar el ciclo de vida del empeño (creación, pago, redención y vencimiento).
- Garantizar una alta integridad de datos mediante contratos de API estrictos.
- Mantener una base de código escalable siguiendo las mejores prácticas de ingeniería de software.

---

## 2. 📋 Ingeniería de Requisitos

### 2.1 Requerimientos Funcionales (RF)
| ID | Requerimiento | Descripción | Prioridad |
| :--- | :--- | :--- | :--- |
| **RF-01** | Autenticación de Usuarios | El sistema debe permitir el inicio y cierre de sesión mediante JWT y soportar la renovación de sesión (refresh tokens). | Crítica |
| **RF-02** | Flujo de Empeño Ágil | El sistema debe proporcionar un asistente paso a paso para crear Cliente, Artículo y Empeño en una sola transacción. | Crítica |
| **RF-03** | Gestión de Inventario | Capacidad de listar, buscar, editar y eliminar artículos con control de stock. | Alta |
| **RF-04** | Gestión de Clientes | CRUD completo de clientes con búsqueda por ID, nombre o correo electrónico. | Alta |
| **RF-05** | Ciclo de Vida del Empeño | Capacidad de registrar pagos, marcar como devuelto, perdido o vencido. | Crítica |
| **RF-06** | Ventas y Compras | Interfaz para registrar ventas salientes y compras entrantes a proveedores. | Alta |
| **RF-07** | Dashboard Administrativo | KPIs en tiempo real (Ingresos, Stock Bajo, Empeños Vencidos) para administradores. | Media |
| **RF-08** | Gestión de Empleados | Módulo exclusivo para administradores para gestionar roles y estado de cuentas del personal. | Media |

### 2.2 Requerimientos No Funcionales (RNF)
| ID | Categoría | Requerimiento | Objetivo |
| :--- | :--- | :--- | :--- |
| **RNF-01** | Rendimiento | El tiempo de carga de páginas de dashboards y listas debe ser < 2s. | Alta |
| **RNF-02** | Seguridad | Todas las peticiones a la API deben estar firmadas con un Bearer token; los datos sensibles no deben guardarse en localStorage. | Crítica |
| **RNF-03** | Usabilidad | Diseño responsivo (Mobile-first) compatible con Tablets y Desktops. | Alta |
| **RNF-04** | Mantenibilidad | Cobertura de TypeScript al 100% con modo estricto habilitado. | Alta |
| **RNF-05** | Fiabilidad | Implementación de Error Boundaries globales para evitar colapsos totales de la aplicación. | Alta |

---

## 3. 👥 Análisis Centrado en el Usuario

### 3.1 Historias de Usuario
| ID | Rol | Objetivo | Beneficio | Criterios de Aceptación |
| :--- | :--- | :--- | :--- | :--- |
| **US-01** | Empleado | Crear un empeño rápidamente | Reducir el tiempo de espera del cliente | Llamada exitosa a `/pawns/agile` a través de un asistente. |
| **US-02** | Empleado | Registrar un pago | Mantener el contrato de empeño activo | Actualización del estado del empeño y el historial de pagos. |
| **US-03** | Admin | Ver KPIs Diarios | Tomar decisiones de negocio | Visualización de ingresos totales y empeños vencidos en el dashboard. |
| **US-04** | Admin | Gestionar Personal | Controlar niveles de acceso | Capacidad de desactivar cuentas de empleados. |

### 3.2 Caso de Uso Clave: "Registrar Empeño Ágil"
- **Actor:** Empleado
- **Precondición:** El empleado está autenticado.
- **Flujo Principal:**
    1. El usuario entra en el modo "Empeño Ágil".
    2. El usuario ingresa/selecciona datos del Cliente $\rightarrow$ Validar.
    3. El usuario ingresa detalles del Artículo $\rightarrow$ Validar.
    4. El usuario define el monto del préstamo y los términos $\rightarrow$ Validar.
    5. El usuario confirma el resumen final.
    6. El sistema llama a `/pawns/agile` y muestra una notificación de éxito.
- **Postcondición:** Se crea un nuevo cliente, artículo y empeño en la base de datos.

---

## 4. 🏛️ Arquitectura y Diseño

### 4.1 Patrón Arquitectónico
El sistema sigue una **Arquitectura Modular por Capas** combinada con el patrón **Container-Presenter**.

- **Capa 1: Capa de Tipos** $\rightarrow$ Tipos automatizados desde OpenAPI.
- **Capa 2: Capa de Servicios** $\rightarrow$ Patrón Repository para la abstracción de la API.
- **Capa 3: Capa de Hooks** $\rightarrow$ Orquestación de estado (TanStack Query).
- **Capa 4: Capa de UI** $\rightarrow$ Componentes presentacionales (shadcn/ui).

### 4.2 Patrones de Diseño Aplicados
- **Singleton:** Para la instancia del Cliente API de Axios.
- **State Pattern:** Para gestionar las transiciones del Asistente (Wizard) de Empeño Ágil.
- **Strategy Pattern:** Para calcular diferentes tasas de interés o comisiones según el tipo de empeño.
- **Observer Pattern:** Gestionado por TanStack Query para la invalidación de caché y actualizaciones de la UI.

---

## 5. 🛠️ Estrategia de Implementación

### 5.1 Stack Tecnológico (The Golden Stack)
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (Modo Estricto)
- **Estilos:** Tailwind CSS + shadcn/ui
- **Estado:** TanStack Query (Servidor) + Zustand (UI Global)
- **Comunicación:** Axios + Interceptores JWT
- **Validación:** Zod + React Hook Form

### 5.2 Metodología de Desarrollo (Agile/Lean)
Trabajaremos en **Sprints Semanales** adaptados a una disponibilidad diaria de 2 a 3 horas.

**Ciclo Semanal:**
- **Lunes:** Planificación del Sprint y desglose de tareas.
- **Mar-Vie:** Desarrollo iterativo (enfoque TDD).
- **Sábado:** QA, corrección de errores y refactorización.
- **Domingo:** Revisión del Sprint y Demo.

**Definición de Hecho (Definition of Done - DoD):**
- [ ] El código pasa las verificaciones de ESLint y TypeScript.
- [ ] Las pruebas unitarias de la lógica de negocio pasan.
- [ ] La funcionalidad coincide con los Criterios de Aceptación de la Historia de Usuario.
- [ ] Diseño responsivo verificado en 2+ tamaños de pantalla.

---

## 6. 🚀 Hoja de Ruta (Sprints)
- **Sprint 1: Cimientos.** Configuración del proyecto, Cliente API, flujo de Auth (JWT).
- **Sprint 2: Infraestructura Base.** Módulos de Clientes y Artículos (CRUD).
- **Sprint 3: Núcleo de Negocio.** Asistente de Empeño Ágil y Gestión de Empeños.
- **Sprint 4: Operaciones.** Ventas, Compras y Pagos.
- **Sprint 5: Admin y Pulido.** Dashboard, Gestión de Personal y QA Final.
