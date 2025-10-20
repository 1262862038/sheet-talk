FROM node:22-alpine AS build
LABEL "language"="nodejs"
LABEL "framework"="rsbuild"

WORKDIR /src
COPY . .

RUN npm install -g pnpm@9 && pnpm install
RUN pnpm run build

FROM zeabur/caddy-static
COPY --from=build /src/dist /usr/share/caddy

EXPOSE 8080
