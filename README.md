<br>
<p align="center">
    <img src="https://raw.githubusercontent.com/awwwesome-cz/whats-new-kit/master/images/logo.png" width="30%" alt="logo">
</p>

<h1 align="center">
    WhatsNewKit for Ionic
</h1>

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

<p align="center">
    A NPM Package to easily showcase your new app features in your Ionic App.
    <br/>
    It's designed from the ground up to be fully customized to your needs.
</p>

<p align="center">
    Original Swift Package <a href="https://github.com/SvenTiigi/WhatsNewKit/">SvenTiigi/WhatsNewKit</a>
</p>


<p align="center">
   <a href="projects/whats-new-kit">
      <img src="https://img.shields.io/badge/Documentation-100%25-green" alt="Documentation">
   </a>
   <img src="https://img.shields.io/badge/platform-iOS%20%7C%20macOS%20%7C%20iPadOS%20%7C%20Android%20%7C%20Web%20%7C%20Electron-brightgreen" alt="Platform">
   <a href="https://awwwesome.cz">
      <img src="https://img.shields.io/badge/Web-awwwesome.cz-blueviolet" alt="Web">
   </a>
</p>

<img align="right" width="315" src="https://raw.githubusercontent.com/awwwesome-cz/whats-new-kit/master/images/example.png" alt="Example">

```typescript
export class HomePage implements OnInit  {

  constructor(
    protected updateWNKService: UpdateWNKService,
  ) {
  }

  ngOnInit() {
    this.updateWNKService.whatsNew();
  }
}
```

## Features

- [x] Easily present your new app features 🤩
- [x] Automatic & Manual presentation mode ✅
- [x] Dark mode ready ☑️
- [x] Use Ionic Theming Colors 🎨
- [x] Use Stencil for reusable components
- [x] Support for Ionic - Any frontend leading framework and Capacitor 🧑‍🎨
- [x] Support any platform: iOS, macOS, iPadOS, Android, Web & Electron 📱 🖥
- [x] Adjustable content 🔧

## Installation

1. Install package from NPM using `npm i @awwwesome-cz/whats-new-kit`.
2. Create [Custom Service](projects/whats-new-kit#automatic-presentation) for automatic presentation.
3. Call `this.updateWNKService.whatsNew()` on your page.

[See complete documentation](projects/whats-new-kit).

## Example

<p align="center">
    <img width="95%" src="https://raw.githubusercontent.com/awwwesome-cz/whats-new-kit/master/images/example-app.png" alt="Example Applications">
</p>
