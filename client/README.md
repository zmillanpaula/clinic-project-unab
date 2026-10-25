# Salud Integral · Gestión clínica

Prototipo web de una plataforma de gestión clínica. Incluye una pantalla de acceso por perfil y un panel administrativo para consultar y gestionar centros y boxes de atención.

> **Estado del proyecto:** prototipo frontend. El acceso se simula con Mock Service Worker (MSW), y los cambios del panel se mantienen solo en memoria mientras la aplicación está abierta. No hay persistencia ni backend conectado.

## Funcionalidades

- Inicio de sesión de demostración con selección de perfil.
- Panel de administración para buscar, paginar, crear y editar centros y boxes, y cambiar su disponibilidad.
- Mensaje de orientación para recuperación de contraseña.
- Diseño adaptable a distintos tamaños de pantalla.
- Pestañas de profesionales, especialidades y jornadas/bloqueos visibles como módulos en desarrollo.

Los perfiles de recepción, profesional de salud y paciente tienen cuentas de demostración, pero sus vistas aún no están implementadas.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| ![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB) | Interfaz de usuario. |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) | Tipado estático del código. |
| ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) | Servidor de desarrollo y compilación. |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) | Estilos de la aplicación. |
| ![MSW](https://img.shields.io/badge/MSW-3-FF6A33) | Simulación del servicio de acceso en desarrollo y pruebas. |
| ![Jest](https://img.shields.io/badge/Jest-29-C21325?logo=jest&logoColor=white) | Ejecución de pruebas. |
| ![Oxlint](https://img.shields.io/badge/Oxlint-1.88-5B5BD6) | Análisis estático del código. |

## Requisitos

| Requisito | Versión |
| --- | --- |
| ![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=nodedotjs&logoColor=white) | `^20.19.0` o `>=22.12.0` |
| ![npm](https://img.shields.io/badge/npm-incluido-CB3837?logo=npm&logoColor=white) | Se instala junto con Node.js. |

## Instalación y desarrollo

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abre en el navegador la URL local que muestra Vite en la terminal (normalmente `http://localhost:5173`).

## Cuentas de demostración

Selecciona el perfil correspondiente en la pantalla de acceso y usa una de estas cuentas:

| Perfil | Usuario | Correo | Contraseña |
| --- | --- | --- | --- |
| Administrador | `maria.lopez` | `administrador@example.cl` | `AdminClave123!` |
| Recepcionista | `maria.lopez` | `recepcionista@example.cl` | `RecepcionClave123!` |
| Profesional de salud | `maria.lopez` | `profesional@example.cl` | `ProfesionalClave123!` |
| Paciente | `maria.lopez` | `paciente@example.cl` | `PacienteClave123!` |

El usuario es siempre `maria.lopez`; cada perfil tiene un correo y una contraseña de demostración distintos. El formulario también acepta el correo como identificador.

> Estas credenciales son públicas y están destinadas exclusivamente a desarrollo y demostración. No las uses en producción ni con datos reales.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la última compilación de `dist/`. |
| `npm run typecheck` | Comprueba los tipos de TypeScript sin emitir archivos. |
| `npm run lint` | Analiza el código con Oxlint. |
| `npm test -- --runInBand` | Ejecuta las pruebas con Jest en un solo proceso. |

Para validar los cambios antes de entregarlos:

```bash
npm run typecheck
npm run lint
npm test -- --runInBand
npm run build
```

## Mock del servicio de acceso

En desarrollo, MSW se activa con `VITE_ENABLE_MOCKS=true`, configurado en `.env.development`. Intercepta `POST /api/access/login` y valida las cuentas de demostración definidas en `src/constants/accountSeeds.ts`. Las contraseñas de prueba se convierten a hashes al inicializar el mock.

Para desactivar el mock, cambia el valor a `VITE_ENABLE_MOCKS=false` en `.env.development`. En ese caso, la aplicación intenta llamar a `POST /api/access/login` en el mismo origen; se necesita un backend que implemente ese endpoint. Las contraseñas de demostración no son un sistema de autenticación real.

MSW sirve el worker desde `public/mockServiceWorker.js`. Las pruebas configuran el servidor de MSW en `src/mocks/server.ts` y `src/mocks/testSetup.ts`.

## Estructura principal

```text
src/
├── components/
│   ├── access/       # Formulario, selector de perfil y recuperación de acceso
│   └── admin/        # Componentes del panel administrativo
├── config/           # Perfiles de usuario
├── constants/        # Cuentas de prueba y datos iniciales
├── hooks/            # Lógica de acceso
├── mocks/            # Configuración y handlers de MSW
├── services/         # Cliente HTTP y servicio de acceso
├── types/            # Tipos de acceso y administración
└── views/            # Vistas de acceso y administración
```

## Alcance y siguientes pasos

Para convertir el prototipo en una aplicación de producción se requiere, como mínimo, integrar un backend de autenticación, reemplazar las cuentas y datos de prueba, persistir los recursos, implementar los módulos pendientes y definir controles de seguridad adecuados.
