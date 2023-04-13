# Data: 2023-04-07
# Versão: 1.0

# Defina a imagem base
FROM node:alpine

# Defina o diretório de trabalho do container
WORKDIR /app

# Copie o arquivo package.json para o diretório de trabalho do container
COPY package.json .

# Defina as variáveis de ambiente
ENV ACCEPT_EULA=Y

# Instale as dependências do sistema operacional
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev

# Instale o driver ODBC do MySQL
ADD https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz .
RUN tar -C . -xzvf mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz
RUN cd mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit \
  && cp -r lib/* /usr/local/lib \
  && cp -r bin/* /usr/local/bin \
  && myodbc-installer -a -d -n "MySQL ODBC 8.0 Driver" -t "Driver=/usr/local/lib/libmyodbc8w.so" \
  && myodbc-installer -a -d -n "MySQL ODBC 8.0" -t "Driver=/usr/local/lib/libmyodbc8a.so"

# Instale as dependências do Node.js
RUN npm install

# Copie o resto do código para o diretório de trabalho do container
COPY . .

# Defina a porta que o aplicativo será exposto
EXPOSE 8080

# Defina o comando padrão que será executado quando o container for iniciado
CMD ["npm", "run", "dev"]
