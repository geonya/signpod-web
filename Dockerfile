FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json
COPY graphql.schema.json ./graphql.schema.json
COPY constants.ts ./constants.ts
COPY __mock__ ./__mock__

COPY pages ./pages
COPY public ./public
COPY theme ./theme
COPY lib ./lib
COPY hooks ./hooks
COPY components ./components
COPY utils ./utils

CMD ["npm", "run", "dev"]