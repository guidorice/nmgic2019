# setup Docker development environment having nodejs, yarn, and git

FROM ubuntu:latest

RUN apt-get update && \
    apt-get upgrade --yes

# safe to ignore warning...
#   debconf: delaying package configuration, since apt-utils is not installed
#   https://stackoverflow.com/questions/51023312/docker-having-issues-installing-apt-utils

RUN apt-get install --yes --no-install-recommends \
    ca-certificates \
    build-essential \ 
    curl \
    emacs-nox \
    git \
    less \
    unzip

# nodejs: apt-get would install nodejs v8 but we want current version
RUN curl --show-error --silent --location https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install --yes --no-install-recommends nodejs

# yarn: ubuntu:latest comes with a conflicting yarn alias, cmdtest.
RUN apt-get remove --yes cmdtest && \
    curl --show-error --silent https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - > /dev/null 2>&1 && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install --yes --no-install-recommends yarn

# cleanup apt-get cruft
RUN apt-get autoremove --yes && \
    rm --recursive --force /var/lib/apt/lists/*

# create user for development
RUN useradd --create-home --shell /bin/bash dev

# copy github repo into dev user's home
COPY --chown=dev:dev . /home/dev/app

# dev user for any run, cmd, or entrypoint instructions added later...
WORKDIR /home/dev
USER dev

# add yarn bin to dev's path
RUN echo export PATH="$(yarn global bin):$PATH" >> .bashrc

# expose development webserver port
EXPOSE 3000/tcp
