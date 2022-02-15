import { Injectable } from '@angular/core';
import { PropertiesButton } from './buttons-modal-routes.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateModalButtonsRouteService {

  constructor() {
  }

  private AFTER_PURCHASE_ROUTES: PropertiesButton[];
  private AFTER_RECEIVED_BOX_ROUTES: PropertiesButton[];
  private AFTER_PRODUCT_ROUTES: PropertiesButton[];
  private AFTER_ORDER_PRODUCT_ROUTES: PropertiesButton[];
  private AFTER_GUIDE_ROUTES: PropertiesButton[];

  generateRoutesBootomsAfterReceivedBox(receivedBoxId: string, clientIdByDto: string): Observable<any> {
    this.AFTER_RECEIVED_BOX_ROUTES = [
      new PropertiesButton(
        '1',                        //number
        'Add Products',                   //Tittle
        'bg-danger card-body',        //classNg
        '/postbox/received/' + receivedBoxId + '/products/clients-add-product',     //route
        'box',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'Stay here',                   //Tittle
        'bg-primary card-body',        //classNg
        '/postbox/receive-order/' + clientIdByDto,     //route
        'hash',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '3',                        //number
        'New order Empy',                   //Tittle
        'bg-secondary card-body',        //classNg
        '/postbox/receive-order/' + clientIdByDto,      //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '4',                        //number
        'Client Profile',               //Tittle
        'bg-info card-body',        //classNg
        '/clients/bills/'+clientIdByDto,     //route
        'user',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '5',                        //number
        'Dashboard',               //Tittle
        'bg-info card-body',        //classNg
        '/dashboard/default',     //route
        'home',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      )
    ];
    var routesAfterReceivedBox = new BehaviorSubject<PropertiesButton[]>(this.AFTER_RECEIVED_BOX_ROUTES);
    return routesAfterReceivedBox;
  }

  generateRoutesBootomsAfterPurchase(clientId: string, orderId: string): Observable<any> {
    this.AFTER_PURCHASE_ROUTES = [
      new PropertiesButton(
        '1',                        //number
        'Add Products',                   //Tittle
        'bg-danger card-body',        //classNg
        '/purchases/' + orderId + '/products/add-product',     //route
        'box',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'Stay here',                   //Tittle
        'bg-primary card-body',        //classNg
        '/purchases/create-purchase/' + clientId ,     //route
        'hash',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '3',                        //number
        'New Purchase',                   //Tittle
        'bg-secondary card-body',        //classNg
        '/purchases/create-purchase/' + undefined ,     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '4',                        //number
        'Client Profile',               //Tittle
        'bg-info card-body',        //classNg
        '/clients/bills/'+clientId,     //route
        'user',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '5',                        //number
        'Dashboard',               //Tittle
        'bg-info card-body',        //classNg
        '/dashboard/default',     //route
        'home',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      )
    ];
    var routesAfterOrder = new BehaviorSubject<PropertiesButton[]>(this.AFTER_PURCHASE_ROUTES);
    return routesAfterOrder;
  }

  // Quedarme Aqui, Agregar nueva orden, Home, Profile Cliente 
  generateRoutesBootomsAfterProduct(clientId, receivedBoxId: string): Observable<any> {
    this.AFTER_PRODUCT_ROUTES = [
      new PropertiesButton(
        '1',                        //number
        'Add more products',                   //Tittle
        'bg-danger card-body',        //classNg
        '/orders/received/' + receivedBoxId + '/products/clients-add-product',     //route
        'hash',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'New Receive (Same client)',                   //Tittle
        'bg-primary card-body',        //classNg
        '/orders/receive-order/'+clientId,     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '3',                        //number
        'New Receive',                   //Tittle
        'bg-secondary card-body',        //classNg
        '/orders/receive-order/undefined',     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '4',                        //number
        'Client Profile',               //Tittle
        'bg-info card-body',        //classNg
        '/clients/bills/'+clientId,     //route
        'user',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '5',                        //number
        'Dashboard',               //Tittle
        'bg-info card-body',        //classNg
        '/dashboard/default',     //route
        'home',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      )
    ];
    var routesAfterProducts = new BehaviorSubject<PropertiesButton[]>(this.AFTER_PRODUCT_ROUTES);
    return routesAfterProducts;
  }

  //HOME - Nueva Guia - Lista de guias
  generateRoutesBootomsAfterGuide(): Observable<any> {
    this.AFTER_GUIDE_ROUTES = [
      new PropertiesButton(
        '1',                        //number
        'New Guide',                   //Tittle
        'bg-secondary card-body',        //classNg
        '/guides/create-guide',     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'Guides List',                   //Tittle
        'bg-primary card-body',        //classNg
        '/guides/list-guide',     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'Dashboard',               //Tittle
        'bg-info card-body',        //classNg
        '/dashboard/default',     //route
        'home',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      )
    ];
    var routesAfterGuide = new BehaviorSubject<PropertiesButton[]>(this.AFTER_GUIDE_ROUTES);
    return routesAfterGuide;
  }

  generateRoutesBootomsAfterOrderProduct(clientId, orderId: string): Observable<any> {
    this.AFTER_ORDER_PRODUCT_ROUTES = [
      new PropertiesButton(
        '1',                        //number
        'Add more products',                   //Tittle
        'bg-danger card-body',        //classNg
        '/purchases/' + orderId + '/products/add-product',     //route
        'hash',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '2',                        //number
        'New Purchase (Same client)',                   //Tittle
        'bg-primary card-body',        //classNg
        '/purchases/create-purchase/'+clientId,     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '3',                        //number
        'New Purchase',                   //Tittle
        'bg-secondary card-body',        //classNg
        '/purchases/create-purchase/undefined',     //route
        'archive',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '4',                        //number
        'Client Profile',               //Tittle
        'bg-info card-body',        //classNg
        '/clients/bills/'+clientId,     //route
        'user',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      ),
      new PropertiesButton(
        '5',                        //number
        'Dashboard',               //Tittle
        'bg-info card-body',        //classNg
        '/dashboard/default',     //route
        'home',                      //icon
        'font-danger',                //iconClass
        ''                            // style
      )
    ];
    var routesAfterProducts = new BehaviorSubject<PropertiesButton[]>(this.AFTER_ORDER_PRODUCT_ROUTES);
    return routesAfterProducts;
  }
}
