# ❓ FAQ y Solución de Problemas

Este documento recopila los errores más comunes y sus soluciones rápidas para el sistema de CompraVenta.

## 1. Preguntas Frecuentes (FAQ)

**Q: ¿Por qué no puedo ver algunos artículos en el inventario?**
A: Si eres un empleado, solo puedes ver los artículos que tienen stock disponible (`amount > 0`). Los administradores pueden ver todo el inventario.

**Q: ¿Qué pasa si me equivoco en los datos de un empeño ya confirmado?**
A: Los empeños confirmados no se pueden editar totalmente por seguridad. Debes contactar al administrador para realizar una corrección manual o anular el contrato y crear uno nuevo.

**Q: ¿Cómo sé cuándo vence un empeño?**
A: En la lista de empeños, los contratos que están cerca de su fecha de retorno aparecerán resaltados en color ámbar, y los vencidos en rojo.

---

## 2. Solución de Problemas (Troubleshooting)

### Problemas de Acceso
| Error | Causa Probable | Solución |
| :--- | :--- | :--- |
| **"Sesión Expirada"** | El Access Token ha vencido y el Refresh Token también. | Inicia sesión nuevamente con tu correo y contraseña. |
| **"Acceso Denegado"** | Intentas acceder a un módulo de Admin siendo Empleado. | Contacta al administrador para solicitar un cambio de rol si es necesario. |

### Problemas de Funcionamiento
| Error | Causa Probable | Solución |
| :--- | :--- | :--- |
| **El botón "Confirmar Empeño" no hace nada** | Faltan datos obligatorios en algún paso del Wizard. | Revisa que todos los campos marcados con `*` estén llenos y que no haya mensajes de error en rojo. |
| **La página de Dashboard carga lento** | Hay demasiados datos para procesar o conexión inestable. | Verifica tu conexión a internet o utiliza los filtros de fecha para reducir la cantidad de datos solicitados. |
| **Error 500 al guardar un cliente** | Cédula duplicada o error interno del servidor. | Verifica que el cliente no esté ya registrado en el sistema. Si el problema persiste, reporta el error al administrador. |
