FROM docker.adeo.no:5000/bekkci/npm-builder as npm-build
ADD / /source
ENV CI=true
RUN build

# TODO produksjonsklar server
CMD cd /source && npm start
EXPOSE 3000