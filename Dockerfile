# Use a imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json para o diretório de trabalho do container
COPY package.json .

# install Microsoft SQL Server requirements.
ENV ACCEPT_EULA=Y
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev

# MYSQL
ADD https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz .
RUN tar -C . -xzvf mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz
RUN cp -r mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit/lib/* /usr/local/lib
RUN cp -r mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit/bin/* /usr/local/bin
RUN myodbc-installer -a -d -n "MySQL ODBC 8.0 Driver" -t "Driver=/usr/local/lib/libmyodbc8w.so"
RUN myodbc-installer -a -d -n "MySQL ODBC 8.0" -t "Driver=/usr/local/lib/libmyodbc8a.so"

# Instale as dependências do projeto
RUN npm install


# Copie o restante dos arquivos do projeto para o diretório de trabalho do container
COPY . .

# Exponha a porta do servidor, se necessário
EXPOSE 8080

# Comando para executar o aplicativo, se necessário
CMD ["bash"]
