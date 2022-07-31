export type AuthProvider = 'azuread'

export type AuthItem = {
  provider: AuthProvider
  id: string
}

export type PinInfo = {
  chatId: number
  requiredAuth: AuthItem[]
}
