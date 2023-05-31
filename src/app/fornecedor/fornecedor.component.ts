import { Component, OnInit } from '@angular/core';
import { Supplier } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit{

    category: any = ['Regional', 'Nacional', 'Internacional'];
  
  supplier: Supplier[] = [];
  formGroup : FormGroup;
  isEditing: boolean = false;
    constructor (private service: fornecedorService,
                private formBuilder: FormBuilder)
                {
                  this.formGroup = formBuilder.group({
                      id: [''],
                      name: [''],
                      active: [''],
                      category: [''],
                      contact: ['']
                  });
                }
  
    ngOnInit(): void {
      this.loadSuppliers();
    }
  
  
    changeCategory(e: any) {
      this.category?.setValue(e.target.value, {
        onlySelf: true,
      });
    }
    // Access formcontrols getter
    get categoryName() {
      return this.formGroup.get('category');
    }
  
    loadSuppliers(){
      this.service.getSupplier().subscribe(
        {
        next: data => this.supplier = data,
        error: (msg) => console.log("Erro ao chamar o endpoint " + msg)
      }
  
      )
    }
  
    save(){
      if(this.isEditing){
  
        this.service.update(this.formGroup.value).subscribe(
          {
            next: ()=>{
              this.loadSuppliers();
              this.isEditing =false;
              this.formGroup.reset();
            }
  
          }
        )
      }
      else{
  
        this.service.save(this.formGroup.value).subscribe(
          {
            next: data => {
              this.supplier.push(data);
              this.formGroup.reset();
            }
          }
  
        );
  
    }
    }
  
    remove(supplier : Supplier): void{
     this.service.remove(supplier).subscribe(
        {
          next : () => this.loadSuppliers()
        })
  
    }
    edit(supplier : Supplier){
      this.formGroup.setValue(supplier);
      this.isEditing = true;
    }
  }

