export const auth = (ctx, user) => {
  if (ctx && ctx.isServer) {
    const splitRoute = ctx.pathname.split('/')
    const isAuth = splitRoute.indexOf('dashboard') !== -1
    if (
      user &&
      (!user.id || !user.authToken) &&
      isAuth &&
      ctx.res &&
      ctx.pathname !== '/dashboard' &&
      ctx.pathname !== '/[lang]/dashboard'
    ) {
      ctx.res.writeHead(302, {
        Location: '/dashboard'
      })
      ctx.res.end()
      return null
    }
  }
  return user
}

export const reloadAuth = (cookies, resolvedUrl, res) => {
  const user = cookies || {}
  const splitRoute = resolvedUrl.split('/')
  const isAuth = splitRoute.indexOf('dashboard') !== -1
  if (
    user &&
    (!user.id || !user.authToken) &&
    isAuth &&
    res &&
    resolvedUrl !== '/dashboard'
  ) {
    res.writeHead(302, {
      Location: '/dashboard'
    })
    res.end()
    return
  }

  return user
}
