FROM debian:12 AS builder

RUN apt update && \
  apt clean && \
  apt install -y \
  git \
  nodejs \
  npm

WORKDIR /app

# Set up Node
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci

# Dump the contents of the config folder into /app.
COPY config .

# Build app
COPY src ./src 
RUN npx parcel build

FROM debian:12 AS app
RUN apt update && \
  apt clean && \
  apt install -y \
  git \
  python3.11-venv

WORKDIR /app

COPY app.py config/uwsgi.ini requirements.txt ./

# Set up Python environment
RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt

COPY --from=builder /app/dist ./dist
CMD ["venv/bin/uwsgi", "--ini", "uwsgi.ini", "-w", "app:app"]