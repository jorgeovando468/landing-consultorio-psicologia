# landing-consultorio-psicologia

Proyecto estático sin dependencias.

## Instrucciones para abrir

- Con Live Server (VS Code): instala la extensión "Live Server" y haz clic derecho en `index.html` → "Open with Live Server".
- Sin Live Server: haz doble clic en `index.html` y ábrelo en tu navegador.

No necesita `npm` ni otras dependencias.

## Tipografías y logo

- Si tienes los archivos de fuente `BlackStar-Regular.woff2` y `DelmonDelicate-Regular.woff2`, colócalos en la carpeta `fonts/` dentro del proyecto. El CSS ya incluye `@font-face` que busca `../fonts/BlackStar-Regular.woff2` y `../fonts/DelmonDelicate-Regular.woff2`.
- El logo se tomó desde `img/logo.png`. Si quieres cambiarlo, reemplaza ese archivo.

## Personalizar el sitio

- `SITE_CONFIG`: abre `js/main.js` y edita el objeto `SITE_CONFIG` (arriba del archivo). Ahí puedes cambiar `businessName`, `professionalName`, `license`, `tagline`, `primaryColor`, `address`, `hours`, `email`, `services` (array con objetos `{title, description}`), `whatsappNumber` y `whatsappMessage`.

- `primaryColor` se inyecta como variable CSS `--primary` y se usa en los botones principales.

## Cambiar correo de FormSubmit

- El formulario usa `action="https://formsubmit.co/tu-email@ejemplo.com"` en `index.html`. Reemplaza `alitorresvilla@hotmail.com` por tu correo en la línea del atributo `action` del formulario y asegúrate de mantener los `input` ocultos (`_subject`, `_captcha`, `_template`) según necesites.

## Desplegar en Netlify (drag & drop)

1. Empaqueta la carpeta del proyecto (o usa la carpeta raíz del repo).
2. Entra a https://app.netlify.com/ y accede con tu cuenta (o crea una).
3. En el panel, arrastra la carpeta (containing `index.html`) al área "Drag and drop your site output folder here".
4. Netlify subirá los archivos y te dará una URL pública.

No se usan build steps ni dependencias; es un sitio estático.
