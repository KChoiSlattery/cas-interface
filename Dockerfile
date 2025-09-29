FROM debian:12

RUN apt update && \
  apt clean && \
  apt install -y \
  git \
  nodejs \
  npm

WORKDIR /usr/app

# Set up Node
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci

# Build app
COPY src ./src 
COPY tsconfig.json .parcelrc ./
RUN npx parcel build

FROM debian:12
RUN apt update && \
  apt clean && \
  apt install -y \
  git \
  python3.11-venv

WORKDIR /usr/app

COPY app.py ./
COPY uwsgi.ini ./

# Set up Python environment
COPY requirements.txt ./
RUN python3 -m venv venv
RUN venv/bin/pip install -r requirements.txt

CMD ["venv/bin/uwsgi", "--ini", "uwsgi.ini", "-w", "app:app"]