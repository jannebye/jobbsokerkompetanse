FROM docker.adeo.no:5000/bekkci/npm-builder as builder
ADD / /source
ENV CI=true
RUN build

FROM nginx
COPY --from=builder /source/build /usr/share/nginx/html
EXPOSE 80