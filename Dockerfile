# FROM alpine:3.18

# RUN apk add \
# python3~3.11 \
# nodejs \
# npm \
# git

FROM debian:12

RUN apt update && \
    apt clean && \
    apt install -y \
      git \
      python3.11-venv \
      nodejs \
      npm


WORKDIR /usr/app

# Set up Python environment
RUN git clone https://github.com/KChoiSlattery/latex2sympy.git
COPY requirements.txt ./

RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt

# Set up Node
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci

# Build app
COPY src ./src 
COPY tsconfig.json .parcelrc ./
RUN npx parcel build
COPY app.py ./
COPY uwsgi.ini ./
COPY sandbox ./sandbox

CMD ["venv/bin/uwsgi", "--ini", "uwsgi.ini", "-w", "app:app"]