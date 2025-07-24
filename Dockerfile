FROM debian:12

RUN apt update && \
    apt clean && \
    apt install -y \
      git \
      build-essential \
      default-jdk \
      python3.11-venv \
      nodejs \
      npm