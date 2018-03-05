# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node:6.20180213.1528 as builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm install && npm run build

FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=jobbsokerkompetanse
COPY --from=builder /source/build /app

ENV FOOTER_TYPE=no_footer
