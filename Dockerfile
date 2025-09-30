FROM node:24-alpine3.21 AS builder

WORKDIR /app

# Set up Node packages
COPY package.json package-lock.json config/patches ./
RUN npm ci

# Build static files
COPY config/.parcelrc config/tsconfig.json ./
COPY src ./src 
RUN npx parcel build

FROM python:3.11-alpine AS app

RUN apk update && apk add \
  git \
  libstdc++

WORKDIR /app

# Set up Python environment
COPY config/uwsgi.ini requirements.txt ./
RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt

# Run app
COPY app.py .
COPY --from=builder /app/dist ./dist
CMD ["venv/bin/uwsgi", "--ini", "uwsgi.ini", "-w", "app:app"]