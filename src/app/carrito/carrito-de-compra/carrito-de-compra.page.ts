import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { idProducto, Productos } from 'src/app/producto/modelo/productos';
import { TiendaService } from 'src/app/servicio/tienda.service';

@Component({
  selector: 'app-carrito-de-compra',
  templateUrl: './carrito-de-compra.page.html',
  styleUrls: ['./carrito-de-compra.page.scss'],
})
export class CarritoDeCompraPage implements OnInit {
  cart: any;
  public mostrarTodo: any;
  constructor(private notebookApi:TiendaService, private router: Router,
    private navControl: NavController) { }

  ngOnInit(){
     this.notebookApi.listarProductos().subscribe(res=>{
      this.cart = res;
     });
  }

  public async eliminarProducto(item: number){
    return this.notebookApi.eliminarProducto(item).subscribe();


  }
  public  removerUnItem(item:any){
    this.notebookApi.eliminarPorUno(item);
    console.log('Producto Decrecido en 1')
  }
  public incrementarProduct(item: any){
    this.notebookApi.añadirCarrito(item);
    console.log('Producto Aumentado en 1')
  }
  public obtenerTotal(){
    return this.cart.reduce((i,j)=>i+j.precio* j.cantidad,0);
  }
}
