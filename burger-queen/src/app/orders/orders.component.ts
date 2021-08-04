import { Component, Input, Output, OnInit, EventEmitter, Host } from '@angular/core';
import { OrdersModel, OrderProductModel, OrderDetailProductModel } from '../models/orders.model';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input('data') order:any;
  @Output() deliver = new EventEmitter<string>()

  isDisplay:boolean = false;
  // @Output() borrar = new EventEmitter<string>() --PARTE DE EMIT

  constructor(){  }

  ngOnInit(): void {  }

 
  
}
