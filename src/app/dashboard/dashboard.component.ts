import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'; 
import { MastersService } from "app/service/masters.service";
import { Farmer } from "./farmerinfo";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listData: MatTableDataSource<any>;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    "S.No",
    "EmployeeName",
    "PhoneNo",
    "Actions"
  ];
  editFarmer = true;
  editFarmers = false;
  editFarmerContent = "add_circle";
  FarmerNames = "Employee's List";
  userFarmersdata: Farmer[] = [];
  displayddl: string;
  updateFarmer = false;
  viewFarmer = false;
  Editcoun: any = [];
  Editfarm: any = [];
  isLoading = true;
  secretKey: string;
  displayNoRecords = false;
  getvillId: any;
  villid: any;
  sStatesData: any[];
  sDistrtictsData: any[];
  sMandalsData: any[];
  sCountriesData: any[];
  createBtn: boolean;
  EditBtn: boolean;
  delBtn: boolean;
  read: boolean;
  nadata:any;
  datass = false

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  extraForm = this.formBuilder.group({
    

    salary: [
      "",
      [
      ]
    ],

    lange: [
      "",
      [
      ]
    ],
 
  });


  FarmerForm = this.formBuilder.group({
    EmployeeName: [
      "",
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z\\s]+$")
      ]
    ],
    
    PhoneNo: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("[6-9]\\d{9}")
      ]
    ],

    Country: [
      "",
      [
      ]
    ],

    State: [
      "",
      [
      ]
    ],
 
  });





  constructor(
    private ls: MastersService,
    private formBuilder: FormBuilder,
  ) { }

  Image = this.formBuilder.group({
    Activity: ['', [Validators.required]]
  });

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  applyFilter() {
    this.listData.filter = this.secretKey.trim().toLowerCase();
    if (this.listData.filteredData.length === 0) {
      this.displayNoRecords = true;
    } else {
      this.displayNoRecords = false;
    }
  }
  onSearchClear() {
    this.secretKey = "";
    this.applyFilter();
  }

  resetForm() {
    if (this.FarmerForm.valid) {
   
        this.FarmerForm.reset();
    }

  }

  resetextra(){
  if(this.extraForm.valid){
    this.extraForm.reset();}
  }

  ngOnInit() {
    this.displayfarmers();
    this.getCountrties();
  }

  getCountrties() {
    this.sStatesData = [];
    this.sDistrtictsData = [];
    this.sMandalsData = [];
    this.getvillId = [];
    this.ls.getCountriesData().subscribe((response) => {
      this.sCountriesData = response;
      //console.log('thisis cohntries', this.sCountriesData);
    });
  }
 

  onChangeCountry(ID: string) {
    if (ID) {
      this.ls.getStatesDataByCountry(ID).subscribe(res => {
        if (res['data'] === "No Data Available with this ID") {
          alert ('No States Available with this Country')  
          this.sStatesData = [];
          this.FarmerForm.controls.State.patchValue('')
        } else {
          this.FarmerForm.controls.State.patchValue('')
          this.sStatesData = res;
        }
      })
    }
  }
  


  displayfarmers() {
    this.ls.getFarmerdata().subscribe(
      list => {
        this.isLoading = false;
        this.userFarmersdata = list;
        if (list.length === 0) {
          this.displayNoRecords = true;
        } else {
          this.displayNoRecords = false;
        }
        this.listData = new MatTableDataSource(this.userFarmersdata);
        // tslint:disable-next-line: max-line-length
        this.listData.filterPredicate = (data: Farmer, filter: string) =>
          data.EmployeeName.toLowerCase().indexOf(filter) !== -1
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  toggleEditFarmer() {
    this.displayfarmers();
    this.FarmerForm.reset();
    this.FarmerNames =
      this.FarmerNames === "Add Employee" ? "Employee's List" : "Add Employee";
    this.editFarmerContent =
      this.editFarmerContent === "cancel" ? "add_circle" : "cancel";
      this.editFarmer = !this.editFarmer;
    this.displayddl = this.editFarmer ? "inline" : "none";
  }

  toggleUpdateFarmers(getFarmersDataObj) {
    this.Editfarm = getFarmersDataObj;
    this.updateFarmer = !this.updateFarmer;
    this.displayddl = !this.editFarmer ? "inline" : "none";
    this.ls.getCountriesData().subscribe(res => {
      this.sCountriesData = res;
      for (let data of this.sCountriesData) {
        if (data.ID === this.Editfarm.Country) {
          this.Editfarm.Country = data.CountryName;
        }
      }
    })
    this.ls.getStatesDataByCountry(this.Editfarm.Country).subscribe(res => {
      this.sStatesData = res;
      for (let data of this.sStatesData) {
        if (data.ID === this.Editfarm.State) {
          this.Editfarm.State = data.StateName;
        }
      }
    })
    this.FarmerForm.setValue({
      EmployeeName: this.Editfarm.EmployeeName,
      Country: this.Editfarm.Country,
      State: this.Editfarm.State,
      PhoneNo: this.Editfarm.PhoneNo,
    });
  }

  toggleUpdateFarmer2() {
    this.updateFarmer = false;
    this.displayddl = this.editFarmer ? "inline" : "block";
  }

toleup(){
  this.resetForm();
  this.resetextra();
  this.datass =false;
  this.editFarmers = !this.editFarmers;
  this.displayddl = !this.editFarmer ? "inline" : "none";
}

tolset(){
  this.resetextra();
  this.FarmerForm.controls.Country.patchValue('');
  this.FarmerForm.controls.State.patchValue('');
  this.FarmerForm.controls.EmployeeName.patchValue('');
  this.FarmerForm.controls.State.patchValue('');
  this.editFarmers = false;
  this.displayddl = this.editFarmer ? "inline" : "block";
}


Createextra(){
  if (!this.extraForm.valid) {
    Object.keys(this.FarmerForm.controls).forEach(field => {
      const control = this.FarmerForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
      alert ("Fill The Required Fields")
  } else {
    console.log(this.extraForm.value)
    this.nadata = this.extraForm.value;
    console.log(this.nadata)
    this.resetextra();
    this.datass= true;
  }
}


  CreateFarmer() {
    if (!this.FarmerForm.valid) {
      Object.keys(this.FarmerForm.controls).forEach(field => {
        const control = this.FarmerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
        alert ("Fill The Required Fields")
    } else {
      console.log('EmployeeData',this.FarmerForm.value)
      console.log('extradata',this.nadata)
      this.ls.saveFarmerdata(this.FarmerForm.value).subscribe(
        res => {

          if (res["data"] === "Successfully Posted") {    
              alert ("Sucessfully added the Employee"),
            this.resetForm();
            this.tolset();
            this.displayfarmers();
          } else if ((res["data"] = "serverErrorfarmerExistences")) {
              alert("Employee Already Exists with Same Details")
          }
        },
        err => console.error(err)
      );
    }
  }

  UpdateFarmers(data) {
    this.Editfarm = data;
    if (!this.FarmerForm.valid) {
      Object.keys(this.FarmerForm.controls).forEach(field => {
        const control = this.FarmerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
     
        alert("Fill The Mandatory Fields")
    } else {
      this.ls
        .updateFarmerByID(this.Editfarm.ID, this.FarmerForm.value)
        .subscribe(
          res => {
            // tslint:disable-next-line:max-line-length
            // if (this.Editfarm.FarmerName === this.FarmerForm.controls.FarmerName.value  && this.Editfarm.MobileNumber === this.FarmerForm.controls.MobileNumber.value) {
            //   ////console.log("no update");
            //   Swal.fire({
            //     position: 'center',
            //     type: 'info',
            //     title: 'No update Found',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
            //   this.barButtonOptions.active = false;
            //   this.barButtonOptions.text = 'SUBMIT';
            // } else
            if (res["data"] === "Successfully Updated") {
             
                alert( "Sucessfully Edited")
             
              this.displayfarmers();
              this.toggleUpdateFarmer2();
            } else if ((res["data"] = "serverErrorfarmerExistences")) {
              
                alert("Farmer Already Exists with Details")
               
            }
          },

        );
    }
  }

  deleteFarmer(id: string) {  
    console.log(id)
        this.ls.deleteFarmerByID(id).subscribe(res => {
          if ((res["data"] = "Successfully Deleted")) {         
              alert("Deleted!"),          
            this.displayfarmers();
          }
      })
  }

}

