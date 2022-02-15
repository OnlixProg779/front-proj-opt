"use strict";
exports.__esModule = true;
exports.environment = void 0;
exports.environment = {
    production: true,
    guideNull: '60000005-7004-8003-9002-100000000001',
    shippingNull: '60000005-7004-8003-9002-100000000001',
    apiURL: 'https://apinet5.enviosecuador.net',
    employeeOwnerId: '58a4c2fc-3d42-4528-a3d2-9d482766dba8',
    tuplas: {
        creditReason: {
            payId: '5d8d994c-ab04-4220-bc07-4881a1fff490',
            refundId: '9b3dccf7-4a86-4d3b-8836-9dd90716616a',
            giftEnviosEcuadorId: '466e0f23-7be0-4399-9174-bd662c7a60b7'
        },
        creditMovementStatus: {
            pendingReview: 'd1fb5e22-f539-140d-8508-d8bb837d5f40',
            payVerified: 'acd87646-db53-7137-9d0e-39a3a544f467',
            payNotFound: '59b8d9f9-cc47-f994-759e-aa3e467c3c15'
        },
        bankAccount: {
            gitRefundClient: 'c95b80e9-0bda-4c59-92a8-3f88fceae3eb',
            fromClient: {
                purchaseOfClient: '2e761934-b8df-4d7b-9d1f-3f720f0586b8',
                cancelledPurchasesOfClient: 'f088fde3-711e-4375-b5fe-0ba404f0ea2a'
            },
            fromEnviosEcuador: {
                pendingPurchases: '3811a177-7bb0-4604-8dc0-c30bc076a29f',
                cancelledPurchases: '50291654-bd8b-4ee7-952a-3c1af70924b9'
            }
        },
        orderState: {
            cancelled: '599f746d-da48-2407-c1cc-03cb0d4b08a2',
            purchased: '696df136-f89b-c0d2-b78d-a3898fc518b7',
            pending: 'a91aeea3-ff21-6ccd-f721-67ae5ce1b197',
            madeQuote: '77f37f12-1765-b9a9-2d89-0de98c193ca8',
            pendingQuote: '9b5d6be5-4139-540c-4d1a-56deeeb94f1b'
        },
        accountType: {
            payment: '5ee892ba-75f0-46fd-a6b4-b693daeb5051'
        },
        bank: {
            enviosEcuador: '118bff20-8fa3-4fda-bdd1-0b568e0a286b'
        }
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
                    getJsonHateoasDebitmovements: 'application/vnd.dsalpha.debitmovements.hateoas+json'
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
                    getJsonHateoas: 'application/vnd.dsalpha.creditMovement.hateoas+json'
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
        creditMovementImported: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.creditMovementsImported.full+json',
                    getAllXml: 'application/vnd.dsalpha.creditMovementsImported.full+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.creditMovementsImported.full.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.creditMovementsImported.full+json',
                    getXml: 'application/vnd.dsalpha.creditMovementsImported.full+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.creditMovementsImported.full.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.creditMovementsImportedforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.creditMovementsImportedforcreation.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.creditMovementsImportedforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.creditMovementsImportedforPatch.hateoas+json'
                }
            }
        },
        receivedBox: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.receivedBox+json',
                    getAllXml: 'application/vnd.dsalpha.receivedBox+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.receivedBox.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.receivedBox+json',
                    getXml: 'application/vnd.dsalpha.receivedBox+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.receivedBox.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.receivedBoxforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.receivedBoxforcreation.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.receivedBoxforupdate+json',
                    putJsonHateoas: 'application/vnd.dsalpha.receivedBoxforupdate.hateoas+json'
                }
            },
            putDelete: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.receivedBoxfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.receivedBoxfordelete.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.receivedBoxforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.receivedBoxforPatch.hateoas+json'
                }
            }
        },
        products: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.Products+json',
                    getAllXml: 'application/vnd.dsalpha.Products+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.Products.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.Products+json',
                    getXml: 'application/vnd.dsalpha.Products+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.Products.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.PostCreateProduct+json',
                    postJsonHateoas: 'application/vnd.dsalpha.PostCreateProduct.hateoas+json'
                }
            },
            putProduct: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.UpdateProduct+json',
                    putJsonHateoas: 'application/vnd.dsalpha.UpdateProduct.hateoas+json'
                }
            },
            putReceiveLocation: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.ProductsUpdateLocation+json',
                    putJsonHateoas: 'application/vnd.dsalpha.ProductsUpdateLocation.hateoas+json'
                }
            },
            putProductsInGuide: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.UpadateGuideList+json',
                    putJsonHateoas: 'application/vnd.dsalpha.UpadateGuideList.hateoas+json'
                }
            }
        },
        postBox: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.postBox+json',
                    getAllXml: 'application/vnd.dsalpha.postBox+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.postBox.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.postBox+json',
                    getXml: 'application/vnd.dsalpha.postBox+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.postBox.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.postBoxforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.postBoxforcreation.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.postBoxforupdate+json',
                    putJsonHateoas: 'application/vnd.dsalpha.postBoxforupdate.hateoas+json'
                }
            },
            putDelete: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.postBoxfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.postBoxfordelete.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.postBoxforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.postBoxforPatch.hateoas+json'
                }
            }
        },
        agency: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.agency.full+json',
                    getAllXml: 'application/vnd.dsalpha.agency.full+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.agency.full.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.agency.full+json',
                    getXml: 'application/vnd.dsalpha.agency.full+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.agency.full.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.agencyforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.agencyforcreation.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.agencyfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.agencyfordelete.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.agencyforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.agencyforPatch.hateoas+json'
                }
            }
        },
        employee: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.GetEmployees.full+json',
                    getAllXml: 'application/vnd.dsalpha.GetEmployees.full+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.GetEmployees.full.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.GetEmployee.full+json',
                    getXml: 'application/vnd.dsalpha.GetEmployee.full+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.GetEmployee.full.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.createEmployee+json',
                    postJsonHateoas: 'application/vnd.dsalpha.createEmployee.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.UpdateEmployee+json',
                    putJsonHateoas: 'application/vnd.dsalpha.UpdateEmployee.hateoas+json'
                }
            }
        },
        typePostBox: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.typePostBox.full+json',
                    getAllXml: 'application/vnd.dsalpha.typePostBox.full+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.typePostBox.full.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.typePostBox.full+json',
                    getXml: 'application/vnd.dsalpha.typePostBox.full+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.typePostBox.full.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.typePostBoxforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.typePostBoxforcreation.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.typePostBoxfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.typePostBoxfordelete.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.typePostBoxforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.typePostBoxforPatch.hateoas+json'
                }
            }
        },
        order: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.orders+json',
                    getAllXml: 'application/vnd.dsalpha.orders+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.orders.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.order+json',
                    getXml: 'application/vnd.dsalpha.order+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.order.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.createOrder+json',
                    postJsonHateoas: 'application/vnd.dsalpha.createOrder.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.updateOrder+json',
                    putJsonHateoas: 'application/vnd.dsalpha.updateOrder.hateoas+json'
                }
            },
            putDelete: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.orderfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.orderfordelete.hateoas+json'
                }
            }
        },
        orderState: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.orderState.full+json',
                    getAllXml: 'application/vnd.dsalpha.orderState.full+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.orderState.full.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.orderState.full+json',
                    getXml: 'application/vnd.dsalpha.orderState.full+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.orderState.full.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.orderStateforcreation+json',
                    postJsonHateoas: 'application/vnd.dsalpha.orderStateforcreation.hateoas+json'
                }
            },
            putDelete: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.orderStatefordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.orderStatefordelete.hateoas+json'
                }
            },
            patch: {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.orderStateforPatch+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.orderStateforPatch.hateoas+json'
                }
            }
        },
        orderProduct: {
            get: {
                accept: {
                    getAllJson: 'application/vnd.dsalpha.OrderProducts+json',
                    getAllXml: 'application/vnd.dsalpha.OrderProducts+xml',
                    getAllJsonHateoas: 'application/vnd.dsalpha.OrderProducts.hateoas+json'
                }
            },
            getUnique: {
                accept: {
                    getJson: 'application/vnd.dsalpha.OrderProducts+json',
                    getXml: 'application/vnd.dsalpha.OrderProducts+xml',
                    getJsonHateoas: 'application/vnd.dsalpha.OrderProducts.hateoas+json'
                }
            },
            post: {
                ContentType: {
                    postJson: 'application/vnd.dsalpha.PostCreateOrderProduct+json',
                    postJsonHateoas: 'application/vnd.dsalpha.PostCreateOrderProduct.hateoas+json'
                }
            },
            put: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.UpdateOrderProduct+json',
                    putJsonHateoas: 'application/vnd.dsalpha.UpdateOrderProduct.hateoas+json'
                }
            },
            putDelete: {
                ContentType: {
                    putJson: 'application/vnd.dsalpha.orderProductfordelete+json',
                    putJsonHateoas: 'application/vnd.dsalpha.orderProductfordelete.hateoas+json'
                }
            },
            "delete": {
                ContentType: {
                    patchJson: 'application/vnd.dsalpha.orderProductfordelete+json',
                    patchJsonHateoas: 'application/vnd.dsalpha.orderProductfordelete.hateoas+json'
                }
            }
        },
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
            }
        }
    }
};
