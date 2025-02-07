# TKAMBIO CHALLENGE FRONTEND

## 📌 Descripción

Este proyecto es una versión estática del frontend del sistema TKAMBIO, desarrollado con Vue 3, Composition API y Sass. En esta versión, todas las peticiones y datos son manejados a través de **mocks**, sin necesidad de un backend real.

## 🚀 Tecnologías utilizadas

- Vue 3 + Vite
- TypeScript
- Vue Router
- Pinia (Opcional para gestión de estado)
- Axios (para simulación de peticiones HTTP)
- SASS (para estilos)
- Plugins personalizados para **alertas** y **loaders**
- Simulación de autenticación y reportes con **mocks**

---

## 📂 Estructura del Proyecto

```
📦 src
 ├📂 assets
 ┃ ├📂 icons (Iconos usados en la UI)
 ┃ ├📂 styles (Estilos globales en SASS)
 ├📂 components
 ┃ ├ AlertComponent.vue
 ┃ ├ LoaderComponent.vue
 ├📂 composable
 ┃ ├📂 alert (Manejo de alertas con plugin)
 ┃ ├📂 crypto (Manejo de encriptación)
 ┃ ├📂 fetch (Lógica para peticiones HTTP con Axios)
 ┃ ├📂 loader (Manejo del loader con plugin)
 ├📂 mocks (Datos estáticos para autenticación y reportes)
 ├📂 modules
 ┃ ├📂 auth (Módulo de autenticación con mocks)
 ┃ ├📂 report (Módulo de reportes con mocks)
 ├📂 plugin (Plugins personalizados: alertPlugin, loaderPlugin)
 ├📂 router (Definición de rutas)
 ├📂 stores (Pinia store, opcional)
 ├📂 views
 ┃ ├ HomeView.vue
 ┃ ├ ReportView.vue
 ┃ ├ NotFound.vue
 ┃ ├ LoginView.vue
 ├ main.ts (Punto de entrada del proyecto)
 ├ App.vue (Componente raíz)
 ├ router/index.ts (Configuración de Vue Router)
 ├ .env (Variables de entorno)
 ├ tsconfig.json (Configuración de TypeScript)
 ├ vite.config.ts (Configuración de Vite)
```


## 💪 Instalación y ejecución

### 🛠️ 1. Instalar dependencias

```bash
npm install
```

### 🛠️ 2. Ejecutar en desarrollo

```bash
npm run dev
```

> La aplicación se ejecutará en `http://localhost:5173` (según la configuración de Vite).

### 🛠️ 3. Construir para producción

```bash
npm run build
```

### 🛠️ 4. Servir la versión de producción localmente

```bash
npm run preview
```

---

## 🔐 Uso de Plugins Personalizados

### 🟢 **Loader Plugin**

Este plugin gestiona la pantalla de carga.

```ts
import { useLoader } from '@/composable/loader/useLoader'

const { showLoader, hideLoader } = useLoader()

showLoader() // Muestra el loader
hideLoader() // Oculta el loader
```

---

### ⚠️ **Alert Plugin**

Este plugin maneja las alertas personalizadas.

```ts
import { useAlert } from '@/composable/alert/useAlert'

const { showAlert } = useAlert()

await showAlert({
  type: 'success',
  title: 'Operación exitosa',
  message: 'Los datos fueron guardados correctamente.',
})
```

---

## 📼 Uso de Mocks

En esta versión estática, todas las peticiones se manejan mediante mocks.

```ts
import mockDataReport from '@/mocks/mockDataReport.json'

const reports = ref(mockDataReport)
```

Para autenticación, se usa un mock de usuarios:

```ts
import mockUsers from '@/mocks/mockUsers.json'

const user = mockUsers.find(u => u.email === form.email && u.password === form.password)
```

### 🔑 Credenciales de prueba

Para acceder a la aplicación, usa las siguientes credenciales:

```
[
    {
        "email": "admin@example.com",
        "password": "admin123"
    },
    {
        "email": "user@example.com",
        "password": "user123"
    }
]
```

Para descargas de archivos:

```ts
const exportReport = (report) => {
  const filePath = `/reports/${report.report_id}.xlsx`
  const link = document.createElement('a')
  link.href = filePath
  link.setAttribute('download', `Reporte_${report.report_id}.xlsx`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

