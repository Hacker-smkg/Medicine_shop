FROM nikolaik/python-nodejs:python3.11-nodejs20

WORKDIR /app

# Install Python deps
COPY ai-service/requirements.txt ./ai-service/
RUN pip install --no-cache-dir -r ai-service/requirements.txt

# Install Node deps
COPY Server/package*.json ./Server/
RUN cd Server && npm install

# Copy source code
COPY Server ./Server
COPY ai-service ./ai-service

# Create an execution script to run both servers concurrently
RUN echo '#!/bin/bash\ncd /app/ai-service && uvicorn main:app --host 127.0.0.1 --port 8000 &\ncd /app/Server && npm start' > start.sh
RUN chmod +x start.sh

# The Node.js Express server runs on 5000 and exposes endpoints outward
EXPOSE 5000

CMD ["./start.sh"]
