FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /workspace
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test"]
