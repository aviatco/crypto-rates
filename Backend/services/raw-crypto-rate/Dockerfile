FROM node:14.15.4-alpine AS base
WORKDIR /app

FROM node:14.15.4-alpine AS modules
WORKDIR /tmp
COPY package.json package-lock.json ./

FROM modules AS dev_modules
COPY package.json package-lock.json ./
RUN npm install

FROM modules as prod_modules
RUN npm install --only=prod && npm audit fix

FROM dev_modules AS build
COPY . .
RUN npm run build

FROM base AS final
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /tmp/dist ./dist

EXPOSE 3000
ENTRYPOINT ["node", "dist/main.js"]