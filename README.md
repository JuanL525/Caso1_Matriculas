
### 📝 Guía Rápida para Subir a GitHub desde Cero

**1. Preparar el terreno (¡No olvides esto!)**

* Crea un archivo llamado `.gitignore` en la raíz de tu proyecto.
* Escribe adentro:
```text
node_modules/
.env

```



**2. Empaquetar tu código (En la terminal de VS Code)**

* `git init` *(Crea la caja de rastreo)*
* `git add .` *(Mete todos tus archivos permitidos a la caja)*
* `git commit -m "mi primer commit"` *(Sella la caja con un mensaje)*

**3. Conectar y Subir**

* Ve a GitHub y crea un repositorio **completamente vacío** (no marques la casilla de README ni gitignore).
* Copia las 3 líneas de código que te da GitHub al final y pégalas en tu terminal. Son estas:
* `git remote add origin https://github.com/TU_USUARIO/TU_REPO.git` *(Apunta a la nube)*
* `git branch -M main` *(Nombra la rama principal)*
* `git push -u origin main` *(Sube los archivos)*


---

# 🚀 GUÍA MAESTRA: Despliegue de API Node.js en Render


## FASE 1: Preparar el Código Localmente

**1. El Archivo `.gitignore**`
Asegúrate de tener un archivo llamado exactamente `.gitignore` en la raíz de tu proyecto (junto a package.json) sin barras diagonales al final. Debe contener mínimo esto:

```text
node_modules/
.env

```

**2. El Script de Arranque (package.json)**
Abre tu `package.json`. En la sección de `"scripts"`, debes agregar el comando `"start"`. Debe quedar exactamente así (no olvides la coma en la línea anterior):

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }

```

## FASE 2: Eliminar rastros del `.env` en GitHub

Si subiste tu `.env` a GitHub por accidente antes de ignorarlo, o simplemente quieres asegurarte de que tu código esté limpio antes de desplegar, abre tu terminal en VS Code y ejecuta estos comandos UNO por UNO:

1. **Borrar el archivo de la memoria de Git** (Esto no lo borra de tu PC, solo de la nube):
```bash
git rm --cached .env

```


2. **Empaquetar todos los cambios nuevos** (incluyendo el package.json modificado):
```bash
git add .

```


3. **Ponerle un mensaje a la actualización:**
```bash
git commit -m "fix: preparar scripts de despliegue y proteger .env"

```


4. **Subir los cambios a GitHub:**
```bash
git push origin main

```



*(Nota: Si tu rama se llama `master` en lugar de `main`, usa `git push origin master`).*

## FASE 3: Configuración en Render.com

1. Entra a **Render.com** e inicia sesión con GitHub.
2. Haz clic en el botón **New +** y selecciona **Web Service**.
3. Selecciona **Build and deploy from a Git repository** y dale a *Next*.
4. Busca tu repositorio en la lista y haz clic en **Connect**.

## FASE 4: Llenar el Formulario de Despliegue

Llena los campos exactamente con esta estructura:

* **Name:** *[Un nombre sin espacios para tu proyecto, ej: api-matriculas-final]*
* **Region:** *[Déjalo por defecto]*
* **Branch:** `main` *(o master)*
* **Runtime:** `Node`
* **Build Command:** `npm install` *(Comando para instalar las dependencias)*
* **Start Command:** `npm start` *(El comando que creaste en la Fase 1)*
* **Instance Type:** Selecciona la caja que dice **Free ($0/month)**.

## FASE 5: Las Variables de Entorno (El paso más importante)

Desplázate hacia abajo en el formulario hasta encontrar **Environment Variables** y haz clic en **Add Environment Variable**. Agrega tus datos secretos igual que en tu archivo `.env` local:

* **Key:** `PORT`
* **Value:** `4000`


* **Key:** `MONGO_URI`
* **Value:** `mongodb+srv://tu_usuario:tu_password@cluster0.xxxxx.mongodb.net/nombre_de_tu_db` *(Asegúrate de poner el nombre de tu BD al final).*


* **Key:** `JWT_SECRET`
* **Value:** `tu_palabra_secreta_aqui`



## FASE 6: Lanzamiento y Pruebas

1. Haz clic en el botón verde **Create Web Service** al final de la página.
2. Espera unos minutos viendo la consola negra. Cuando diga *"Servidor corriendo..."* y *"MongoDB conectado..."*, tu API estará viva.
3. Copia el enlace verde que aparece arriba a la izquierda (ej. `https://mi-api.onrender.com`).
4. Abre **Postman**, pega ese enlace, agrégale tus rutas (ej. `/api/usuarios`), pon tu JSON en el Body y haz tus pruebas.

---
