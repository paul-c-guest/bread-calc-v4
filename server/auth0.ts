import { expressjwt as jwt, GetVerificationKey } from "express-jwt"
import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { JwtPayload } from "jsonwebtoken"
import jwks from "jwks-rsa"

const domain = "https://good-leavening.au.auth0.com"

// audience is now set in Auth0Provider options in client/main.tsx
// const audience = "https://good-leavening/api/"

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  // audience: audience,
  issuer: `${domain}/`,
  algorithms: ["RS256"],
})

export default checkJwt

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface JwtRequest<TReq = any, TRes = any>
  extends Request<ParamsDictionary, TRes, TReq> {
  auth?: JwtPayload
}
