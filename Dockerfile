FROM debian:12 AS builder

RUN apt update && \
  apt clean && \
  apt install -y \
  git \
  nodejs \
  npm

WORKDIR /app

# Set up Node
COPY package.json package-lock.json config/patches ./
RUN npm ci


# Build app
COPY config/.parcelrc config/tsconfig.json ./
COPY src ./src 
RUN npx parcel build

FROM python:3.11-alpine AS app

RUN apk update && apk add \
  git \
  libstdc++

WORKDIR /app

COPY config/uwsgi.ini requirements.txt ./

# Set up Python environment
RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt

COPY app.py .
COPY --from=builder /app/dist ./dist
CMD ["venv/bin/uwsgi", "--ini", "uwsgi.ini", "-w", "app:app"]