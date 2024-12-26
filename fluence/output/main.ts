/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.12.0
 * @fluencelabs/aqua-to-js version: 0.1.0
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client';

import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client';

// Services
export interface TarotServiceDef {
    relay: (index: number, callParams: CallParams$$<'index'>) => boolean | Promise<boolean>;
}
export function registerTarotService(service: TarotServiceDef): void;
export function registerTarotService(serviceId: string, service: TarotServiceDef): void;
export function registerTarotService(peer: IFluenceClient$$, service: TarotServiceDef): void;
export function registerTarotService(peer: IFluenceClient$$, serviceId: string, service: TarotServiceDef): void;
export function registerTarotService(...args: any[]) {
    registerService$$(
        args,
        {
    "defaultServiceId": "tarotService",
    "functions": {
        "fields": {
            "relay": {
                "domain": {
                    "fields": {
                        "index": {
                            "name": "i32",
                            "tag": "scalar"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "bool",
                            "tag": "scalar"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


// Functions
export const relayTarot_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "remotePeer") [] -remotePeer-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "index") [] -index-arg-)
   )
   (xor
    (seq
     (seq
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
      (call -remotePeer-arg- ("tarotService" "relay") [-index-arg-] ret)
     )
     (new $-ephemeral-stream-
      (new #-ephemeral-canon-
       (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
      )
     )
    )
    (seq
     (seq
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
      (new $-ephemeral-stream-
       (new #-ephemeral-canon-
        (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
       )
      )
     )
     (fail :error:)
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function relayTarot(
    remotePeer: string,
    index: number,
    config?: {ttl?: number}
): Promise<boolean>;

export function relayTarot(
    peer: IFluenceClient$$,
    remotePeer: string,
    index: number,
    config?: {ttl?: number}
): Promise<boolean>;

export function relayTarot(...args: any[]) {
    return callFunction$$(
        args,
        {
    "functionName": "relayTarot",
    "arrow": {
        "domain": {
            "fields": {
                "remotePeer": {
                    "name": "string",
                    "tag": "scalar"
                },
                "index": {
                    "name": "i32",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "bool",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        relayTarot_script
    );
}
