<p align="center">
    <a href="https://sauropod.app">
      <img src="./logo.png" alt="Sauropod Logo" width="250"/>
    </a>
</p>

<h1 align="center">
  Sauropod
</h1>
<h2 align="center">
  All Your TOTP Codes On Your Desktop 
</h2>

<p align="center">
  <img src="https://travis-ci.org/getsauropod/sauropod.svg?branch=release" alt="Travis Build Status">
  <img src="https://ci.appveyor.com/api/projects/status/nmeky2blknvbr77m?svg=true" alt="AppVeyor Build Status">
  <img src="https://img.shields.io/github/license/getsauropod/sauropod" alt="License: MIT">
  <img src="https://img.shields.io/github/package-json/v/getsauropod/sauropod" alt="Version Information">
</p>

Sauropod is a Time-based One-Time Passwords (TOTP) application for your desktop. It is compatible with your HMAC-based OTP as used by services like Google, Facebook, Twitter and many more.

<p align="center">
    <img src="./branding/app.png" alt="Sauropod Screenshot" width="500"/>
</p>

Features:
- TOTP codes
- Support for all HMAC-based codes
- Cross-platform
- Completely open-source
- Automatically suggests accounts based on your current browser tab
- Accounts are stored locally so your tokens stay secure
- Import your accounts from your existing TOTP app
- Scans QR codes on your screen to add new accounts
- Open optauth:// Links to directly import new accounts
- Not resource-hungry, idling at <1% CPU and 70MB RAM usage ([Info](./branding/cpu-usage.png))

## Download

You can download Sauropod for Windows, Mac and Linux on [Sauropod's download page](https://sauropod.app/#download) or you can find all variants in the [latest stable release](https://github.com/getsauropod/sauropod/releases/latest) assets and [all the other release here](https://github.com/getsauropod/sauropod/releases)

### Or use homebrew (macOS only)

`$ brew cask install sauropod`

(Don't know homebrew? [brew.sh](https://brew.sh/))

## Development

### Install OS dependencies

#### Node.js

Please make sure you are running NodeJS v10 or above.

#### Git

The version [2.23.0](https://github.com/git-for-windows/git/releases/tag/v2.23.0.windows.1) for Git is working fine for development. You can then use the console from Git to do the development procedure.

#### Debian/Ubuntu

```bash
$ apt install libx11-dev libxext-dev libxss-dev libxkbfile-dev
```

#### Fedora

```bash
$ dnf install libX11-devel libXext-devel libXScrnSaver-devel libxkbfile-devel
```

#### Windows

```bash
$ npm install --global windows-build-tools --vs2015
```

### Clone repository

```bash
$ git clone https://github.com/getsauropod/sauropod.git
$ cd sauropod
```

### Install dependencies

Run the following command to install all dependencies, and link sibling modules with Ferdi.

```bash
$ yarn
```

### Start development app

To start Sauropod's development build, run:

```bash
$ yarn develop
```

### Packaging

```bash
$ yarn build:electron --linux # Build for Linux
$ yarn build:electron --mac # Build for macOS
$ yarn build:electron --win # Build for Windows
```

Deliverables will be available in the `dist` folder.

### Release (Maintainers only)

Create a new [draft release](https://github.com/getsauropod/sauropod/releases/new) that targets the `release` branch, then:

```bash
$ git checkout master && git pull
$ git checkout release
$ git push
```

The last commit of the `release` branch will be tagged. You can then merge `release` into `master` if needed.

## License

Sauropod is licensed under the MIT License.
