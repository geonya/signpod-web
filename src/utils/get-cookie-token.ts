export const getCookieToken = (key: string) => {
  let token: string | null = null
  const cookies = document.cookie
  if (cookies) {
    const parseCookies = cookies.split(';')
    const accessTokenCookie = parseCookies.filter(
      (cookie) => cookie.split('=')[0] === key,
    )[0]
    if (accessTokenCookie) {
      token = accessTokenCookie.split('=')[1]
    }
  }
  return token
}
