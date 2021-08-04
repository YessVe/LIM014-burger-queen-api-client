import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrdersModel, OrderProductModel, OrdersModel } from '../models/orders.model';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-orders-kitchen',
  templateUrl: './orders-kitchen.component.html',
  styleUrls: ['./orders-kitchen.component.css']
})
export class OrdersKitchenComponent implements OnInit {
  clicked: boolean;
  isKitchen:boolean = true;
  orders: any
  orderPending: Array<OrdersModel>
  orderDelivering: Array<OrdersModel>
  
  pedido$:Observable<OrdersModel[]>;
  itemList: any;


  constructor(private orderService: OrdersService) {
    this.clicked = true;
    this.orders = [];
    this.orderPending = [];
    this.orderDelivering = [];
    this.pedido$=this.orderService.cart$;
  }

  ngOnInit(): void {
    this.bringAllOrders()
  }

  bringAllOrders(){
    this.orderService.getAllOrders()
    .subscribe((response) => { 
        this.orders = response;
        this.orderPending = response.filter((elem: any) => elem.status === 'pending')
        .sort((a: OrdersModel, b: OrdersModel)=> {
          let formatA: any = dayjs(a.dateEntry).format('HHmmss')
          let formatB: any = dayjs(b.dateEntry).format('HHmmss')
          return formatA - formatB;
        })
        this.orderDelivering = response.filter((elem: any) => elem.status === 'delivering')
        .sort((a: OrdersModel, b: OrdersModel) => {
          let formatA: any = dayjs(a.dateEntry).format('HHmmss')
          let formatB: any = dayjs(b.dateEntry).format('HHmmss')
          return formatA - formatB;
        })
    })
  }
  changeFalse() {
    this.clicked = false
  }
  changeTrue() {
    this.clicked = true
  }
  updateOneOrder(item: any){
    const dateProcesed = dayjs();
    if (item.status === 'pending') {
      const order ={
        ...item,
        status: 'delivering',
        dateProcesed: dateProcesed.format('YYYY-MM-DD HH:mm:ss')
      }
      this.orderService.updateOrder(item._id, order)
      .subscribe(()=>{
        this.orderService.publicarOrden(item);
        this.bringAllOrders()
      })  
    } else if (item.status === 'delivering') {
      const order ={
        ...item,
        status: 'delivered',
        dateProcesed: dateProcesed.format('YYYY-MM-DD HH:mm:ss')
      }
      this.orderService.updateOrder(item._id, order)
      .subscribe(()=>{
        this.orderService.publicarOrden(item);
        this.bringAllOrders()
      })  
    }
  }

}

// .pipe(
//   catchError((error)=>{
//     return throwError(error);
//   })
// )  