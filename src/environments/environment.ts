// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
//apiURL: 'https://apinet5.enviosecuador.net',
  apiURL: 'https://localhost:5001', // ADMIN
  //apiURL: 'https://localhost:44320'// CLIENTES

  tuplas: {
    creditReason: {
      transferenciaDirecta: 'D415C4309D2F17D8E055000000000001',
      transferenciaInterbancaria: 'D415C4309D3017D8E055000000000001',
      deposito: 'D415C4309D3117D8E055000000000001',
    },
    creditMovementStatus: {
      porVerificar: 'D415C4309D3517D8E055000000000001',
      encontrado: 'D415C4309D3617D8E055000000000001',
      noEncontrado: 'D415C4309D3717D8E055000000000001'
    },
  },
  mediaTypes: {
    accountType: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.accounttype.full+json',
          getAllXml: 'application/vnd.dsalpha.accounttype.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.accounttype.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.accounttype.full+json',
          getXml: 'application/vnd.dsalpha.accounttype.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.accounttype.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.accountTypeforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.accountTypeforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.accountTypefordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.accountTypefordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.accountTypeforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.accountTypeforPatch.hateoas+json'
        }
      }
    },
    bank: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.bank.full+json',
          getAllXml: 'application/vnd.dsalpha.bank.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.bank.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.bank.full+json',
          getXml: 'application/vnd.dsalpha.bank.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.bank.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.bankforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.bankforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.bankfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.bankfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.bankforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.bankforPatch.hateoas+json'
        }
      }
    },
    creditMovementStatus: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.creditMovementStatus.full+json',
          getAllXml: 'application/vnd.dsalpha.creditMovementStatus.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.creditMovementStatus.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.creditMovementStatus.full+json',
          getXml: 'application/vnd.dsalpha.creditMovementStatus.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.creditMovementStatus.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.creditMovementStatusforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.creditMovementStatusforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.creditMovementStatusfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.creditMovementStatusfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.creditMovementStatusforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.creditMovementStatusforPatch.hateoas+json'
        }
      }
    },
    creditReason: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.creditreason.full+json',
          getAllXml: 'application/vnd.dsalpha.creditreason.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.creditreason.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.creditreason.full+json',
          getXml: 'application/vnd.dsalpha.creditreason.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.creditreason.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.creditReasonforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.creditReasonforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.creditReasonfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.creditReasonfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.creditReasonforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.creditReasonforPatch.hateoas+json'
        }
      }
    },
    debitMovementStatus: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.debitMovementStatus.full+json',
          getAllXml: 'application/vnd.dsalpha.debitMovementStatus.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.debitMovementStatus.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.debitMovementStatus.full+json',
          getXml: 'application/vnd.dsalpha.debitMovementStatus.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.debitMovementStatus.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.debitMovementStatusforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.debitMovementStatusforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.debitMovementStatusfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.debitMovementStatusfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.debitMovementStatusforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.debitMovementStatusforPatch.hateoas+json'
        }
      }
    },
    debitReason: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.debitreason.full+json',
          getAllXml: 'application/vnd.dsalpha.debitreason.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.debitreason.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.debitreason.full+json',
          getXml: 'application/vnd.dsalpha.debitreason.full+xml',
          getJsonHateoas: 'application/vnd.dsalpha.debitreason.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.debitReasonforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.debitReasonforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.debitReasonfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.debitReasonfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.debitReasonforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.debitReasonforPatch.hateoas+json'
        }
      }
    },
    bankAccounts: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.bankAccount.full+json',
          getAllXml: 'application/vnd.dsalpha.bankAccount.full+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.bankAccount.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha+json',
          getXml: 'application/vnd.dsalpha+xml',
          getJsonHateoas: 'application/vnd.dsalpha.hateoas+json',

          getJsonCreditAndDebitmovements: 'application/vnd.dsalpha.creditAndDebitmovements+json',
          getXmlCreditAndDebitmovements: 'application/vnd.dsalpha.creditAndDebitmovements+xml',
          getJsonHateoasCreditAndDebitmovements: 'application/vnd.dsalpha.creditAndDebitmovements.hateoas+json',

          getJsonCreditmovements: 'application/vnd.dsalpha.creditmovements+json',
          getXmlCreditmovements: 'application/vnd.dsalpha.creditmovements+xml',
          getJsonHateoasCreditmovements: 'application/vnd.dsalpha.creditmovements.hateoas+json',

          getJsonDebitmovements: 'application/vnd.dsalpha.debitmovements+json',
          getXmlDebitmovements: 'application/vnd.dsalpha.debitmovements+xml',
          getJsonHateoasDebitmovements: 'application/vnd.dsalpha.debitmovements.hateoas+json',
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.bankAccountforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.bankAccountforcreation.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.bankAccountfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.bankAccountfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.bankAccountforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.bankAccountforPatch.hateoas+json'
        }
      }
    },
    creditMovement: {
      get: {
        accept: {
          getAllJson: 'application/vnd.dsalpha.creditMovement+json',
          getAllXml: 'application/vnd.dsalpha.creditMovement+xml',
          getAllJsonHateoas: 'application/vnd.dsalpha.creditMovement.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getJson: 'application/vnd.dsalpha.creditMovement+json',
          getXml: 'application/vnd.dsalpha.creditMovement+xml',
          getJsonHateoas: 'application/vnd.dsalpha.creditMovement.hateoas+json',
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.creditMovementforcreation+json',
          postJsonHateoas: 'application/vnd.dsalpha.creditMovementforcreation.hateoas+json'
        }
      },
      postVerified: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.VerifyCreditMovements+json',
          postJsonHateoas: 'application/vnd.dsalpha.VerifyCreditMovements.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.creditMovementforupdate+json',
          putJsonHateoas: 'application/vnd.dsalpha.creditMovementforupdate.hateoas+json'
        }
      },
      putDelete: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.creditMovementfordelete+json',
          putJsonHateoas: 'application/vnd.dsalpha.creditMovementfordelete.hateoas+json'
        }
      },
      patch: {
        ContentType: {
          patchJson: 'application/vnd.dsalpha.creditMovementforPatch+json',
          patchJsonHateoas: 'application/vnd.dsalpha.creditMovementforPatch.hateoas+json'
        }
      }
    },
    // creditMovementImported: {
    //   get: {
    //     accept: {
    //       getAllJson: 'application/vnd.dsalpha.creditMovementsImported.full+json',
    //       getAllXml: 'application/vnd.dsalpha.creditMovementsImported.full+xml',
    //       getAllJsonHateoas: 'application/vnd.dsalpha.creditMovementsImported.full.hateoas+json'
    //     }
    //   },
    //   getUnique: {
    //     accept: {
    //       getJson: 'application/vnd.dsalpha.creditMovementsImported.full+json',
    //       getXml: 'application/vnd.dsalpha.creditMovementsImported.full+xml',
    //       getJsonHateoas: 'application/vnd.dsalpha.creditMovementsImported.full.hateoas+json',
    //     }
    //   },
    //   post: {
    //     ContentType: {
    //       postJson: 'application/vnd.dsalpha.creditMovementsImportedforcreation+json',
    //       postJsonHateoas: 'application/vnd.dsalpha.creditMovementsImportedforcreation.hateoas+json'
    //     }
    //   },
    //   patch: {
    //     ContentType: {
    //       patchJson: 'application/vnd.dsalpha.creditMovementsImportedforPatch+json',
    //       patchJsonHateoas: 'application/vnd.dsalpha.creditMovementsImportedforPatch.hateoas+json'
    //     }
    //   }
    // },

    client: {
      get: {
        accept: {
          getAllclientToEmployeeAJson: 'application/vnd.dsalpha.clientToEmployeeA.full+json',
          getAllclientToEmployeeAXml: 'application/vnd.dsalpha.clientToEmployeeA.full+xml',
          getAllclientToEmployeeAJsonHateoas: 'application/vnd.dsalpha.clientToEmployeeA.full.hateoas+json',
          getAllclientToOwnerJson: 'application/vnd.dsalpha.clientToOwner.full+json',
          getAllclientToOwnerXml: 'application/vnd.dsalpha.clientToOwner.full+xml',
          getAllclientToOwnerJsonHateoas: 'application/vnd.dsalpha.clientToOwner.full.hateoas+json'
        }
      },
      getUnique: {
        accept: {
          getAllclientToEmployeeAJson: 'application/vnd.dsalpha.clientToEmployeeA.full+json',
          getAllclientToEmployeeAXml: 'application/vnd.dsalpha.clientToEmployeeA.full+xml',
          getAllclientToEmployeeAJsonHateoas: 'application/vnd.dsalpha.clientToEmployeeA.full.hateoas+json',
          getAllclientToOwnerJson: 'application/vnd.dsalpha.clientToOwner.full+json',
          getAllclientToOwnerXml: 'application/vnd.dsalpha.clientToOwner.full+xml',
          getAllclientToOwnerJsonHateoas: 'application/vnd.dsalpha.clientToOwner.full.hateoas+json'
        }
      },
      post: {
        ContentType: {
          postJson: 'application/vnd.dsalpha.PostCreateClient+json',
          postJsonHateoas: 'application/vnd.dsalpha.PostCreateClient.hateoas+json'
        }
      },
      put: {
        ContentType: {
          putJson: 'application/vnd.dsalpha.UpdateClient+json',
          putJsonHateoas: 'application/vnd.dsalpha.UpdateClient.hateoas+json'
        }
      },
    },

  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
