FROM vegetaxd/musicplayer:latest
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start
