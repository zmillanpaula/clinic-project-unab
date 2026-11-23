# Clínica Salud Integral · Gestión clínica

Aplicación web para la gestión de pacientes, centros, boxes y reservas de horas médicas de Clínica Salud Integral.

Proyecto del curso **Taller de desarrollo Web y Móvil (APTC106)** · Universidad Andrés Bello.

## Stack (MERN)

| Capa | Tecnologías |
| --- | --- |
| Frontend (`client/`) | React 19, TypeScript, Vite, Tailwind CSS, Axios |
| Backend (`server/`) | Node.js, Express 5, Mongoose, JWT, bcrypt |
| Base de datos | MongoDB Atlas |

```text
clinic-project-unab/
├── client/   # Frontend (ver client/README.md)
└── server/   # API REST
    └── src/
        ├── config/        # Conexión a MongoDB
        ├── controllers/   # Lógica de cada endpoint
        ├── data/          # Datos de prueba para el seed
        ├── middleware/    # Autenticación y permisos por rol
        ├── models/        # Modelos de Mongoose
        ├── routes/        # Definición de rutas
        ├── scripts/       # Script de seed
        └── utils/         # Validación de RUT
```

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` (incluye npm)
- Una cuenta de MongoDB Atlas (el plan gratuito M0 es suficiente)

## Configuración

### 1. Base de datos en MongoDB Atlas

1. Crea un cluster y un usuario de base de datos.
2. En **Network Access**, agrega tu IP actual (*Add Current IP Address*).
3. En el cluster, ve a **Connect → Drivers** y copia la cadena de conexión.

> Si el backend no logra conectarse días después, probablemente cambió tu IP: vuelve a agregarla en *Network Access*.

### 2. Variables de entorno del backend

Copia `server/.env.example` como `server/.env` y completa los valores:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/clinic
JWT_SECRET=un_texto_largo_y_aleatorio
```

Para generar `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> ⚠️ `server/.env` **nunca** se sube al repositorio. `.env.example` solo debe tener valores de ejemplo.

### 3. Frontend conectado al backend

El frontend trae un simulador (MSW) activado por defecto. Para usar el backend real, crea `client/.env.development.local` con:

```env
VITE_ENABLE_MOCKS=false
```

Este archivo no se sube a git, así que cada persona decide si usa el simulador o el backend.

## Instalación y puesta en marcha

```bash
# Backend
cd server
npm install
npm run seed     # carga datos de prueba (se puede repetir sin duplicar)
npm run dev      # http://localhost:3000

# Frontend (en otra terminal)
cd client
npm install
npm run dev      # http://localhost:5173
```

Vite reenvía las llamadas a `/api` hacia `http://localhost:3000`, así que **ambos deben estar corriendo**.

Para comprobar que el backend responde: http://localhost:3000/api/health

## Cuentas de demostración

| Perfil | Correo | Contraseña | Acceso |
| --- | --- | --- | --- |
| Administrador | `administrador@example.cl` | `AdminClave123!` | Pacientes y centros y box (gestión completa) |
| Recepcionista | `recepcionista@example.cl` | `RecepcionClave123!` | Pacientes; centros y box solo lectura |
| Paciente | `paciente@example.cl` | `PacienteClave123!` | Portal: reservar, ver y cancelar sus horas |
| Profesional de salud | `profesional@example.cl` | `ProfesionalClave123!` | Fuera del alcance actual |

> Credenciales públicas solo para desarrollo. Todos los datos de prueba son ficticios.

## API

Todas las rutas, excepto `login` y `health`, requieren el encabezado `Authorization: Bearer <token>`, que se obtiene al iniciar sesión.

| Método | Ruta | Descripción | Roles |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Estado del servidor | Público |
| `POST` | `/api/access/login` | Inicia sesión y entrega un token (8 h) | Público |
| `GET` | `/api/patients` | Lista pacientes | Admin, recepción |
| `POST` | `/api/patients` | Registra un paciente | Admin, recepción |
| `PATCH` | `/api/patients/:id` | Edita un paciente | Admin, recepción |
| `DELETE` | `/api/patients/:id` | Elimina un paciente | Admin, recepción |
| `GET` | `/api/resources` | Lista centros y box | Admin, recepción |
| `POST` | `/api/resources` | Crea un centro o box | Admin |
| `PATCH` | `/api/resources/:id` | Edita un centro o box o cambia su estado | Admin |
| `DELETE` | `/api/resources/:id` | Elimina un centro o box | Admin |
| `GET` | `/api/appointments/mine` | Lista las reservas del paciente conectado | Paciente |
| `POST` | `/api/appointments` | Reserva una hora | Paciente |
| `PATCH` | `/api/appointments/:id/cancel` | Cancela una reserva propia | Paciente |

### Reglas de negocio

- **RUT:** se valida el dígito verificador y se guarda normalizado (sin puntos). No se permiten RUT duplicados.
- **Reservas:** un profesional no puede tener dos horas confirmadas en la misma fecha y hora. Al cancelar, el horario se libera. No se puede reservar en fechas pasadas.
- **Privacidad:** cada paciente solo ve y cancela sus propias reservas.

### Códigos de respuesta

| Código | Significado |
| --- | --- |
| `400` | Datos inválidos |
| `401` | Sin sesión o sesión vencida |
| `403` | El rol no tiene permiso |
| `404` | No existe (o no pertenece al usuario) |
| `409` | RUT duplicado u horario ya reservado |

Los errores siempre responden con el formato `{ "error": "mensaje" }`.

## Scripts del backend

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia la API con recarga automática (nodemon) |
| `npm start` | Inicia la API |
| `npm run seed` | Carga cuentas, centros, pacientes y una reserva de prueba |

Los scripts del frontend están en [`client/README.md`](client/README.md).

## Problemas frecuentes

| Problema | Solución |
| --- | --- |
| `Could not connect to any servers in your MongoDB Atlas cluster` | Agrega tu IP actual en *Network Access* de Atlas |
| `Falta JWT_SECRET en el archivo .env` | Agrega `JWT_SECRET` en `server/.env` |
| `Cannot use import statement outside a module` | Revisa que `server/package.json` tenga `"type": "module"` |
| En PowerShell: *"la ejecución de scripts está deshabilitada"* | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| El panel muestra *"Debes iniciar sesión"* | Cierra sesión y vuelve a entrar (el token vence a las 8 h) |
| `Cannot GET /` en `localhost:3000` | Es normal: la API no tiene página de inicio. Usa `/api/health` |

## Flujo de trabajo con Git

1. Actualiza `main`: `git checkout main` y `git pull`.
2. Crea una rama: `git checkout -b feat/nombre-del-cambio`.
3. Haz commit y push, y abre un Pull Request hacia `main`.
4. Antes de hacer `git pull` en `main`, confirma que el PR diga **Merged**.