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

EXPOSE 10000
WORKDIR /app

# Set up Python environment
COPY config/uwsgi.ini requirements.txt ./

# Install Python requirements.
RUN pip install -r requirements.txt

# Run app
COPY app.py .
COPY --from=builder /app/dist ./dist


CMD ["python", "app.py"]