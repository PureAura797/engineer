# Инструкция по развертыванию сайта МЗТА Инжиниринг

Данное приложение разработано на современном стеке: **Next.js 14+ (App Router)**, **React**, **Tailwind CSS**. Серверная часть работает на **Node.js**. Приложение требует запущенного сервера (Node.js или Docker), так как в нем используются API-роуты (отправка заявок на почту) и оптимизация изображений.

## Требования к серверу
* OS: Linux (Ubuntu/Debian)
* Node.js: Версия 18.17+ или 20.x
* RAM: минимум 1GB, рекомендуется 2GB+

---

## ⚙️ Настройка переменных окружения

В корневой директории приложения нужно создать файл `.env` (или скопировать из `.env.example`) и заполнить данные:

```env
# URL вашего сайта (например: https://mzta.ru)
NEXT_PUBLIC_SITE_URL=https://mzta.ru

# Настройки для отправки почты (API заявки)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your_email@yandex.ru
SMTP_PASS=your_app_password
```
*(Внимание: для Yandex, Mail.ru, Google и т.д. в качестве SMTP_PASS нужно использовать специальные "Пароли приложений", а не основной пароль от почты).*

---

## Способ 1: Развертывание через PM2 (Рекомендуемый для VDS/VPS)

Это самый простой и надежный способ держать сервер запущенным в фоне.

### 1. Установка Node.js и PM2
Если на сервере еще нет Node.js и PM2, установите их:
```bash
# Установка Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка менеджера процессов PM2
sudo npm install -g pm2
```

### 2. Подготовка и запуск
1. Загрузите архив с файлами на ваш сервер в нужную директорию (например, `/var/www/mzta`).
2. Распакуйте архив и перейдите в папку проекта:
   ```bash
   cd /var/www/mzta
   ```
3. Установите зависимости:
   ```bash
   npm ci
   # или npm install
   ```
4. Соберите production билд:
   ```bash
   npm run build
   ```
5. Запустите приложение через PM2 (настройки подхватятся из приложенного `ecosystem.config.js`):
   ```bash
   pm2 start ecosystem.config.js
   ```
6. Сохраните процесс в автозагрузку (чтобы после перезагрузки сервера сайт поднимался сам):
   ```bash
   pm2 save
   pm2 startup
   ```

По умолчанию приложение запустится на порту `3000`. Вам останется только настроить Nginx в качестве Reverse Proxy.

### Пример конфигурации Nginx:
```nginx
server {
    listen 80;
    server_name mzta.ru www.mzta.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Способ 2: Развертывание через Docker

Если ваш сервер использует Docker, в проекте уже подготовлен оптимизированный `Dockerfile`. В `next.config.ts` включен режим `output: "standalone"`, поэтому итоговый образ будет весить очень мало.

1. Перенесите файлы на сервер.
2. Соберите Docker-образ:
   ```bash
   docker build -t mzta-app .
   ```
3. Запустите контейнер:
   ```bash
   docker run -d -p 3000:3000 --name mzta-container --env-file .env mzta-app
   ```
4. Либо через Docker Compose (создайте `docker-compose.yml` рядом):
   ```yaml
   version: '3'
   services:
     web:
       build: .
       ports:
         - "3000:3000"
       env_file:
         - .env
       restart: always
   ```
   И запустите `docker-compose up -d`.

---

## Поддержка и администрирование
- Логи приложения в PM2 можно смотреть командой: `pm2 logs mzta-engineering`
- Чтобы перезапустить сайт после изменения кода или `.env` файла: 
  ```bash
  npm run build
  pm2 restart mzta-engineering
  ```
