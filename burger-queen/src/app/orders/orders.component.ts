import { Component, Input, Output, OnInit, EventEmitter, Host } from '@angular/core';
import { OrdersModel, OrderProductModel, OrderDetailProductModel } from '../models/orders.model';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(){  }

  ngOnInit(): void {  }

}
