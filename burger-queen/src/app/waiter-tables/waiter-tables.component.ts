import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { OrdersService } from '../services/orders/orders.service';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { OrdersModel, OrderProductModel, OrderDetailProductModel, IOrdersModel } from '../models/orders.model';
import { ProductDetailModel } from '../models/product.model';

@Component({
  selector: 'app-waiter-tables',
  templateUrl: './waiter-tables.component.html',
  styleUrls: ['./waiter-tables.component.css']
})
export class WaiterTablesComponent implements OnInit {
  prueba: Array<any> 
  items: Array<any>
  clicked: boolean;
  isDisplay:boolean = false;
  isWaiter:boolean= true;
  orders: Array<OrdersModel> //como usuarios =[]
  // orderPending: Array<OrdersModel>
  // orderDelivering: Array<OrdersModel>
  // orderDelivered: Array<OrdersModel>
  pedido$:Observable<OrdersModel[]>;
  
  constructor(private orderService: OrdersService) {
    this.prueba = []
    this.items = []
    this.clicked = true;
    this.orders = [];
    // this.orderPending = [];
    // this.orderDelivering = [];
    // this.orderDelivered = [];
    this.pedido$=this.orderService.cart$;
  }

  ngOnInit(): void {
    this.orderService.getAllOrders()
        .subscribe((response: any) => { 
        this.orders = response;
        this.allOrders(response)
        this.filterStatus('pending')
        })
  }
  
  allOrders (elem:Array<OrdersModel>){
    elem.forEach((el: OrdersModel)=>{
      this.prueba.push(el)
    })
  }
   deliverOrder(item: any){
    const dateProcesed = dayjs();
    if (item.status === 'delivering') {
      const order ={
        ...item,
        status: 'delivered',
        dateProcesed: dateProcesed.format('YYYY-MM-DD HH:mm:ss')
      }
      this.orderService.updateOrder(item._id, order)
      .subscribe(()=>{
        this.orderService.publicarOrden(item);
        this.orderService.getAllOrders()
        .subscribe((response) => { 
        this.orders = response;
        this.filterStatus('pending')
        })
      })  
    }
  } 

  testing(){
    console.log('testing');
    
  }
  filterStatus(category: any) {
    console.log('hola');
    
    this.orders = this.prueba.filter((elem: any) => {
      return elem.status === category;
    })
  }

}

  
  
// deliverOrder(item: any){
  //   this.orderService.deleteOrder(_id)
  //   .pipe(
  //     catchError((error)=>{
  //       // console.log('ERROR:', error);
  //       return throwError(error);
  //     })
  //   )
  //   .subscribe((response: OrdersModel ) => {
  //       console.log(response);
  //       console.log(this.orders);
  //       //getallorder con este this orders - añadir mensaje que si se entregó
  //       //this.orders = this.orders.filter(o => o._id !== response._id);
  //       //console.log(this.orders);
  //       return this.orders
  //    //NO ESTAMOS CAMBIANO DE ESTADO AUN
  //     })
  //} 

