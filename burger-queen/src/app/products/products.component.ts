import { Component, OnInit } from '@angular/core';
import { IProductsModel, ProductDetailModel } from '../models/product.model';
import { ProductsService } from '../services/product/products.service';
import { OrdersService } from '../services/orders/orders.service'
import { OrderProductModel} from '../models/orders.model'
import { FormControl, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items: Array<ProductDetailModel>
  productItem: Array<OrderProductModel>
  productsTypes = new Set()
  typesProduct = 'burger'
  products: Array<ProductDetailModel>
  total: number
  show: boolean
  showButton: boolean
  nameClient: FormControl
  client: string
  today: number 

  constructor(private productsService: ProductsService, private orderService: OrdersService) { 
    this.productItem = []
    this.items = []
    this.products = [] //contiene todos
    this.total = 0
    this.show = false
    this.showButton = false
    this.nameClient = new FormControl('', [Validators.required]);
    this.client = ""
    this.today = Date.now()
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe((response: any) => { 
      console.log(response);
      this.items = response.products
      this.allProducts(response)
      this.filterType('burger')
    })
    this.getTotal()
  }
  allProducts (elem:Array<ProductDetailModel>){
    elem.forEach((el: ProductDetailModel)=>{
      this.products.push(el)
    })
  }
  filterType(category: any) {
    this.items = this.products.filter((elem: ProductDetailModel) => {
      return elem.type === category;
    })
  }

  // Métodos para el componente del Modal
  getModal(element: boolean){
    this.show = element
  }
  closeModal(element: boolean){
    this.show = element
  }
  getName(element: boolean, ){
    this.show = element
    this.client = this.nameClient.value
    this.nameClient.reset()
  }
  addItemToCar(item: any){ 
    const modelProduct = {
      qty: 1,
      product: {
        name: item.name,
        id: item._id,
        price: item.price
      }
    }  
    if (this.productItem) {
          let productExistInCar = this.productItem
          .find(product => item._id === product.product.id)
          if (!productExistInCar) {
            this.productItem.push(modelProduct)
          }
          // console.log(this.productItem);
    }    
    this.getTotal()
  }
  // Métodos para el componente del carrito de compras
  minousOneItem(item: OrderProductModel){
    this.productItem = this.productItem.map((el)=>{
      if (el.product.id === item.product.id && el.qty > 1) {
        el.qty--
      }
      return el
    })
    this.getTotal()
  }
  plusOneItem(item: OrderProductModel){
    this.productItem = this.productItem.map((el)=>{
      if (el.product.id === item.product.id) {
        el.qty++
      }else if (el.product.id === item.product.id && el.qty <= 1) {
        let index = this.productItem.indexOf(item)
        this.productItem.splice(index, 1)
      }
      return el
    })
    this.getTotal()
  }
  trashItem(item: OrderProductModel){
    let index = this.productItem.indexOf(item)
    this.productItem.splice(index, 1)
    this.getTotal()
  }
  getTotal() {
    this.total = this.productItem
      .map(item => item.qty * item.product.price)
      .reduce((acc, item) => acc += item, 0)
      if(this.total>0){
        this.showButton=true}
      else{
        this.showButton=false
      }
  }

  // Método para crear una nueva orden y enviar a Kitchen
  newOrderClient(client: any){
    const token: any = localStorage.getItem('accessToken')
    const user: any = jwtDecode(token);
    const order = {
      status: "pending",
      userId: user.uid,
      client: this.client,
      products: this.productItem.map((item) => ({
        productId: item.product.id,
        qty: item.qty,
      })),
    }
    this.orderService.createOrder(order)
    .pipe(
      catchError((error)=>{
        if (error) {
          alert('Try again, please. There is something wrong')
        }
        return throwError(error)
      })
    )
    .subscribe((response) => {
      // this.orderService.publicarOrden(response)
      console.log(response);
      this.productItem = [];
      client = client.value;
      this.getTotal()
    })
    
  }
}


