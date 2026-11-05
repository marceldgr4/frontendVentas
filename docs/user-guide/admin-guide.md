# 🛠️ Guía del Administrador: Sistema CompraVenta

Este manual está dirigido exclusivamente al personal con rol de **ADMIN**. Contiene las instrucciones para la gestión del sistema y el control del personal.

## 1. 👥 Gestión de Empleados
El administrador es el único responsable de controlar quién accede al sistema.

### Crear Nuevo Empleado
1. Ve al módulo de **Empleados $\rightarrow$ Registrar Nuevo**.
2. Ingresa el nombre completo, correo electrónico y asigna un rol (`ADMIN` o `EMPLEADO`).
3. Establece una contraseña inicial segura.

### Control de Acceso (Activación/Desactivación)
Para evitar accesos no autorizados (por ejemplo, en caso de despido o baja temporal):
- En la lista de empleados, selecciona al usuario.
- Cambia el interruptor de **"Estado de Cuenta"** a `Inactivo`. El empleado será expulsado inmediatamente de la sesión y no podrá volver a entrar.

## 2. 📈 Supervisión del Negocio (Dashboard)
El administrador tiene acceso a KPIs críticos en el Dashboard principal:
- **Ingresos Totales:** Suma de todas las ventas y pagos de cuotas.
- **Alertas de Stock:** Lista de artículos que han bajado del límite mínimo.
- **Empeños Vencidos:** Lista de contratos que han superado la fecha de retorno y deben ser marcados como "Perdidos" o "Vencidos".

## 3. 🗑️ Operaciones Críticas (Eliminación)
El sistema implementa **Eliminación Lógica** para evitar pérdida de datos accidental.
- **Eliminación Lógica:** El registro se marca como `ELIMINADO`, desapareciendo de la vista del empleado pero quedando en la DB para auditoría.
- **Eliminación Física (Hard Delete):** Solo disponible para el administrador en casos extremos. Borra el registro permanentemente de la base de datos.
