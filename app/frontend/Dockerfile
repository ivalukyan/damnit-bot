# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код проекта
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем serve для раздачи статических файлов
RUN npm install -g serve

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение с использованием serve
CMD ["serve", "-s", "build"]
