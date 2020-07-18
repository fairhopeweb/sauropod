export interface App {
  name: string,
  description: string,
  icon: string,
  token: string,
}

export interface AppArray extends Array<App> {};
