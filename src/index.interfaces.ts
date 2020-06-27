import { AuthProvider } from "ataraxia";

export interface NetKitConfiguration {
    /**
     * @description Network name
     * @default "runspace"
     */
    name?: string;
    authentication: AuthProvider[]
    /**
     * @description If this client should connect to the network as an endpoint. This helps the network know that this client isn't intended to perform routing and that a transport may opt to connect to fewer peers.
	 */
    endpoint?: boolean
}
