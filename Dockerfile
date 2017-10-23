FROM docker.adeo.no:5000/bekkci/npm-builder as npm-build
ADD / /source
ENV CI=true
RUN build
CMD cd /source && npm start