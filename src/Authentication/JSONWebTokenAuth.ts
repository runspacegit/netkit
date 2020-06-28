import { AuthProvider, AuthServerFlow, AuthClientFlow, AuthServerReplyType } from "ataraxia";
import jwt from "jwt-simple";
import { str2ab, ab2str } from "./utils";

export class JSONWebTokenAuth implements AuthProvider {
    public readonly id = 'jsonwebtoken';
    private secret: string;

    /**
     * @description JSONWebToken Auth implementation for NetKit/Ataraxia
     * @param secret JSON Web Token Secret
     */
    constructor(secret: string) {
        this.secret = secret;
    }

    public createClientFlow(): AuthClientFlow {
        const { secret } = this;

        return {
            initialMessage() {
                return Promise.resolve(str2ab(jwt.encode(true, secret, "HS512")));
            },

            receiveData() {
                return Promise.reject();
            },

            destroy() {
                return Promise.resolve();
            }
        };
    }

    public createServerFlow(): AuthServerFlow {
        const { secret } = this;

        return {
            receiveInitial(data: ArrayBuffer) {
                const token = ab2str(data);
                if (jwt.decode(token, secret, false, "HS512") == true) {
                    return Promise.resolve({
                        type: AuthServerReplyType.Ok
                    });
                } else {
                    return Promise.resolve({
                        type: AuthServerReplyType.Reject
                    });
                }
            },

            receiveData() {
                return Promise.reject();
            },

            destroy() {
                return Promise.resolve();
            }
        };
    }
}