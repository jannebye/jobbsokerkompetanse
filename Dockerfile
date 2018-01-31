# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm install && npm run build

FROM ${BASE_IMAGE_PREFIX}nginx
COPY --from=builder /source/build /usr/share/nginx/html/jobbsokerkompetanse
EXPOSE 80
