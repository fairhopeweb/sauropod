export interface App {
  name: string,
  description: string,
  icon: string,
  token: string,
}

export interface AppArray extends Array<App> {};

export interface SauropodWindow {
  services: {
    persistence?: {
      saveData: Function,
      loadData: Function,
    },
    [key: string]: any,
  },
  loaded: boolean,
}